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
      console.log('Seçilen ses dosyası:', response);
      setSelectedAudioName(response[0].name); // İlk dosyanın adını güncelle
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Kullanıcı ses dosyası seçicisini iptal etti');
      } else {
        console.error('Ses dosyası seçimi sırasında hata!!:', err);
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

