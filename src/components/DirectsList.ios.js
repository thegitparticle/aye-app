import React, {useState} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import DirectBit from '../uibits/DirectBit';
import {ListItem} from 'react-native-elements';
import {useFocusEffect} from '@react-navigation/native';
import {usePubNub} from 'pubnub-react';
import {connect} from 'react-redux';
import {GetDirectsList} from '../redux/DirectsListActions';
import BannerIfDmsEmpty from '../uibits/BannerIfDmsEmpty';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

var state_here = {};

function DirectsList({dispatch, navigation}) {
  const pubnub = usePubNub();

  const DirectsListHere = state_here.DirectsListReducer.directslist;

  const user_id_here = state_here.MyProfileReducer.myprofile.user.id;

  useFocusEffect(
    React.useCallback(() => {
      if (user_id_here > 0) {
        dispatch(GetDirectsList(user_id_here));
      }
    }, [dispatch, user_id_here]),
  );

  function RenderItem(props) {
    return (
      <ListItem bottomDivider containerStyle={styles.list_item_container}>
        <DirectBit Direct={props.Direct} />
      </ListItem>
    );
  }

  if (DirectsListHere.length > 0) {
    console.log(DirectsListHere);
    return (
      <View style={styles.overall_view}>
        <Text style={styles.directs_heading}>DMs</Text>
        {DirectsListHere.map((item, index) => (
          <RenderItem Direct={item} />
        ))}
      </View>
    );
  } else {
    return (
      <View style={styles.overall_view_empty}>
        <BannerIfDmsEmpty />
      </View>
    );
  }
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

  overall_view_empty: {
    flexDirection: 'column',
  },
  list_item_container: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    borderColor: '#05050510',
  },
});
