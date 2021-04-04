import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Platform,
} from 'react-native';
import DirectBit from '../uibits/DirectBit';
import {DirectsDummyData} from '../dummy/DirectsDummyData';
import {ListItem, Badge, Icon} from 'react-native-elements';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function DirectsList() {
  function RenderItem(props) {
    return (
      <ListItem topDivider containerStyle={styles.list_item_container}>
        <DirectBit Direct={props.Direct} />
      </ListItem>
    );
  }

  return (
    <View style={styles.overall_view}>
      {DirectsDummyData.map((item, index) => (
        <RenderItem Direct={item} />
      ))}
    </View>
  );
}

export default DirectsList;

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
