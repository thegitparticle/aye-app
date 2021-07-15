import React, {useEffect, useRef} from 'react';
import {View, Animated, StyleSheet, Dimensions, Platform} from 'react-native';
import FastImage from 'react-native-fast-image';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function ThreePeopleLiveClub(props) {
  const anim = useRef(new Animated.Value(1));

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
            style={styles.AvatarStyleLiveClub}
            size={68}
          />
        </Animated.View>
      </View>
      <View style={styles.ThreeLivePerson2}>
        <Animated.View style={{transform: [{scale: anim.current}]}}>
          <FastImage
            source={{uri: secondurl}}
            style={styles.AvatarStyleLiveClub}
            size={68}
          />
        </Animated.View>
        <Animated.View style={{transform: [{scale: anim.current}]}}>
          <FastImage
            source={{uri: thirdurl}}
            style={styles.AvatarStyleLiveClub3}
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
    /*
        shadowOffset: {height: 10},
        shadowColor: '#fff',
        shadowOpacity: 1,
        shadowRadius: 20,
    */
    width: windowHeight * 0.08,
    height: windowHeight * 0.08,
    borderRadius: windowHeight * 0.4,
    borderColor: '#f1f4f9',
    borderWidth: Platform.OS === 'ios' ? 3 : 0,
    backgroundColor: '#f1f4f9',
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
    /*
    shadowOffset: {height: 10},
    shadowColor: '#fff',
    shadowOpacity: 1,
    shadowRadius: 20,
*/
    width: windowHeight * 0.08,
    height: windowHeight * 0.08,
    borderRadius: windowHeight * 0.04,
    borderColor: '#f1f4f9',
    borderWidth: Platform.OS === 'ios' ? 3 : 0,
    backgroundColor: '#f1f4f9',
  },
});
