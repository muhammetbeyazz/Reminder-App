import React, { useState } from 'react';
import { View, Text, } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import styles from './style';


const AudioPicker = ({ selectedAudioName, setSelectedAudioName }) => {
  

  const selectAudioFile = async () => {
    try {
      const response = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio],
      });

      // Seçilen dosyanın adını konsola ve state'e yazdır
      console.log('Selected audio file:', response);
      setSelectedAudioName(response[0].name); // İlk dosyanın adını güncelle
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the audio picker');
        // Eğer kullanıcı iptal ederse veya bir hata oluşursa, seçimi temizleme
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

