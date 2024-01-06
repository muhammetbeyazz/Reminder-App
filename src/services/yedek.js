
/*
import { DeviceEventEmitter } from 'react-native';
import BackgroundJob from 'react-native-background-actions';
import database from '@react-native-firebase/database';


// dueDate'i milisaniye cinsinden Unix zaman damgasına dönüştür
const convertToTimestamp = (dueDate) => {
  if (typeof dueDate === 'number') {
    return dueDate; // Zaten bir zaman damgası
  } else if (typeof dueDate === 'string' || dueDate instanceof Date) {
    return new Date(dueDate).getTime();
  } else {
    console.error(`[convertToTimestamp] Geçersiz dueDate türü: ${typeof dueDate}`);
    return null; // Geçersiz dueDate türü
  }
};

// Görevleri kontrol et ve güncelle (Listener)
const checkAndUpdateTasks = async () => {
  const snapshot = await database().ref('/tasks').once('value');
  const tasks = snapshot.val() || {};

  for (let taskId in tasks) {
    const task = tasks[taskId];
    const dueTime = convertToTimestamp(task.dueDate);


    

    if (dueTime === null || dueTime <= 0) {
      continue;
    }

    const now = new Date().getTime();
    if (dueTime < now && task.status === 'aktif') {
      await database().ref(`/tasks/${taskId}`).update({ status: 'tamamlanmış' });
      console.log(`Görev güncellendi: ${taskId}, Yeni durum: tamamlanmış`);
    }
  }
};

// Arka planda görev çalıştırma işlevi
const backgroundTask = async () => {
  try {
    await checkAndUpdateTasks();
    console.log('Arka planda görev güncelleme işlemi tamamlandı');
  } catch (error) {
    console.error('Arka planda görev güncelleme hatası:', error);
  }
};

// Arka plan görevini başlat
const initBackgroundTask = async () => {
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
    parameters: {},
  };

  BackgroundJob.start(backgroundTask, options);

  DeviceEventEmitter.addListener('TaskUpdater', (data) => {
    if (data.error) {
      console.error('Arka planda görev hatası:', data.error);
    }
  });
};

// Uygulama başlatıldığında ve belirli aralıklarla görevleri güncelle
const startTaskUpdates = () => {
  console.log("Status güncelleme işlemi başlatıldı.");
  checkAndUpdateTasks();
  setInterval(checkAndUpdateTasks, 1000); // Kaç dakika bir kontrol etmesini istediğinizi buraya ayarlayabilirsiniz
};

export { initBackgroundTask, startTaskUpdates };
*/




 /******************************************************************************* */






/*

son hali




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














/*
Bu kodda, DeviceEventEmitter'ı kullanarak bildirim gönderme işlemini bir yayın alıcısı üzerinden yönetiyorum. checkReminders fonksiyonu, bir görevin hatırlatma zamanı geldiğinde sendNotification olayını tetikler. backgroundTask fonksiyonu bu olayı dinler ve bildirimi gönderir. Bu yöntem, arka plan görevlerinde yayın alıcıları kullanarak bildirimlerin daha etkin bir şekilde yönetilmesini sağlar.
*/
















/*

alarm



import Sound from 'react-native-sound';
import BackgroundService from 'react-native-background-actions';
import database from '@react-native-firebase/database';

// Uyku fonksiyonu
const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

// Alarm sesini başlatma ve hazırlama
let alarmSound;
const initSound = () => {
    alarmSound = new Sound('clock_with_alarm.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
            console.log('Ses dosyası yüklenirken hata oluştu:', error);
            return false;
        }
        console.log('Ses dosyası başarıyla yüklendi');
        return true;
    });
};

// Alarm çalma işlevi
const playAlarm = () => {
    if (alarmSound) {
        alarmSound.play((success) => {
            if (!success) {
                console.log('Alarm çalarken hata oluştu.');
            } else {
                console.log('Alarm başarıyla çalıyor.');
            }
        });
    }
};

// Zaman kontrol fonksiyonu
const isTimeToAlarm = (current, reminder) => {
    const reminderTimestamp = reminder.getTime();
    const currentTimestamp = current.getTime();

    const ACCEPTABLE_TIME_DIFFERENCE = 30 * 1000; // 30 saniye

    return Math.abs(currentTimestamp - reminderTimestamp) <= ACCEPTABLE_TIME_DIFFERENCE;
};

// Yoğun arka plan görevi
const veryIntensiveTask = async () => {
    if (!alarmSound) {
        const isSoundReady = initSound();
        if (!isSoundReady) return;
    }

    while (BackgroundService.isRunning()) {
        console.log('Görevler kontrol ediliyor...');

        const tasksSnapshot = await database().ref('/tasks').once('value');
        const tasks = tasksSnapshot.val() || {};

        const currentTime = new Date();

        for (const [taskId, taskDetails] of Object.entries(tasks)) {
            const reminderDate = new Date(taskDetails.reminderDate);

            if (isTimeToAlarm(currentTime, reminderDate)) {
                console.log(`Alarm çalıyor! Görev ID: ${taskId}`);
                playAlarm();
            }
        }

        await sleep(30000); // 25 saniye bekle
    }
};

// Arka plan görevi seçenekleri
const options = {
    taskName: 'ReminderCheck',
    taskTitle: 'Görev Hatırlatıcı Kontrol',
    taskDesc: 'Arka planda hatırlatıcılar kontrol ediliyor',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: '#ff00ff',
    parameters: {
        delay: 1000,
    },
};

// Arka plan görevini başlatma
export const startBackgroundTask = async () => {
    await BackgroundService.start(veryIntensiveTask, options);
    console.log('Arka plan servisi başlatıldı');
};

// Arka plan görevini durdurma
export const stopBackgroundTask = async () => {
    await BackgroundService.stop();
    console.log('Arka plan servisi durduruldu');
};

*/