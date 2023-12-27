import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import RNFS from 'react-native-fs';
import PushNotification from 'react-native-push-notification';
import Sound from 'react-native-sound';

const ReminderSound = () => {
    const [audioFiles, setAudioFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [alarmTime, setAlarmTime] = useState(1); // Örnek olarak 1 dakika sonra

    useEffect(() => {
        loadAudioFiles();
        createNotificationChannel();
    }, []);

    // Cihazda bulunan ses dosyalarını listeler.
    const loadAudioFiles = async () => {
        try {
            const files = await RNFS.readDir(RNFS.DocumentDirectoryPath);
            const filteredFiles = files.filter(file => file.name.endsWith('.mp3'));
            setAudioFiles(filteredFiles);
        } catch (error) {
            console.error(error);
        }
    };
    // Cihazda bulunan ses dosyalarını listeler.

    // Bildirim kanalı oluşturun (Android 8.0 ve üstü için gereklidir)
    const createNotificationChannel = () => {
        PushNotification.createChannel({
            channelId: "alarm-channel",
            channelName: "Alarm Channel"
        });
    };

    const scheduleAlarm = () => {
        PushNotification.localNotificationSchedule({
            channelId: "alarm-channel",
            message: "Alarmınız çalıyor!",    // Bildirim mesajı
            date: new Date(Date.now() + alarmTime * 60000), // Alarmın çalacağı zaman (şu andan itibaren kaç dakika sonra)
            allowWhileIdle: true, // Cihaz boşta olsa bile bildirimi göster
        });
    };
    // Bildirim kanalı oluşturun (Android 8.0 ve üstü için gereklidir)


    // Bildirim cihaza gittiğinde sesi oynatır
    const playSound = (soundFileName) => {
        const sound = new Sound(soundFileName, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('Ses dosyası yüklenirken hata:', error);
                return;
            }
            sound.play(() => {
                sound.release();
            });
        });
    };
    // Bildirim cihaza gittiğinde sesi oynatır

    
    const handleAlarm = () => {
        scheduleAlarm();
        playSound(selectedFile ? selectedFile.path : ''); // Burada seçilen dosyanın yolunu kullanın
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <FlatList
                data={audioFiles}
                keyExtractor={item => item.name}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => setSelectedFile(item)}>
                        <Text>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
            <Button title="Alarmı Ayarla" onPress={handleAlarm} />
        </View>
    );
};

export default ReminderSound;
