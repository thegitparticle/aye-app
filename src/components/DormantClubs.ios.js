import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Platform,
} from 'react-native';
import DormantClubBit from '../uibits/DormantClubBit';
import {ClubDummyData} from '../dummy/ClubDummyData';
import {ListItem, Badge, Icon} from 'react-native-elements';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function DormantClubs() {
  function RenderItem(props) {
    return (
      <ListItem topDivider containerStyle={styles.list_item_container}>
        <DormantClubBit Club={props.Club} />
      </ListItem>
    );
  }

  return (
    <View style={styles.overall_view}>
      {ClubDummyData.map((item, index) => (
        <RenderItem Club={item} />
      ))}
    </View>
  );
}

export default DormantClubs;

const styles = StyleSheet.create({
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
