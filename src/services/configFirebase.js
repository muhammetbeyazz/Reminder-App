import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';


// Firebase yapılandırma
const firebaseConfig = {
  apiKey: "AIzaSyBdbRT78mN_Y_GeR8poKUIOx5WodwZWhzw",
  projectId: "mobil-final-projesi",
  storageBucket: "mobil-final-projesi.appspot.com",
  messagingSenderId: "824436489889",
  appId: "1:824436489889:android:dac30348620158e3b1bae0",
  databaseURL: "https://mobil-final-projesi-default-rtdb.firebaseio.com", // Firebase proje ayarlarınızdan alın

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
        return response;  // Başarılı yanıtı döndür
      })
      .catch(error => {
        console.error("Task kaydederken hata oluştu: ", error);
        throw error;  // Hata oluşursa, hatayı fırlat
      });
  };
  


// Firebase'i başlat
initializeFirebase();

export default firebase;




/*
// Firebase Realtime Database referansı ve veri ayarlama
const ref = firebase.database().ref('some/path');
ref.set({ foo: 'bar' }).then(() => {
  console.log('Veri başarıyla Firebase\'e kaydedildi.');
}).catch((error) => {
  console.error('Firebase veri kaydetme hatası:', error);
});
// Firebase'e veri gönderme işlemi
*/
