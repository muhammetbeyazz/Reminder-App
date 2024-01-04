import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView } from 'react-native';
import database from '@react-native-firebase/database';
import FooterComponent from '../components/footerComponent';
import HeaderComponent from '../components/headerComponent';
import styles from '../components/style';

const HomeScreen = ({ navigation }) => {

  const navigateToAddTaskScreen = () => {
    navigation.navigate('AddTask');
  };

  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState({ title: '', description: '' });

  // listeleme işlemi
  const fetchTasks = () => {
    database().ref('tasks').on('value', (snapshot) => {
      const tasksArray = [];
      snapshot.forEach((childSnapshot) => {
        const task = { id: childSnapshot.key, ...childSnapshot.val() };

        // Yalnızca status alanı "aktif" olan görevleri ekle
        if (task.status === 'aktif') {
          tasksArray.push(task);
        }
      });
      setTasks(tasksArray);
    }, (error) => {
      console.error('Veri çekerken hata oluştu:', error);
    });
  };



  // Task render fonksiyonu
  const renderTask = ({ item }) => (

    <View style={styles.containerTask}>
      <>
        <TouchableOpacity
          style={styles.recIconContainer}
          onPress={() => navigation.navigate('Reminder', {
            title: item.title,
            description: item.description,
            dueDate: item.dueDate

          })}
        >
          <Image source={require("../assets/images/rec-icon.png")} style={styles.icons} />
        </TouchableOpacity>

        <TouchableOpacity key={item.id} onPress={() => handleEditStart(item)} style={styles.taskCard}>
          {editTaskId === item.id ? (
            <View>
              <TextInput
                value={editedTask.title}
                onChangeText={(text) => setEditedTask({ ...editedTask, title: text })}
                style={styles.taskInputTitle}
                multiline={true}
                maxHeight={200}
                minHeight={25}
              />
              <TextInput
                value={editedTask.description}
                onChangeText={(text) => setEditedTask({ ...editedTask, description: text })}
                style={styles.taskInputDesc}
                multiline={true}
                maxHeight={200}
                minHeight={25}
              />
              <Text style={styles.taskDetails}>{formatDate(item.dueDate)}</Text>
            </View>
          ) : (
            <View>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text style={styles.taskDetails}>{item.description}</Text>
              <Text style={styles.taskDetails}>{formatDate(item.dueDate)}</Text>
            </View>
          )}
        </TouchableOpacity>
      </>
    </View>
  );


  useEffect(() => {
    fetchTasks();
  }, []);

  // Tarih format değişimi
  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    
    // Timestamp değerini Date nesnesine dönüştürme
    const date = new Date(timestamp);
  
    // Tarihi 'gün/ay/yıl saat:dakika' formatında dönüştürme
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ay 0'dan başlar
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
  
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  // Görev güncelleme işlemi
  const handleEditStart = (task) => {
    setEditTaskId(task.id);
    setEditedTask({ title: task.title, description: task.description });
  };
  

  // Görev güncelleme işlemi
  const handleEditEnd = async () => {
    if (editTaskId && editedTask) {
      try {
        // Firebase Realtime Database'de görevi güncelle
        await database().ref(`tasks/${editTaskId}`).update(editedTask);
        console.log('Görev başarıyla güncellendi');
        fetchTasks();  // Güncellenmiş görev listesini tekrar çek
      } catch (error) {
        console.error('Görev güncellenirken hata oluştu:', error);
      }
      setEditTaskId(null);
    }
  };
  

  // Klavyeyi kapat ve veritabanına kaydet işlemi
  const handleEditEndAndCloseKeyboard = async () => {
    await handleEditEnd();
    Keyboard.dismiss();
  };


  return (

    <View style={styles.homeScreen}>

      <HeaderComponent
        leftButtonPress={editTaskId ? handleEditEndAndCloseKeyboard : null}
        leftButtonText={editTaskId ? "Bitti" : null}
        showMenuIcon={true}
      />



      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : null}
        style={{ flex: 1 }}
      >

        <View style={styles.body}>

          <View style={styles.bodyTitleContainer}>
            <Text style={styles.bodyTitleText}>Anımsatıcılar</Text>
          </View>

          <View style={styles.reminderListContainer}>

            <FlatList
              data={tasks}
              renderItem={renderTask}
              keyExtractor={item => item.id}
              style={styles.reminderListContainer}
            />

          </View>
        </View>



        <FooterComponent
          buttonText="Yeni Anımsatıcı"
          iconName="addIcon"
          onPress={navigateToAddTaskScreen}
        />

      </KeyboardAvoidingView >

    </View>
  );
};
export default HomeScreen;