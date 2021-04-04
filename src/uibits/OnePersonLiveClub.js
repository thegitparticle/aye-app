import React, {useEffect, useRef} from 'react';
import {
  View,
  Image,
  Animated,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import FastImage from 'react-native-fast-image';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function OnePersonLiveClub(props) {
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
  console.log(imagesList);
  var dummy_live_person = ['34']; // grab from pubnub

  function RenderOnlyLivePeopleHere(props) {
    if (dummy_live_person.includes(Object.keys(props.Member)[0])) {
      var member_id = Object.keys(props.Member)[0];
      console.log(Object.keys(props.Member));
      console.log('xxxxxyyyzzz');
      return (
        <Animated.View style={{transform: [{scale: anim.current}]}}>
          <FastImage
            source={{uri: props.Member[member_id]}}
            style={styles.AvatarStyleLiveClub}
            size={68}
          />
        </Animated.View>
      );
    } else {
      return <View />;
    }
  }

  return (
    <View>
      {imagesList.map((item, index) => (
        <RenderOnlyLivePeopleHere Member={item} />
      ))}
    </View>
  );
}

export default OnePersonLiveClub;

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
});
