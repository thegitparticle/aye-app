import React, {useEffect, useRef, useContext} from 'react';
import {View, Animated, StyleSheet, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import ThemeContext from '../../../themes/Theme';

const windowHeight = Dimensions.get('window').height;
// const windowWidth = Dimensions.get('window').width;

function TwoPeopleLiveClub(props) {
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
  return (
    <View style={styles.TwoLivePersonsView}>
      {imagesList.map((urlhere, index) => (
        <Animated.View style={{transform: [{scale: anim.current}]}}>
          <FastImage
            source={{uri: urlhere}}
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

export default TwoPeopleLiveClub;

const styles = StyleSheet.create({
  TwoLivePersonsView: {
    flexDirection: 'row',
    elevation: 10,
  },
  AvatarStyleLiveClub: {
    marginHorizontal: -2,
    width: windowHeight * 0.08,
    height: windowHeight * 0.08,
    borderRadius: windowHeight * 0.4,
    borderWidth: 3,
  },
});
