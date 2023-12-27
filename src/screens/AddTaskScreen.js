import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, KeyboardAvoidingView, ScrollView, } from 'react-native';
import { Switch } from 'react-native-paper';
import styles from '../components/style';
import FooterComponent from '../components/footerComponent';
import HeaderComponent from '../components/headerComponent';
import LinearGradient from 'react-native-linear-gradient';

const AddTaskScreen = ({ navigation }) => {


  const navigateToHomeScreen = () => {
    navigation.navigate('Home');
  };

  // Her bir switch için ayrı state tanımları
  const [isDateSwitchOn, setIsDateSwitchOn] = React.useState(false);
  const [isTimeSwitchOn, setIsTimeSwitchOn] = React.useState(false);
  const [isReminderSwitchOn, setIsReminderSwitchOn] = React.useState(false);
  const [isSoundSwitchOn, setIsSoundSwitchOn] = React.useState(false);
  // Her bir switch için ayrı toggle fonksiyonları
  const toggleDateSwitch = () => setIsDateSwitchOn(!isDateSwitchOn);
  const toggleTimeSwitch = () => setIsTimeSwitchOn(!isTimeSwitchOn);
  const toggleReminderSwitch = () => setIsReminderSwitchOn(!isReminderSwitchOn);
  const toggleSoundSwitch = () => setIsSoundSwitchOn(!isSoundSwitchOn);


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
                  />
                  <TextInput
                    placeholder="Not Ekle"
                    placeholderTextColor="#B0B0B0"
                    multiline
                    style={styles.addDescription}
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
                    <Switch
                      value={isDateSwitchOn}
                      onValueChange={toggleDateSwitch}
                      style={styles.switch}
                      trackColor={{ false: "#767577", true: "#02C45B" }}
                      thumbColor={isDateSwitchOn ? "#f4f3f4" : "#f4f3f4"}
                    />
                  </View>
                  {isDateSwitchOn && (
                    <View style={styles.selectionMainContainer}>
                      <View style={styles.selectionContainer}>
                        <LinearGradient
                          colors={['rgba(32, 29, 29, 1)', '#91A2FF']}
                          style={{ height: 22 }}>
                        </LinearGradient>
                        <View style={styles.selection}>

                        </View>
                        <LinearGradient
                          colors={['#91A2FF', 'rgba(32, 29, 29, 1)']}
                          style={{ height: 22 }}>
                        </LinearGradient>
                      </View>
                    </View>
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
                    <Switch
                      value={isTimeSwitchOn}
                      onValueChange={toggleTimeSwitch}
                      style={styles.switch}
                      trackColor={{ false: "#767577", true: "#02C45B" }}
                      thumbColor={isTimeSwitchOn ? "#f4f3f4" : "#f4f3f4"}
                    />
                  </View>
                  {isTimeSwitchOn && (
                    <View style={styles.selectionMainContainer}>
                      <View style={styles.selectionContainer}>
                        <LinearGradient
                          colors={['rgba(32, 29, 29, 1)', '#91A2FF']}
                          style={{ height: 22 }}>
                        </LinearGradient>
                        <View style={styles.selection}>

                        </View>
                        <LinearGradient
                          colors={['#91A2FF', 'rgba(32, 29, 29, 1)']}
                          style={{ height: 22 }}>
                        </LinearGradient>
                      </View>
                    </View>
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
                      <View style={styles.selectionContainer}>
                        <LinearGradient
                          colors={['rgba(32, 29, 29, 1)', '#91A2FF']}
                          style={{ height: 22 }}>
                        </LinearGradient>
                        <View style={styles.selection}>

                        </View>
                        <LinearGradient
                          colors={['#91A2FF', 'rgba(32, 29, 29, 1)']}
                          style={{ height: 22 }}>
                        </LinearGradient>
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
                        <LinearGradient
                          colors={['rgba(32, 29, 29, 1)', '#91A2FF']}
                          style={{ height: 22 }}>
                        </LinearGradient>
                        <View style={styles.selection}>
                        </View>
                        <LinearGradient
                          colors={['#91A2FF', 'rgba(32, 29, 29, 1)']}
                          style={{ height: 22 }}>
                        </LinearGradient>
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
          onPress={navigateToHomeScreen}
        />


      </KeyboardAvoidingView >

    </View >
  );
};

export default AddTaskScreen;
