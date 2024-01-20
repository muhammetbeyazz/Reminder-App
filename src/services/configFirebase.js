import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';

// Firebase yapılandırma
const firebaseConfig = {
  apiKey: "AIzaSyB3Oomp197ky6Kxx5EoQmDb6BlNlu012Zc",
  projectId: "mobile-reminder-app-3c9b5",
  storageBucket: "mobile-reminder-app-3c9b5.appspot.com",
  messagingSenderId: "985296898028",
  appId: "1:985296898028:android:d6e497c139aece5173a2c9",
  databaseURL: "https://mobile-reminder-app-3c9b5-default-rtdb.firebaseio.com/",  
};
// Firebase'i başlat
export const initializeFirebase = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    console.log("Firebase başlatıldı.");
  } else {
    console.log("Firebase zaten başlatılmış.");
  }
};
  // Veritabanına veri eklemek için fonksiyon
  export const addDataToFirebase = (path, data) => {
    return firebase.database().ref(path).push(data)
      .then((response) => {
        console.log("Task başarıyla kaydedildi.", response);
        return response;  
      })
      .catch(error => {
        console.error("Task kaydederken hata oluştu: ", error);
        throw error; 
      });
  };

// Firebase'i başlat
initializeFirebase();

export default firebase;
