import React, {useState} from 'react';
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
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {usePubNub} from 'pubnub-react';
import {connect} from 'react-redux';
import {GetDirectsList} from '../redux/DirectsListActions';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

var state_here = {};

function DirectsList({dispatch, navigation}) {
  const pubnub = usePubNub();

  const DirectsListHere = state_here.DirectsListReducer.directslist;

  useFocusEffect(
    React.useCallback(() => {
      dispatch(
        GetDirectsList(pubnub, state_here.MyProfileReducer.myprofile.user.id),
      );
    }, [dispatch]),
  );

  function RenderItem(props) {
    return (
      <ListItem bottomDivider containerStyle={styles.list_item_container}>
        <DirectBit Direct={props.Direct} />
      </ListItem>
    );
  }

  return (
    <View style={styles.overall_view}>
      <Text style={styles.directs_heading}>DMs</Text>
      {DirectsListHere.map((item, index) => (
        <RenderItem Direct={item} />
      ))}
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(DirectsList);

const styles = StyleSheet.create({
  directs_heading: {
    fontSize: 17,
    fontFamily: 'GothamRounded-Bold',
    marginHorizontal: 20,
    marginBottom: 15,
    color: '#05050550',
  },
  overall_view: {
    flexDirection: 'column',
    marginTop: windowHeight * 0.015,
    marginBottom: windowHeight * 0.1,
  },
  list_item_container: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    borderColor: '#05050510',
  },
});
