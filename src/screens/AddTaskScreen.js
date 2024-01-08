import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, KeyboardAvoidingView, ScrollView, Alert, } from 'react-native';
import { Switch } from 'react-native-paper';
import styles from '../components/style';
import FooterComponent from '../components/footerComponent';
import HeaderComponent from '../components/headerComponent';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';

import { addDataToFirebase } from '../services/configFirebase';

import AudioPicker from '../components/reminderSoundComponent';


const AddTaskScreen = ({ navigation }) => {
  const navigateToHomeScreen = () => {
    navigation.navigate('Home');
  };

  // Her bir switch için ayrı state tanımları
  const [isReminderSwitchOn, setIsReminderSwitchOn] = React.useState(false);
  // Her bir switch için ayrı toggle fonksiyonları
  const toggleReminderSwitch = () => setIsReminderSwitchOn(!isReminderSwitchOn);

  // ----- Tarih ve Saat -----
  //Veri tabanı işlemleri için
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [dueTime, setDueTime] = useState(null);
  const [status, setStatus] = useState('');
  // Arayüz işlemleri için switch durumları tarih ve saat
  const [isDateSwitchOn, setIsDateSwitchOn] = useState(false);
  const [isTimeSwitchOn, setIsTimeSwitchOn] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // ----- Hatırlatıcı Zamanı -----
  const [reminderMinutes, setReminderMinutes] = useState(""); // varsayılan olarak 5 dakika
  const [reminderHours, setReminderHours] = useState("");
  const [reminderDays, setReminderDays] = useState("");
  const [reminderWeeks, setReminderWeeks] = useState("");
  const [reminderMonths, setReminderMonths] = useState("");
  // Hatırlatıcı zamanını hesaplayan fonksiyon (Eğer kullanıcı giriş yapmazsa varsayılan olarak 0 atanır ve belirlenen tarihte alarm çalar)
  const calculateReminderTime = () => {
    if (!dueDate || !dueTime) {
      return null; // Eğer dueDate veya dueTime tanımlı değilse, null döndür
    }
    const combinedDueDateTime = new Date(dueDate);
    combinedDueDateTime.setHours(dueTime.getHours());
    combinedDueDateTime.setMinutes(dueTime.getMinutes());
    combinedDueDateTime.setSeconds(0);
    combinedDueDateTime.setMilliseconds(0);

    // Hatırlatıcı zamanını hesapla
    combinedDueDateTime.setMinutes(combinedDueDateTime.getMinutes() - (reminderMinutes ? parseInt(reminderMinutes) : 0));
    combinedDueDateTime.setHours(combinedDueDateTime.getHours() - (reminderHours ? parseInt(reminderHours) : 0));
    combinedDueDateTime.setDate(combinedDueDateTime.getDate() - (reminderDays ? parseInt(reminderDays) : 0));
    combinedDueDateTime.setDate(combinedDueDateTime.getDate() - (reminderWeeks ? parseInt(reminderWeeks) : 0) * 7);
    combinedDueDateTime.setMonth(combinedDueDateTime.getMonth() - (reminderMonths ? parseInt(reminderMonths) : 0));

    return combinedDueDateTime.toISOString();
  };


  // ----- Ses Dosyasi -----
  const [isSoundSwitchOn, setIsSoundSwitchOn] = useState(false);  // State'i tanımla
  const [selectedAudioName, setSelectedAudioName] = useState('');
  const defaultSoundName = "clock_with_alarm.mp3";


  const toggleSoundSwitch = () => {
    setIsSoundSwitchOn(prevState => !prevState);
  };



  // Toggle saat ve tarih 
  const toggleDateSwitch = () => setShowDatePicker(previousState => !previousState);
  const toggleTimeSwitch = () => {
    if (!dueTime) {
      setDueTime(new Date()); // Eğer saat seçimi yapılmamışsa, varsayılan bir saat değeri atayın
    } setShowTimePicker(previousState => !previousState);
  };

  // Fonksiyonlar Tarih ve saat
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || dueDate; // Eğer kullanıcı tarih seçmezse mevcut tarihi kullan
    setShowDatePicker(Platform.OS === 'ios'); // iOS için bu kontrol gerekli
    setDueDate(currentDate);
    if (Platform.OS === 'android') {
      setShowDatePicker(false); // Android için picker'ı kapat
    }
  };
  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime;
    if (currentTime) {
      setShowTimePicker(false);
      setDueTime(currentTime);

      // Eğer saat seçilirse ve tarih seçilmemişse, tarihi bugüne ayarla
      if (!dueDate) {
        setDueDate(new Date());
      }
    }
  };



  // veritabanına kayıt edecek şekilde verilerin hepsini topluyoruz
  const handleSubmit = () => {
    return new Promise((resolve, reject) => {
      // Zorunlu alanları kontrol et
      if (!title.trim()) {
        Alert.alert("Hata", "Başlık ve saat alanları zorunludur.");
        return;
      }
      if (!dueTime) {
        Alert.alert("Hata", "Saat alanı zorunludur.");
        return;
      }
      // Tarih ve saat bilgilerini birleştirme
      const combinedDueDateTime = new Date(dueDate || new Date());
      combinedDueDateTime.setHours(dueTime.getHours());
      combinedDueDateTime.setMinutes(dueTime.getMinutes());
      combinedDueDateTime.setSeconds(0);
      combinedDueDateTime.setMilliseconds(0);
      // Oluşturma tarihi olarak şu anki zamanı kullanma
      const creationDate = new Date().toISOString();
      // Hatırlatıcı zamanını hesaplama
      const reminderTime = calculateReminderTime(combinedDueDateTime);
      // Durum hesaplama
      const calculatedStatus = combinedDueDateTime > new Date() ? 'aktif' : 'tamamlanmış';
      const taskData = {
        title,
        description,
        dueDate: combinedDueDateTime.toISOString(),
        creationDate,
        reminderTime,
        status: calculatedStatus,
        reminderSound: selectedAudioName || defaultSoundName,// kendi dosyasından seçer seçmezse uygulama dosyasındaki varsayılan alarm sesi kayıt edilir
      };
      addDataToFirebase('tasks', taskData)
        .then(() => {
          console.log("Task başarıyla kaydedildi.");
          resolve();
        })
        .catch((error) => {
          console.error("Task kaydederken hata oluştu: ", error);
          reject(error);
        });
    });
  };




  // Seçilen tarih ve saat bilgilerini formatlayıp göstermek için fonksiyonlar
  const getFormattedDate = () => {
    if (!dueDate) {
      return ' ';
    }
    // Eğer dueDate bugünse, "Bugün" yaz
    const today = new Date();
    if (dueDate.toDateString() === today.toDateString()) {
      return 'Bugün';
    }
    // Tarihi "gg/aa/yyyy" formatında döndür
    const day = dueDate.getDate().toString().padStart(2, '0');
    const month = (dueDate.getMonth() + 1).toString().padStart(2, '0'); // Ay 0'dan başladığı için 1 ekliyoruz
    const year = dueDate.getFullYear();

    return `${day}/${month}/${year}`;
  };


  const getFormattedTime = () => {
    if (!dueTime) {
      return '  ';
    }
    return `${dueTime.getHours().toString().padStart(2, '0')}:${dueTime.getMinutes().toString().padStart(2, '0')}`;
    return dueDate.toLocaleDateString();
  };





  return (
    <View style={styles.homeScreen}>

      <HeaderComponent
        leftButtonPress={navigateToHomeScreen}
        leftButtonText="Vazgeç"
        showMenuIcon={true}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : null}
        style={{ flex: 1 }}
      >


        <View style={styles.body}>
          <View style={styles.bodyTitleContainer}>
            <Text style={styles.bodyTitleText}>Yeni Anımsatıcı</Text>
          </View>


          <ScrollView style={{ flex: 1, padding: 0, margin: 0 }}  >
            <View style={styles.reminderListContainer}>
              <View style={styles.reminderAddContainer}>


                <View style={styles.addNotesContainer}>
                  <TextInput
                    placeholder="Başlık"
                    multiline
                    placeholderTextColor="#B0B0B0"
                    style={styles.addTitle}
                    value={title}
                    onChangeText={setTitle}
                  />
                  <TextInput
                    placeholder="Not Ekle"
                    placeholderTextColor="#B0B0B0"
                    multiline
                    style={styles.addDescription}
                    value={description}
                    onChangeText={setDescription}
                  />
                </View>


                <View style={[styles.addPassiveContainer, isDateSwitchOn && styles.addActiveContainer]}>
                  <View style={styles.addContainer}>
                    <View style={[styles.addImageContiner, { backgroundColor: 'red' }]} >
                      <Image
                        style={styles.addIcons}
                        source={require("../assets/images/date-icon.png")}
                      />
                    </View>
                    <Text style={styles.addText}>Tarih</Text>
                    <Text style={styles.addInfoText}>{getFormattedDate()}</Text>
                    <Switch
                      value={isDateSwitchOn}
                      onValueChange={toggleDateSwitch}
                      style={styles.switch}
                      trackColor={{ false: "#767577", true: "#02C45B" }}
                      thumbColor={isDateSwitchOn ? "#f4f3f4" : "#f4f3f4"}
                    />
                  </View>
                  {showDatePicker && (
                    <DateTimePicker
                      testID="datePicker"
                      value={dueDate || new Date()}
                      mode="date"
                      is24Hour={true}
                      display="default"
                      onChange={onChangeDate}
                    />
                  )}
                </View>


                <View style={[styles.addPassiveContainer, isTimeSwitchOn && styles.addActiveContainer]}>
                  <View style={styles.addContainer}>
                    <View style={styles.addImageContiner} >
                      <Image
                        style={styles.addIcons}
                        source={require("../assets/images/clock-icon.png")}
                      />
                    </View>
                    <Text style={styles.addText}>Saat</Text>
                    <Text style={styles.addInfoText}>{getFormattedTime()}</Text>
                    <Switch
                      value={isTimeSwitchOn}
                      onValueChange={toggleTimeSwitch}
                      style={styles.switch}
                      trackColor={{ false: "#767577", true: "#02C45B" }}
                      thumbColor={isTimeSwitchOn ? "#f4f3f4" : "#f4f3f4"}
                    />
                  </View>
                  {showTimePicker && (
                    <DateTimePicker
                      testID="timePicker"
                      value={dueTime || new Date()}
                      mode="time"
                      is24Hour={true}
                      display="default"
                      onChange={onChangeTime}
                    />
                  )}
                </View>


                <View style={[styles.addPassiveContainer, isReminderSwitchOn && styles.addActiveContainer]}>
                  <View style={styles.addContainer}>
                    <View style={styles.addImageContiner} >
                      <Image
                        style={styles.addIcons}
                        source={require("../assets/images/repeat-icon.png")}
                      />
                    </View>
                    <Text style={styles.addText}>Hatırlatıcı Zamanı</Text>
                    <Switch
                      value={isReminderSwitchOn}
                      onValueChange={toggleReminderSwitch}
                      style={styles.switch}
                      trackColor={{ false: "#767577", true: "#02C45B" }}
                      thumbColor={isReminderSwitchOn ? "#f4f3f4" : "#f4f3f4"}
                    />
                  </View>
                  {isReminderSwitchOn && (
                    <View style={styles.selectionMainContainer}>
                      <View style={[styles.selectionContainer, { justifyContent: "center" }]}>

                        <View style={styles.selection}>
                          <TextInput
                            style={styles.input}
                            placeholder="Ay"
                            onChangeText={text => setReminderMonths(text)}
                            value={reminderMonths}
                            keyboardType="numeric"
                          />
                          <TextInput
                            style={styles.input}
                            onChangeText={text => setReminderWeeks(text)}
                            value={reminderWeeks}
                            keyboardType="numeric"
                            placeholder="Hafta"
                          />
                          <TextInput
                            style={styles.input}
                            onChangeText={text => setReminderDays(text)}
                            value={reminderDays}
                            keyboardType="numeric"
                            placeholder="Gün"
                          />
                          <TextInput
                            style={styles.input}
                            onChangeText={text => setReminderHours(text)}
                            value={reminderHours}
                            keyboardType="numeric"
                            placeholder="Saat"
                          />
                          <TextInput
                            style={styles.input}
                            onChangeText={text => setReminderMinutes(text)}
                            value={reminderMinutes}
                            keyboardType="numeric"
                            placeholder="Dakika"
                          />
                        </View>

                      </View>
                    </View>
                  )}
                </View>


                <View style={[styles.addPassiveContainer, isSoundSwitchOn && styles.addActiveContainer]}>
                  <View style={styles.addContainer}>
                    <View style={styles.addImageContiner} >
                      <Image
                        style={styles.addIcons}
                        source={require("../assets/images/music-icon.png")}
                      />
                    </View>
                    <Text style={styles.addText}>Hatırlatıcı Sesi</Text>
                    <Switch
                      value={isSoundSwitchOn}
                      onValueChange={toggleSoundSwitch}
                      style={styles.switch}
                      trackColor={{ false: "#767577", true: "#02C45B" }}
                      thumbColor={isSoundSwitchOn ? "#f4f3f4" : "#f4f3f4"}
                    />
                  </View>
                  {isSoundSwitchOn && (
                    <View style={styles.selectionMainContainer}>
                      <View style={styles.selectionContainer}>
                        <View style={styles.selection}>

                          <AudioPicker
                            selectedAudioName={selectedAudioName}
                            setSelectedAudioName={setSelectedAudioName}
                          />
                        </View>
                      </View>
                    </View>

                  )}
                </View>


              </View>
            </View>
          </ScrollView>
        </View>



        <FooterComponent
          buttonText="Kaydet"
          iconName="saveIcon"
          onPress={() => {
            handleSubmit()
              .then(() => {
                navigateToHomeScreen();
              })
              .catch(error => {
                console.error("Hata oluştu: ", error);
              });
          }}
        />


      </KeyboardAvoidingView >

    </View >
  );
};

export default AddTaskScreen;
