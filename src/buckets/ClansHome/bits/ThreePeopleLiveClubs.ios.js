import React, {useEffect, useRef, useContext} from 'react';
import {View, Animated, StyleSheet, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import ThemeContext from '../../../themes/Theme';

const windowHeight = Dimensions.get('window').height;
// const windowWidth = Dimensions.get('window').width;

function ThreePeopleLiveClub(props) {
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
  var firsturl = imagesList[0];
  var secondurl = imagesList[1];
  var thirdurl = imagesList[2];

  return (
    <View style={styles.ThreeLivePersonsView}>
      <View style={styles.ThreeLivePerson1}>
        <Animated.View style={{transform: [{scale: anim.current}]}}>
          <FastImage
            source={{uri: firsturl}}
            style={{
              ...styles.AvatarStyleLiveClub,
              borderColor: theme.colors.off_white,
              backgroundColor: theme.colors.off_white,
            }}
            size={68}
          />
        </Animated.View>
      </View>
      <View style={styles.ThreeLivePerson2}>
        <Animated.View style={{transform: [{scale: anim.current}]}}>
          <FastImage
            source={{uri: secondurl}}
            style={{
              ...styles.AvatarStyleLiveClub,
              borderColor: theme.colors.off_white,
              backgroundColor: theme.colors.off_white,
            }}
            size={68}
          />
        </Animated.View>
        <Animated.View style={{transform: [{scale: anim.current}]}}>
          <FastImage
            source={{uri: thirdurl}}
            style={{
              ...styles.AvatarStyleLiveClub3,
              borderColor: theme.colors.off_white,
              backgroundColor: theme.colors.off_white,
            }}
            size={68}
          />
        </Animated.View>
      </View>
    </View>
  );
}

export default ThreePeopleLiveClub;

const styles = StyleSheet.create({
  AvatarStyleLiveClub: {
    marginHorizontal: -2,
    width: windowHeight * 0.08,
    height: windowHeight * 0.08,
    borderRadius: windowHeight * 0.4,
    borderWidth: 3,
  },
  ThreeLivePerson2: {
    flexDirection: 'row',
    marginTop: -15,
    elevation: 10,
  },
  ThreeLivePersonsView: {
    flexDirection: 'column',
    alignItems: 'center',
    elevation: 10,
  },
  AvatarStyleLiveClub3: {
    marginHorizontal: -4,
    marginTop: -7.5,
    width: windowHeight * 0.08,
    height: windowHeight * 0.08,
    borderRadius: windowHeight * 0.04,
    borderWidth: 3,
  },
});
