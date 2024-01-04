import React, { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import styles from './style';


const AudioPicker = () => {
  const [isSoundSwitchOn, setIsSoundSwitchOn] = React.useState(false);
  const toggleSoundSwitch = () => setIsSoundSwitchOn(!isSoundSwitchOn);

  const [selectedAudioName, setSelectedAudioName] = useState('');

  const selectAudioFile = async () => {
    try {
      const response = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio],
      });

      // Seçilen dosyanın adını konsola ve state'e yazdır
      console.log('Selected audio file:', response);
      setSelectedAudioName(response[0].name); // İlk dosyanın adını al
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the audio picker');
        setSelectedAudioName(''); // Hata durumunda veya iptalde state'i temizle
      } else {
        console.error('Error during audio file selection:', err);
      }
    }
  };

  return (

    
        <View style={styles.soundContainer}>
          <Text style={styles.soundButton} onPress={selectAudioFile}>Bir Ses Dosyası Seçin</Text>
          <Text style={styles.soundText}>
            {selectedAudioName ? `Seçilen Hatırlatıcı Sesi: ${selectedAudioName}` : 'Dosya Seçilmedi'}
          </Text>
        </View>
     


  );
};


export default AudioPicker;

/*
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
        <View style={styles.container}>
          <Button title="Select an Audio File" onPress={selectAudioFile} />
          <Text style={styles.text}>
            {selectedAudioName ? `Selected Audio File: ${selectedAudioName}` : 'No file selected'}
          </Text>
        </View>
      )}
    </View>



























*/