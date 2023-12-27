// MenuBar.js
import React from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';

const { width, height } = Dimensions.get('window');

const MenuBar = ({ animatedValue }) => {
  const menuTranslateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-0.4 * width, 0],
  });

  const menuStyle = {
    transform: [
      {
        translateX: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [-300, 0] // Bu değerleri ihtiyacınıza göre ayarlayın
        })
      }
    ]
  };

  return (
    <Animated.View
      style={[
        styles.menuContainer,
        {
          transform: [{ translateX: menuTranslateX }],
        },
      ]}
    >
      {/* Menü içeriği burada yer alabilir */}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    width: 0.4 * width,
    height: height,
    backgroundColor: 'white',
    // Diğer stil tanımlamaları
  },
});

export default MenuBar;
