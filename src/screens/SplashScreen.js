/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';

export default function SplashScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
      }}>
      <LottieView
        source={require('../assets/kickcat.json')}
        autoPlay
        loop={false}
        speed={0.5}
        onAnimationFinish={() => {
          console.log('Animation Finished!');
          this.props.navigation.replace('Home');
        }}
      />
    </View>
  );
}
