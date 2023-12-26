import { React, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Platform, KeyboardAvoidingView, Keyboard } from 'react-native';
import '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';


const HomeScreen = ({ navigation }) => {

  const navigateToAddTaskScreen = () => {
    navigation.navigate('AddTask'); // Make sure this matches the name in your stack navigator
  };

  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState({ title: '', description: '' });

  // fetchTasks fonksiyonunu HomeScreen bileşeninin içinde tanımlayın
  const fetchTasks = async () => {
    const response = await firestore().collection('tasks').get();
    setTasks(response.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

  // useEffect içinde fetchTasks fonksiyonunu çağırın
  useEffect(() => {
    fetchTasks();
  }, []);

  const formatDate = (timestamp) => {
    // Check if timestamp is available and is a Firestore timestamp
    if (timestamp && timestamp.toDate) {
      return timestamp.toDate().toDateString();
    }
    return '';
  };

  const handleEditStart = (task) => {
    setEditTaskId(task.id);
    setEditedTask({ title: task.title, description: task.description });
  };

  const handleEditEnd = async () => {
    if (editTaskId && editedTask) {
      try {
        await firestore().collection('tasks').doc(editTaskId).update(editedTask);
        console.log('Görev başarıyla güncellendi');
        fetchTasks();
      } catch (error) {
        console.error('Görev güncellenirken hata oluştu:', error);
      }

      setEditTaskId(null);
    }
  };

  const handleEditEndAndCloseKeyboard = async () => {
    await handleEditEnd(); // Veritabanına kaydet
    Keyboard.dismiss(); // Klavyeyi kapat
  };



  return (



    <View style={styles.homeScreen}>

      <View style={styles.header}>
        <TouchableOpacity style={styles.menuConatiner}>
          <Image source={require("../assets/images/menu-icon.png")} style={styles.icons} />
        </TouchableOpacity>

        {editTaskId && (
          <TouchableOpacity onPress={handleEditEndAndCloseKeyboard} style={styles.finishEditingButton}>
            <Text style={styles.finishEditingButtonText}>Bitir</Text>
          </TouchableOpacity>
        )}
      </View>


      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : null}
        style={{ flex: 1 }}
      >
        <View style={styles.body}>

          <View style={styles.mainTitle}>
            <Text style={styles.title}>Anımsatıcılar</Text>
          </View>
          <View style={styles.reminderList}>
            <View style={styles.containerTask}>

              <TouchableOpacity
                style={styles.recIconContainer}
                onPress={() => navigation.navigate('Reminder')}
              >
                <Image source={require("../assets/images/rec-icon.png")} style={styles.icons} />
              </TouchableOpacity>

              {tasks.map(task => (
                <TouchableOpacity key={task.id} onPress={() => handleEditStart(task)} style={styles.taskCard}>
                  {editTaskId === task.id ? (
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
                      <Text style={styles.taskDetails}>{formatDate(task.dueDate)}</Text>
                    </View>
                  ) : (
                    <View>
                      <Text style={styles.taskTitle}>{task.title}</Text>
                      <Text style={styles.taskDetails}>{task.description}</Text>
                      <Text style={styles.taskDetails}>{formatDate(task.dueDate)}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

        </View>





        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.addReminder}
            onPress={navigateToAddTaskScreen}
          >
            <Image source={require("../assets/images/add-icon.png")} style={styles.icons} />
            <Text style={styles.footerText}>Yeni Anımsatıcı</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView >

    </View>



  );
};


const styles = StyleSheet.create({



  finishEditingButton: {
    position: 'absolute',
    right: 20, // Sağa yasla
    top: 10, // Üstten mesafe
    backgroundColor: '#5F45FF', // Butonun arka plan rengi
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5
  },
  finishEditingButtonText: {
    color: 'white', // Butonun yazı rengi
    fontWeight: 'bold'
  },


  reminderList: {
    width: "100%",
    flex: 1,
    backgroundColor: '#040404',
    // backgroundColor: "red",
  },
  containerTask: {
    width: "100%",
    marginTop: 15,
    flexDirection: 'row',
    //backgroundColor: "white",

  },

  recIconContainer: {
    //backgroundColor: "black",
    marginTop: 2,
    marginLeft: 25,
    marginRight: 2,
    height: 26
  },
  taskCard: {
    width: "83%",
    paddingLeft: 10,
    backgroundColor: '#040404',
    borderBottomColor: "#3F3E41",
    borderBottomWidth: 2,
    paddingBottom: 10,
    //backgroundColor: "red",
  },
  taskInputTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#ffff',
    marginBottom: 5,
    padding: 0,
    margin: 0,

    borderWidth: 0, // Sınır genişliği
    borderRadius: 0, // Sınır yuvarlaklık derecesi
    //height: 25, // TextInput yüksekliği
  },

  taskInputDesc: {
    fontSize: 14,
    color: '#A2A2A3',
    marginBottom: 2,
    padding: 0,
    margin: 0,
    borderWidth: 0, // Sınır genişliği
    //height: 25, // TextInput yüksekliği
  },

  taskTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#ffff',
    marginBottom: 5,
  },
  taskDetails: {
    fontSize: 14,
    color: '#A2A2A3',
    marginBottom: 2,
  },














  // Ana tasarım aşağıdaki gibidir. Tüm ekranlarımızın standart düzeni bu şekilde olacaktır.
  homeScreen: {
    flex: 1, // Tüm ekranı kaplar
    flexDirection: 'column', // Sütun düzeni
    backgroundColor: "#040404",

  },

  //Header Kısmının İçeriği
  header: {
    width: "100%",
    height: 60,
    //flex: 0.09,
    //height: 60, // Sabit yükseklik
    alignItems: 'center', // İçerikleri yatay olarak ortalar
    justifyContent: 'center', // İçerikleri dikey olarak ortalar
    borderBottomWidth: 1, // Alt kenarlık genişliği
    borderBottomColor: '#e0e0e0', // Alt kenarlık rengi
    zIndex: 1,
    //position: 'absolute',
    //top: 0, left: 0, right: 0,
    //backgroundColor: "gray",
  },

  menuConatiner: {
    height: 35,
    width: 35,
    alignItems: "center",
    justifyContent: 'center',
    position: "absolute",
    left: 355,
    //backgroundColor: "red",
  },


  //Body Kısmının İçeriği
  body: {
    flex: 1, // Kalan alanı kaplar
    alignItems: 'center', // İçerikleri yatay olarak ortalar
    //justifyContent: 'center', // İçerikleri dikey olarak ortalar
  },

  mainTitle: {
    height: 55,
    width: "100%",
    justifyContent: "center",
    paddingLeft: 25,
    //backgroundColor: "red",
  },
  title: {
    width: "auto",
    height: 50,
    fontWeight: "bold",
    fontSize: 40,
    color: "#5F45FF",
    //backgroundColor: "gray",
  },
  reminderListContainer: {

  },

  //Footer Kısmının içeriği

  footer: {
    height: 75,
    //flex: 0.12,
    width: "100%",
    //height: 100, // Sabit yükseklik
    backgroundColor: '#201D1D', // Arka plan rengi
    borderTopWidth: 1, // Üst kenarlık genişliği
    borderTopColor: '#e0e0e0', // Üst kenarlık rengi
    //justifyContent: 'center', // İçerikleri dikey olarak ortalar
    zIndex: 1,

  },
  addReminder: {
    width: 170,
    height: 35,
    alignItems: 'center', // İçerikleri yatay olarak ortalar
    justifyContent: 'center', // İçerikleri dikey olarak ortalar
    position: "absolute",
    left: 18,
    top: 16,
    flexDirection: 'row',
    //backgroundColor: "red",
  },
  footerText: {
    fontSize: 18,
    color: "#5F45FF",
    fontWeight: "bold",
    paddingLeft: 8,
    textAlign: "center",
    textAlignVertical: "center",
  },



  //Genel Stiller
  icons: {
    height: 26,
    width: 26,
    resizeMode: 'contain',
  },

});

export default HomeScreen;