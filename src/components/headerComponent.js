import { React, useState } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { StyleSheet } from 'react-native';
import MenuBarComponent from './menuBarComponent';

const HeaderComponent = ({ leftButtonPress, leftButtonText, leftButtonImage, showMenuIcon, }) => {



    return (
        <View style={styles.header}>
            <MenuBarComponent></MenuBarComponent>
            {leftButtonText && (
                <TouchableOpacity style={styles.backContainer} onPress={leftButtonPress}>
                    {leftButtonImage && <Image source={leftButtonImage} style={styles.icons} />}
                    <Text style={styles.headerTitleText}>{leftButtonText}</Text>
                </TouchableOpacity>
            )}

           
        </View>
    );
};

const styles = StyleSheet.create({

    header: {
        width: "100%",
        height: 60,
        justifyContent: 'center',
        borderBottomWidth: 1,
        //borderBottomColor: '#e0e0e0',
        zIndex: 1,
    },
    backContainer: {
        width: "100%",
        height: 28,
        alignItems: 'center',
        flexDirection: 'row',
    },
    icons: {
        height: 26,
        width: 26,
        resizeMode: 'contain',
    },
    headerTitleText: {
        height: 25,
        width: "auto",
        fontSize: 15,
        color: "#5F45FF",
        textAlignVertical: "center",
        marginLeft: 5,
        paddingHorizontal: 5,
    },
    menuIconConatiner: {
        alignItems: "center",
        justifyContent: 'center',
        position: "absolute",
        left: 355,
        padding: 5,
    },




});


export default HeaderComponent;
