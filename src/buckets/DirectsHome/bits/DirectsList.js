import React, {useContext} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import DirectBit from './DirectBit';
import {ListItem} from 'react-native-elements';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {usePubNub} from 'pubnub-react';
import {connect} from 'react-redux';
import {GetDirectsList} from '../../../redux/DirectsListActions';
import BannerIfDmsEmpty from '../screens/BannerIfDmsEmpty';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ThemeContext from '../../../themes/Theme';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

var state_here = {};

function DirectsList({dispatch}) {
  const pubnub = usePubNub();
  const navigation = useNavigation();
  const theme = useContext(ThemeContext);

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
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('DirectInteractionScreens', {
            screen: 'DirectChatScreen',
            params: {
              otherNameHere: props.Direct.display_guys.full_name,
              //channelIdHere: props.club_id.toString() + '_c',
              directIdHere: props.Direct.direct_channel_id,
              channelOnGoing: props.Direct.ongoing_frame,
              channelStartTime: props.Direct.start_time,
              channelEndTime: props.Direct.end_time,
            },
          });
        }}>
        <ListItem
          bottomDivider
          containerStyle={styles.list_item_container}
          underlayColor={theme.colors.off_light}>
          <DirectBit Direct={props.Direct} />
        </ListItem>
      </TouchableOpacity>
    );
  }

  if (DirectsListHere.length > 0) {
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
    width: windowWidth,
  },
});
