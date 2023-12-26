import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';


// Firebase yapılandırma
const firebaseConfig = {
  apiKey: "AIzaSyBdbRT78mN_Y_GeR8poKUIOx5WodwZWhzw",
  projectId: "mobil-final-projesi",
  storageBucket: "mobil-final-projesi.appspot.com",
  messagingSenderId: "824436489889",
  appId: "1:824436489889:android:dac30348620158e3b1bae0"
};

// Firebase'i başlat
if (!firebase.apps.length) {
   firebase.initializeApp(firebaseConfig);
   console.log('Firebase bağlantısı başarılı.'); // Başarılı başlatma mesajı
} else {
   firebase.app(); // eğer zaten başlatılmışsa
   console.log('Firebase zaten başlatılmış.'); // Zaten başlatılmış mesajı
}