/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Dimensions,
  RefreshControl,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import NudgeToList from '../bits/NudgeToList';
import {connect} from 'react-redux';
import {GetDirectsList} from '../../../redux/DirectsListActions';
import ThemeContext from '../../../themes/Theme';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import DirectBit from '../bits/DirectBit';
import {TouchableOpacity} from 'react-native-gesture-handler';
import BannerIfDmsEmpty from './BannerIfDmsEmpty';
import {GetMyNudgeToList} from '../../../redux/MyNudgeToListActions';
import {GetMyProfile} from '../../../redux/MyProfileActions';
import PubNub from 'pubnub';

var state_here = {};

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function DirectsHomeD({dispatch}) {
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();

  var DirectsListHere = state_here.DirectsListReducer.directslist;

  const user_id_here = state_here.MyProfileReducer.myprofile.user.id;

  const [refreshing, setRefreshing] = useState(false);

  function onRefresh() {
    setRefreshing(true);
    console.log('refreshing started');
    setTimeout(() => {
      setRefreshing(false);
    }, 2500);
  }

  useFocusEffect(
    React.useCallback(() => {
      const pubnubX = new PubNub({
        publishKey: 'pub-c-a65bb691-5b8a-4c4b-aef5-e2a26677122d',
        subscribeKey: 'sub-c-d099e214-9bcf-11eb-9adf-f2e9c1644994',
        uuid: state_here.MyProfileReducer.myprofile.user.id,
      });

      pubnubX.unsubscribeAll();

      if (user_id_here > 0) {
        dispatch(GetDirectsList(user_id_here));
        dispatch(
          GetMyNudgeToList(state_here.MyProfileReducer.myprofile.user.id),
        );
        dispatch(
          GetMyProfile(state_here.MyProfileReducer.myprofile.user.phone),
        );
      }
    }, [dispatch, user_id_here, refreshing]),
  );

  function RenderDirectComponent(props) {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('DirectInteractionScreens', {
            screen: 'DirectChatScreen',
            params: {
              clubNameHere: props.Direct.item.display_guys.full_name,
              channelIdHere: props.Direct.item.direct_channel_id,
              channelOnGoing: props.Direct.item.ongoing_frame,
              channelStartTime: props.Direct.item.start_time,
              channelEndTime: props.Direct.item.end_time,
            },
          });
        }}>
        <ListItem
          bottomDivider
          containerStyle={styles.list_item_container}
          underlayColor={theme.colors.off_light}>
          <DirectBit Direct={props.Direct.item} />
        </ListItem>
      </TouchableOpacity>
    );
  }

  if (DirectsListHere.length > 0) {
    return (
      <FlatList
        data={DirectsListHere}
        keyExtractor={item => item.direct_channel_id}
        renderItem={item => <RenderDirectComponent Direct={item} />}
        ListHeaderComponent={
          <View>
            <Text
              style={{
                ...theme.text.header,
                color: theme.colors.full_dark_50,
                margin: 20,
              }}>
              DMs
            </Text>
          </View>
        }
        ListFooterComponent={
          <View
            style={{
              marginTop: windowHeight * 0.05,
              marginBottom: windowHeight * 0.1,
            }}>
            <Text
              style={{
                ...theme.text.header,
                color: theme.colors.full_dark_50,
                margin: 20,
              }}>
              MORE FRIENDS
            </Text>
            <NudgeToList />
          </View>
        }
        style={{
          backgroundColor: theme.colors.off_light,
        }}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    );
  } else {
    return (
      <FlatList
        data={DirectsListHere}
        keyExtractor={item => item.direct_channel_id}
        renderItem={item => <RenderDirectComponent Direct={item} />}
        ListHeaderComponent={<BannerIfDmsEmpty />}
        ListFooterComponent={
          <View
            style={{
              marginTop: windowHeight * 0.05,
              marginBottom: windowHeight * 0.1,
            }}>
            <Text
              style={{
                ...theme.text.header,
                color: theme.colors.full_dark_50,
                margin: 20,
              }}>
              MORE FRIENDS
            </Text>
            <NudgeToList />
          </View>
        }
        style={{
          backgroundColor: theme.colors.off_light,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#333333"
          />
        }
      />
    );
  }
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(DirectsHomeD);

const styles = StyleSheet.create({
  overall_view: {
    flex: 1,
    overflow: 'visible',
    backgroundColor: '#FFF',
  },
  list_item_container: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    borderColor: '#05050510',
    width: windowWidth,
  },
});
