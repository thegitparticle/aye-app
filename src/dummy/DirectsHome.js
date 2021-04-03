import React from 'react';
import {View, Text, SafeAreaView, Pressable, StyleSheet} from 'react-native';
import HeaderAtHome from '../components/HeaderAtHome';

function DirectsHomeD({dispatch}) {
  return (
    <View style={styles.overall_view}>
      <Text>Directs not Root</Text>
    </View>
  );
}

export default DirectsHomeD;

const styles = StyleSheet.create({
  overall_view: {flex: 1},
});
