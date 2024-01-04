import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MenuBarComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigation = useNavigation();

  const handleMenuPress = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemPress = (screenName) => {
    setIsMenuOpen(false);
    switch (screenName) {
      case 'Kapat':
        // Do something when "Kapat" is pressed
        break;
      case 'Yeni Anımsatıcı Ekle':
        navigation.navigate('AddTask');
        break;
      case 'Anımsatıcılar':
        navigation.navigate('Home');
        break;
      case 'Tamamlananlar':
        navigation.navigate('CompletedTasks');
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.menuBarContainer}>
      <TouchableOpacity onPress={handleMenuPress}>
        <Image source={require('../assets/images/menu-icon.png')} style={styles.menuIcon} />
      </TouchableOpacity>

      {isMenuOpen && (
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuItemPress('Kapat')}>
            <Image source={require('../assets/images/close-menu-icon.png')} style={styles.menuItemIcon} />
            <Text style={styles.menuItemText}>Kapat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuItemPress('Yeni Anımsatıcı Ekle')}>
            <Image source={require('../assets/images/yeni-animsatici-ekle-menu-icon.png')} style={styles.menuItemIcon} />
            <Text style={styles.menuItemText}>Yeni Anımsatıcı Ekle</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuItemPress('Anımsatıcılar')}>
            <Image source={require('../assets/images/animsaticilar-menu-icon.png')} style={styles.menuItemIcon} />
            <Text style={styles.menuItemText}>Anımsatıcılar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuItemPress('Tamamlananlar')}>
            <Image source={require('../assets/images/tamamlananlar-menu-icon.png')} style={styles.menuItemIcon} />
            <Text style={styles.menuItemText}>Tamamlananlar</Text>
          </TouchableOpacity>
          
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  menuBarContainer: {
    position: 'absolute',
    top: 20,
    right: 10,
    zIndex: 1,
  },
  menuIcon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },
  menu: {
    position: 'absolute',
    top: -10,
    right: 200,
    width: 200,
    height: 800,
    backgroundColor: '#7D6BED',
    borderRadius: 8,
    padding: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomColor: '#ccc',
    top: 250,
  },
  menuItemText: {
    fontSize: 15,
    color: 'white',
    marginLeft: 5,
  },
  menuItemIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 5,
  },
});

export default MenuBarComponent;