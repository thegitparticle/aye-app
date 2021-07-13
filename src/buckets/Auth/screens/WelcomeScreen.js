import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
  StatusBar,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SharedElement} from 'react-navigation-shared-element';
import Iconly from '../../../external/Iconly';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function WelcomeScreen({navigation}) {
  return (
    <View style={styles.view}>
      <StatusBar backgroundColor="transparent" barStyle="light-content" />
      <ImageBackground
        source={{
          uri: 'https://media.giphy.com/media/nbR3NEcLHM9eLXLgPx/giphy.gif',
        }}
        style={styles.demo_image}>
        <LinearGradient
          colors={['#05050500', '#050505']}
          style={styles.linearGradient}>
          <Image
            source={require('/Users/san/Desktop/toastgo/assets/logo_ypop_2.png')}
            style={styles.logo_image}
          />
        </LinearGradient>
      </ImageBackground>
      <Pressable
        style={styles.button_view}
        onPress={() => {
          navigation.navigate('EnterPhone');
          console.log('got pressed');
        }}>
        <SharedElement id="next_button_1">
          <Iconly name="ArrowRightBold" color="#EEEEEE" size={50} />
        </SharedElement>
      </Pressable>
    </View>
  );
}

WelcomeScreen.sharedElements = route => {
  return [
    {
      id: 'next_button_1',
      animation: 'move',
      resize: 'clip',
    },
  ];
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  button_view: {
    flex: 0.2,
    //alignItems: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  linearGradient: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  view: {
    backgroundColor: '#050505',
    flex: 1,
  },

  demo_image: {
    width: windowWidth,
    height: windowHeight * 0.8,
    flex: 0.8,
  },
  brief_text: {
    fontSize: 21,
    fontFamily: 'GothamRounded-Bold',
    color: '#FFFFFF',
    marginVertical: windowHeight * 0.3,

    transform: [
      {
        rotate: '-45deg',
      },
    ],
  },
  logo_image: {
    width: 274,
    height: 200,
  },
});
