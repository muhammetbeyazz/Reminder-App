import React from 'react';
import { View, Text, Image, TouchableOpacity, Button, GestureResponderEvent, } from 'react-native';
import styles from '../components/style';
import HeaderComponent from '../components/headerComponent';


const CompletedScreen = ({ navigation }) => {
    const navigateToHomeScreen = () => {
        navigation.navigate('Home');
    };

    return (
        <View style={styles.homeScreen}>

            <HeaderComponent
                leftButtonPress={navigateToHomeScreen}
                leftButtonText="Anımsatıcılar"
                leftButtonImage={require("../assets/images/back-icon.png")}
                showMenuIcon={true}
            />



            <View style={styles.body}>

                <View style={styles.bodyTitleContainer}>
                    <Text style={styles.bodyTitleText}>Tamamlananlar</Text>
                </View>
                <View style={styles.reminderListContainer}>
                    <View>

                    </View>
                </View>
            </View>



            <FooterComponent
                buttonText="Tamamlandı"
                iconName="tickIcon"
                onPress={navigateToHomeScreen}
            />


        </View>
    );
};

export default CompletedScreen;

