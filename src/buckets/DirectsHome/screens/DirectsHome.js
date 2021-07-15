/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useContext, useMemo} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  SectionList,
  FlatList,
  Dimensions,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import DirectsList from '../bits/DirectsList';
import NudgeToList from '../bits/NudgeToList';
import {connect} from 'react-redux';
import {GetDirectsList} from '../../../redux/DirectsListActions';
import {GetMyNudgeToList} from '../../../redux/MyNudgeToListActions';
import {usePubNub} from 'pubnub-react';
import ThemeContext from '../../../themes/Theme';
import BannerIfDmsEmpty from './BannerIfDmsEmpty';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import DirectBit from '../bits/DirectBit';
import NudgeToBit from '../bits/NudgeToBit';
import {TouchableOpacity} from 'react-native-gesture-handler';

var state_here = {};

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function DirectsHomeD({dispatch}) {
  const pubnub = usePubNub();
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();

  var DirectsListHere = state_here.DirectsListReducer.directslist;
  var NudgeToData = state_here.MyNudgeToListReducer.mynudgetolist;

  const user_id_here = state_here.MyProfileReducer.myprofile.user.id;

  useFocusEffect(
    React.useCallback(() => {
      if (user_id_here > 0) {
        dispatch(GetDirectsList(user_id_here));
      }
    }, [dispatch, user_id_here]),
  );

  useEffect(() => {
    dispatch(GetMyNudgeToList(state_here.MyProfileReducer.myprofile.user.id));
  }, [dispatch]);

  var grandList = [
    {
      title: 'DMs',
      data: DirectsListHere,
    },
    {
      title: 'MORE FRIENDS',
      data: NudgeToData,
    },
  ];

  function RenderDirectComponent(props) {
    console.log(props.Direct);
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('DirectInteractionScreens', {
            screen: 'DirectChatScreen',
            params: {
              otherNameHere: props.Direct.item.display_guys.full_name,
              directIdHere: props.Direct.item.direct_channel_id,
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

  function RenderComponent(props) {
    const x_here = props.Item.item;

    if (x_here.direct_channel_id) {
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('DirectInteractionScreens', {
              screen: 'DirectChatScreen',
              params: {
                otherNameHere: x_here.display_guys.full_name,
                directIdHere: x_here.direct_channel_id,
                channelOnGoing: x_here.ongoing_frame,
                channelStartTime: x_here.start_time,
                channelEndTime: x_here.end_time,
              },
            });
          }}>
          <ListItem
            bottomDivider
            containerStyle={styles.list_item_container}
            underlayColor={theme.colors.off_light}>
            <DirectBit Direct={x_here} />
          </ListItem>
        </TouchableOpacity>
      );
    } else {
      return (
        <ListItem
          bottomDivider
          containerStyle={styles.list_item_container}
          underlayColor="#EEEEEE"
          onPress={() =>
            navigation.navigate('OtherProfile', {
              other_user_id: x_here.id,
            })
          }>
          <NudgeToBit NudgeTo={x_here} />
        </ListItem>
      );
    }
  }

  // const NudgeTo = useMemo(
  //   () =>
  //     function NudgeTo(props) {
  //       var x_here = props.Nudge;
  //       return (
  //         <ListItem
  //           bottomDivider
  //           containerStyle={styles.list_item_container}
  //           underlayColor="#EEEEEE"
  //           onPress={() =>
  //             navigation.navigate('OtherProfile', {
  //               other_user_id: x_here.id,
  //             })
  //           }>
  //           <NudgeToBit NudgeTo={x_here} />
  //         </ListItem>
  //       );
  //     },
  //   [NudgeToData],
  // );

  //   if (x_here.direct_channel_id) {
  //     return <Direct Direct={x_here} />;
  //   } else {
  //     return <NudgeTo Nudge={x_here} />;
  //   }
  // }

  return (
    <FlatList
      data={DirectsListHere}
      keyExtractor={item => item.direct_channel_id}
      renderItem={item => <RenderDirectComponent Direct={item} />}
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
        backgroundColor: theme.colors.full_light,
      }}
      showsVerticalScrollIndicator={false}
    />

    // <SectionList
    //   sections={grandList}
    //   keyExtractor={(item, index) => item + index}
    //   renderItem={item => <RenderComponent Item={item} />}
    //   renderSectionHeader={({section: {title}}) => (
    //     <Text
    //       style={{
    //         ...theme.text.header,
    //         color: theme.colors.full_dark_50,
    //         margin: 20,
    //       }}>
    //       {title}
    //     </Text>
    //   )}
    // />
  );
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
