
import BackgroundJob from 'react-native-background-actions';
import database from '@react-native-firebase/database';
import PushNotification from 'react-native-push-notification';
import { DeviceEventEmitter } from 'react-native';

// dueDate'i milisaniye cinsinden Unix zaman damgasına dönüştür
const convertToTimestamp = (dueDate) => {
  if (typeof dueDate === 'number') {
    return dueDate;
  } else if (typeof dueDate === 'string' || dueDate instanceof Date) {
    return new Date(dueDate).getTime();
  } else {
    console.error(`[convertToTimestamp] Geçersiz dueDate türü: ${typeof dueDate}`);
    return null;
  }
};

// Firebase'den görevleri çekip hatırlatma yapma fonksiyonu
const checkReminders = async () => {
  const snapshot = await database().ref('/tasks').once('value');
  const tasks = snapshot.val() || {};
  const now = new Date().getTime();
  const oneMinute = 1000 * 60;

  Object.keys(tasks).forEach((taskId) => {
    const task = tasks[taskId];
    const reminderTime = convertToTimestamp(task.reminderTime);

    if (reminderTime >= now - oneMinute && reminderTime <= now && task.status === 'aktif') {
      DeviceEventEmitter.emit('sendNotification', { taskId, title: task.title, description: task.description });
    }
  });
};

// Görevleri kontrol et ve güncelle
const checkAndUpdateTasks = async () => {
  const snapshot = await database().ref('/tasks').once('value');
  const tasks = snapshot.val() || {};

  Object.keys(tasks).forEach(async (taskId) => {
    const task = tasks[taskId];
    const dueTime = convertToTimestamp(task.dueDate);

    if (dueTime === null || dueTime <= 0) return;

    const now = new Date().getTime();
    if (dueTime < now && task.status === 'aktif') {
      await database().ref(`/tasks/${taskId}`).update({ status: 'tamamlanmış' });
      console.log(`Görev güncellendi: ${taskId}, Yeni durum: tamamlanmış`);
    }
  });
};

// Bildirim gönderme fonksiyonu
const onNotificationEvent = ({ taskId, title, description }) => {
  PushNotification.localNotification({
    title: `Hatırlatma: ${title}`,
    message: description,
    channelId: 'task-reminder-channel',
  });
};

// Yayın alıcısı ekleme
let notificationListener = DeviceEventEmitter.addListener('sendNotification', onNotificationEvent);

// Arka planda görev çalıştırma işlevi
const backgroundTask = async () => {
  try {
    // Sonsuz döngü, belirli aralıklarla görevleri kontrol et ve güncelle
    for (;;) {
      await checkReminders();
      await checkAndUpdateTasks();
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1 dakikada
    }
  } catch (error) {
    console.error('Arka planda görev güncelleme hatası:', error);
  }
};

// Arka plan görevini başlat
const initBackgroundTask = () => {
  console.log("Arka planda görev güncelleme işlemi başlatıldı");

  const options = {
    taskName: 'TaskUpdater',
    taskTitle: 'Görevleri Güncelle',
    taskDesc: 'Arka planda görevleri güncelleme',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#ff00ff',
  };

  BackgroundJob.start(backgroundTask, options);
};

// Görev güncellemelerini başlat
const startTaskUpdates = () => {
  console.log("Görev güncellemeleri başlatılıyor");
  checkReminders();
  checkAndUpdateTasks();
  setInterval(() => {
    checkReminders();
    checkAndUpdateTasks();
  }, 1000); // Her saat başı kontrol
};

// Bildirim kanalı oluşturma fonksiyonu
const createNotificationChannel = () => {
  const channelId = 'task-reminder-channel';

  PushNotification.deleteChannel(channelId);

  PushNotification.createChannel(
    {
      channelId: channelId,
      channelName: 'Task Reminder Channel',
      channelDescription: 'A channel to categorise your task reminders',
      playSound: true,
      soundName: 'default',
      importance: PushNotification.Importance.HIGH,
      vibrate: true,
    },
    (created) => console.log(`createChannel returned '${created}'`)
  );
};

// Yayın alıcısı kaldırma fonksiyonu
const removeNotificationListener = () => {
  if (notificationListener) {
    notificationListener.remove();
    notificationListener = null;
  }
};

export { initBackgroundTask, startTaskUpdates, createNotificationChannel, removeNotificationListener };
