import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import AddTaskScreen from './src/screens/AddTaskScreen';
import CompletedScreen from './src/screens/CompletedScreen';
import ReminderScreen from './src/screens/ReminderScreen';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';



const Stack = createNativeStackNavigator();

if (!firebase.apps.length) {
  try {
    firebase.initializeApp(firebaseConfig);
    console.log('Firebase bağlantısı başarılı.'); // Başarılı başlatma mesajı
  } catch (error) {
    console.error('Firebase bağlantısı başarısız: ', error); // Başarısız başlatma mesajı
  }
} else {
  console.log('Firebase zaten başlatılmış.'); // Zaten başlatılmış mesajı
}



const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Anasayfa', headerShown: false }} />
        <Stack.Screen name="AddTask" component={AddTaskScreen} options={{ title: 'Görev Ekle', headerShown: false }} />
        <Stack.Screen name="CompletedTasks" component={CompletedScreen} options={{ title: 'Tamamlanan Görevler', headerShown: false }} />
        <Stack.Screen name="Reminder" component={ReminderScreen} options={{ title: 'Hatırlatıcı Ekranı', headerShown: false} } />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;