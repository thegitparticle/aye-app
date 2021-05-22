import React, {useMemo} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {Header} from 'react-native-elements';
import BackChevronDownIcon from '../uibits/BackChevronDownIcon';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function TheAyeScreen() {
  return (
    <View style={styles.containerview}>
      <Header
        rightComponent={<BackChevronDownIcon />}
        backgroundColor="#fafafa"
      />
    </View>
  );
}

export default TheAyeScreen;

const styles = StyleSheet.create({
  containerview: {
    //backgroundColor: '#f1f4f8',
    backgroundColor: '#fafafa',
    flex: 1,
    justifyContent: 'space-between',
  },
});
