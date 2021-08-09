import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Icon} from 'react-native-elements';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function BackButtonIcon() {
  return (
    <View>
      <Icon
        name="chevron-left"
        type="feather"
        color="#fff"
        size={25}
        containerStyle={styles.container}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 55,
    height: 55,
  },
});
