import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, GestureResponderEvent, } from 'react-native';
import styles from '../components/style';
import FooterComponent from '../components/footerComponent';
import HeaderComponent from '../components/headerComponent';


const ReminderScreen = ({ navigation, route }) => {
    const navigateToHomeScreen = () => {
        navigation.navigate('Home');
    };
    // Resmin durumunu takip eden state (true ise aktif, false ise pasif)
    const [isActive, setIsActive] = useState(true);
    const { title, description, dueDate } = route.params;

    // Resme tıklandığında çağrılan fonksiyon aktiflik durumunu değiştirir
    const toggleImage = () => {
        setIsActive(!isActive);
    };

    const formatDate = (timestamp) => {
        if (timestamp && timestamp.toDate) {
            return timestamp.toDate().toDateString();
        }
        return '';
    };

    return (

        <View style={styles.homeScreen}>

            <HeaderComponent
                leftButtonPress={navigateToHomeScreen}
                leftButtonText="Kapat"
                showMenuIcon={true}
            />




                <View style={styles.body}>
                    <View style={styles.bodyTitleContainer}>
                        <Text style={styles.bodyTitleText}>Hatırlatıcı</Text>
                    </View>

                    <View style={styles.reminderListContainer}>
                        <View style={styles.alarmImageContainer}>
                            <TouchableOpacity onPress={toggleImage}>
                                <Image
                                    source={isActive
                                        ? require("../assets/images/active-alarm.png")
                                        : require("../assets/images/passive-alarm.png")}
                                />
                            </TouchableOpacity>
                        </View>

                        <View>
                            <View style={styles.taskContainer}>
                                <Text style={styles.taskTitle}>{title}</Text>
                                <Text style={styles.taskDetails}>{description}</Text>
                                <Text style={styles.taskDetails}>{formatDate(dueDate)}</Text>
                            </View>
                        </View>
                    </View>
                </View>




            <FooterComponent
                buttonText="Tamamlandı"
                iconName="backIcon2"
                onPress={navigateToHomeScreen}
            />

        </View>
    );
};

export default ReminderScreen;
