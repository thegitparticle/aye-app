import React, {useEffect, useRef, useContext} from 'react';
import {View, Animated, StyleSheet, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import ThemeContext from '../../../themes/Theme';
import LinearGradient from 'react-native-linear-gradient';

const windowHeight = Dimensions.get('window').height;
// const windowWidth = Dimensions.get('window').width;

function OnePersonLiveClub(props) {
  const anim = useRef(new Animated.Value(1));
  const theme = useContext(ThemeContext);

  useEffect(() => {
    // makes the sequence loop
    Animated.loop(
      // runs given animations in a sequence
      Animated.sequence([
        // increase size
        Animated.timing(anim.current, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        // decrease size
        Animated.timing(anim.current, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  var imagesList = props.URLList;

  if (props.NewMessages > 0) {
    return (
      <View>
        {imagesList.map((item, index) => (
          <Animated.View style={{transform: [{scale: anim.current}]}}>
            <LinearGradient
              colors={['#f85032', '#e73827']}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                width: windowHeight * 0.09,
                height: windowHeight * 0.09,
                borderRadius: windowHeight * 0.045,
                backgroundColor: 'tomato',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <FastImage
                source={{uri: item}}
                style={{
                  ...styles.AvatarStyleLiveClubNew,
                  backgroundColor: theme.colors.off_light,
                }}
                size={68}
              />
            </LinearGradient>
          </Animated.View>
        ))}
      </View>
    );
  } else {
    return (
      <View>
        {imagesList.map((item, index) => (
          <Animated.View style={{transform: [{scale: anim.current}]}}>
            <FastImage
              source={{uri: item}}
              style={{
                ...styles.AvatarStyleLiveClub,
                borderColor: theme.colors.off_light,
                backgroundColor: theme.colors.off_light,
              }}
              size={68}
            />
          </Animated.View>
        ))}
      </View>
    );
  }
}

export default OnePersonLiveClub;

const styles = StyleSheet.create({
  AvatarStyleLiveClubNew: {
    marginHorizontal: -2,
    width: windowHeight * 0.08,
    height: windowHeight * 0.08,
    borderRadius: windowHeight * 0.04,
    borderWidth: 0,
  },
  AvatarStyleLiveClub: {
    marginHorizontal: -2,
    width: windowHeight * 0.08,
    height: windowHeight * 0.08,
    borderRadius: windowHeight * 0.04,
    borderWidth: 3,
  },
});
