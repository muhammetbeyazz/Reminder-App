import database from '@react-native-firebase/database';

// Görevleri çeken fonksiyon
export const fetchTasks = async () => {
  return new Promise((resolve, reject) => {
    database().ref('tasks').on('value', (snapshot) => {
      const tasksArray = [];
      snapshot.forEach((childSnapshot) => {
        const task = { id: childSnapshot.key, ...childSnapshot.val() };
        tasksArray.push(task);
      });
      resolve(tasksArray);
    }, (error) => {
      console.error('Veri çekerken hata oluştu:', error);
      reject(error);
    });
  });
};

// Görev güncelleyen fonksiyon
export const updateTask = async (taskId, taskData) => {
  try {
    await database().ref(`tasks/${taskId}`).update(taskData);
    console.log('Görev başarıyla güncellendi');
  } catch (error) {
    console.error('Görev güncellenirken hata oluştu:', error);
    throw error;
  }
};
