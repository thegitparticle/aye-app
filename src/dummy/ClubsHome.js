import React from 'react';
import {View, Text, SafeAreaView, Pressable, StyleSheet} from 'react-native';
import HeaderAtHome from '../components/HeaderAtHome';
import FastImage from 'react-native-fast-image';

function ClubsHomeD({dispatch}) {
  return (
    <View style={styles.overall_view}>
      <Text>Home Stack not Root</Text>
    </View>
  );
}

export default ClubsHomeD;

const styles = StyleSheet.create({
  overall_view: {flex: 1},
});
