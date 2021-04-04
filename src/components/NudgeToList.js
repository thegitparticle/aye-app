import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Platform,
} from 'react-native';
import NudgeToBit from '../uibits/NudgeToBit';
import {NudgeToDummyData} from '../dummy/NudgeToDummyData';
import {ListItem, Badge, Icon} from 'react-native-elements';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function NudgeToList() {
  function RenderItem(props) {
    return (
      <ListItem topDivider containerStyle={styles.list_item_container}>
        <NudgeToBit NudgeTo={props.NudgeTo} />
      </ListItem>
    );
  }

  return (
    <View style={styles.overall_view}>
      <Text style={styles.nudgeto_heading}>MORE FRIENDS</Text>
      {NudgeToDummyData.map((item, index) => (
        <RenderItem NudgeTo={item} />
      ))}
    </View>
  );
}

export default NudgeToList;

const styles = StyleSheet.create({
  nudgeto_heading: {
    fontSize: 17,
    fontFamily: 'GothamRounded-Bold',
    marginHorizontal: 30,
    marginBottom: 30,
  },
  overall_view: {
    flexDirection: 'column',
    marginBottom: windowHeight * 0.1,
  },
  list_item_container: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    borderColor: '#05050510',
  },
});
