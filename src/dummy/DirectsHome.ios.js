import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import DirectsList from '../components/DirectsList';
import NudgeToList from '../components/NudgeToList';

function DirectsHomeD({dispatch}) {
  return (
    <ScrollView
      style={styles.overall_view}
      showsVerticalScrollIndicator={false}>
      <DirectsList />
      <NudgeToList />
    </ScrollView>
  );
}

export default DirectsHomeD;

const styles = StyleSheet.create({
  overall_view: {flex: 1},
});
