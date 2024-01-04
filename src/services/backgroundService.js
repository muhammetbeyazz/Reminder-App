import database from '@react-native-firebase/database';
import BackgroundFetch from "react-native-background-fetch";

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

// Görevleri kontrol et ve güncelle
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
      console.log(`Görev güncellendi: ${taskId}, Yeni durum: ${tasks[taskId.status]}`);

    }
  }
};

// Background Fetch için görev
const backgroundFetchTask = async () => {
  await checkAndUpdateTasks();
  BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA);
};

// Background Fetch'i başlat
const initBackgroundFetch = () => {
  console.log("Background'da status güncelleme işlemi başlatılmıştır.")
  BackgroundFetch.configure({
    minimumFetchInterval: 15,
    stopOnTerminate: false,
    startOnBoot: true,
    enableHeadless: true,
  }, backgroundFetchTask, (error) => {
    if (error) {
      console.error('[initBackgroundFetch] Background Fetch başlatılamadı', error);
    }
  });
};

// Uygulama başlatıldığında ve belirli aralıklarla görevleri güncelle
const startTaskUpdates = () => {
  console.log("Status güncelleme işlemi başltıldı.")
  checkAndUpdateTasks();
  setInterval(checkAndUpdateTasks, 1000); // kaç dkka bir kontrol etmesini istiyoruz
};

export { initBackgroundFetch, startTaskUpdates };
