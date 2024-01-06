import Sound from 'react-native-sound';
import BackgroundService from 'react-native-background-actions';
import database from '@react-native-firebase/database';
import { DeviceEventEmitter } from 'react-native';

const alarmSound = new Sound('clock_with_alarm.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('Sesi yükleme başarısız oldu', error);
    return;
  }
  console.log('Alarm sesi başarıyla yüklendi');
});

const playAlarm = () => {
  alarmSound.play((success) => {
    if (!success) {
      console.log('Ses çalmadı');
    } else {
      console.log('Alarm çalıyor');
    }
  });
};

const stopAlarm = () => {
  alarmSound.stop();
  console.log('Alarm durduruldu');
};

const checkAlarmTime = async () => {
  try {
    const snapshot = await database().ref('/tasks').once('value');
    const tasks = snapshot.val();
    const currentTime = new Date().getTime();
    console.log('Alarm zamanları kontrol ediliyor', tasks);

    if (tasks) {
      Object.keys(tasks).forEach(taskId => {
        const reminderTime = tasks[taskId].reminderTime;
        if (reminderTime) {
          const alarmTime = new Date(reminderTime).getTime();
          console.log("Alarm kontrol ediliyor", alarmTime);

          if (alarmTime <= currentTime) {
            console.log(`Alarm zamanı geldi: ${alarmTime}`);
            playAlarm();
          }
        } else {
          console.log(`Alarm verisi eksik veya hatalı: ${taskId}`);
        }
      });
    } else {
      console.log('Alarm verisi bulunamadı');
    }
  } catch (error) {
    console.error('Alarm zamanlarını kontrol ederken hata oluştu:', error);
  }
};

const alarmService = async (taskData) => {
  checkAlarmTime();
  DeviceEventEmitter.addListener('stopAlarm', stopAlarm);
  console.log('Alarm servisi başlatıldı');

  return () => {
    DeviceEventEmitter.removeListener('stopAlarm', stopAlarm);
    console.log('Alarm servisi durduruldu');
  };
};

const options = {
  taskName: 'AlarmService',
  taskTitle: 'Alarm Service',
  taskDesc: 'Manages the alarm',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  parameters: {
    delay: 10000,
  },
};

const startAlarmService = () => {
  BackgroundService.start(alarmService, options);
  console.log('Arka plan alarm servisi başlatılıyor');
};

const stopAlarmService = () => {
  BackgroundService.stop();
  console.log('Arka plan alarm servisi durduruluyor');
};

export { startAlarmService, stopAlarmService, stopAlarm };
