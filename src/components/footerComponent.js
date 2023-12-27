import { React } from 'react';
import { View, Text, Image, TouchableOpacity, } from 'react-native';
import { StyleSheet } from 'react-native';

// İcon yolları
const icons = {
    addIcon: require('../assets/images/add-icon.png'),
    backIcon2: require('../assets/images/back-icon-2.png'),
    saveIcon: require('../assets/images/save-icon.png'),
    tickIcon: require('../assets/images/tick-icon.png')
};

// Footer 
const FooterComponent = ({ buttonText, iconName, onPress }) => {

    return (
        <View style={styles.footer}>
            <TouchableOpacity
                style={styles.addReminderContainer}
                onPress={onPress}
            >
                <Image source={icons[iconName]} style={styles.icons} />
                <Text style={styles.footerText}>{buttonText}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    //Footer Stil Tanımlamaları
    footer: {
        height: 75,
        width: "100%",
        backgroundColor: '#201D1D',
        borderTopWidth: 1,
        //borderTopColor: '#e0e0e0',
        zIndex: 1,
      },
      addReminderContainer: {
        width: "auto",
        paddingVertical: 5,
        paddingHorizontal: 4,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        verticalAlign: "middle",    
        position: "absolute",
        left: 18,
        top: 16,
        flexDirection: 'row',
      },
      footerText: {
        fontSize: 18,
        color: "#5F45FF",
        fontWeight: "bold",
        paddingLeft: 8,
        textAlign: "center",
        textAlignVertical: "center",
      },
      icons: {
        height: 26,
        width: 26,
        resizeMode: 'contain',
      },   
});

export default FooterComponent;