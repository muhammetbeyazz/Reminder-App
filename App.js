/*
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import AddTaskScreen from './src/screens/AddTaskScreen';
import CompletedScreen from './src/screens/CompletedScreen';
import ReminderScreen from './src/screens/ReminderScreen';
import { initializeFirebase } from './src/services/configFirebase';


const Stack = createNativeStackNavigator();

initializeFirebase();


const App = () => {
  const [selectedFile, setSelectedFile] = React.useState(null);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Anasayfa', headerShown: false }} />
        <Stack.Screen name="AddTask" component={AddTaskScreen} options={{ title: 'Görev Ekle', headerShown: false }} />
        <Stack.Screen name="CompletedTasks" component={CompletedScreen} options={{ title: 'Tamamlanan Görevler', headerShown: false }} />
        <Stack.Screen name="Reminder" component={ReminderScreen} options={{ title: 'Hatırlatıcı Ekranı', headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
*/


import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import AddTaskScreen from './src/screens/AddTaskScreen';
import CompletedScreen from './src/screens/CompletedScreen';
import ReminderScreen from './src/screens/ReminderScreen';
import { initializeFirebase } from './src/services/configFirebase';
import { initBackgroundFetch, startTaskUpdates } from './src/services/backgroundService';


const Stack = createNativeStackNavigator();

const App = () => {
  // Firebase'i başlat
  initializeFirebase();

  useEffect(() => {
    // Arka plan görevlerini başlat
    initBackgroundFetch();

    // Uygulama her başlatıldığında görevleri kontrol et
    startTaskUpdates();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Anasayfa', headerShown: false }} />
        <Stack.Screen name="AddTask" component={AddTaskScreen} options={{ title: 'Görev Ekle', headerShown: false }} />
        <Stack.Screen name="CompletedTasks" component={CompletedScreen} options={{ title: 'Tamamlanan Görevler', headerShown: false }} />
        <Stack.Screen name="Reminder" component={ReminderScreen} options={{ title: 'Hatırlatıcı Ekranı', headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;