import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Platform,
} from 'react-native';
import LiveClubComponent from './LiveClubComponent';
import {ListItem, Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import _ from 'lodash';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function LiveClubs(props) {
  var live_clubs_data_here = props.ClubsData;

  const navigation = useNavigation();

  return (
    <ScrollView
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        marginBottom: live_clubs_data_here.length > 0 ? windowHeight * 0.05 : 0,
      }}>
      {_.uniqBy(live_clubs_data_here, 'club_id').map((comp, index) => (
        <ListItem
          underlayColor="transparent"
          containerStyle={
            index % 2 === 0
              ? styles.ListItemContainerEven
              : styles.ListItemContainerOdd
          }
          onPress={() =>
            navigation.navigate('ClubInteractionScreens', {
              screen: 'ClubChatScreen',
              params: {
                clubNameHere: comp.club_name,
                channelIdHere: comp.pn_channel_id,
                channelOnGoing: comp.on_going_frame,
                channelStartTime: comp.start_time,
                channelEndTime: comp.end_time,
                clubID: comp.club_id,
              },
            })
          }>
          <ListItem.Content style={styles.ImagesContainer}>
            <LiveClubComponent Club={comp} LiveMembers={comp.display_photos} />
          </ListItem.Content>
          <ListItem.Content style={styles.list_item_content}>
            <ListItem.Title style={styles.LiveClubName}>
              {comp.club_name.length < 15
                ? comp.club_name
                : comp.club_name.substring(0, 14)}
            </ListItem.Title>
            <ListItem.Subtitle>
              <View style={styles.subtitle_view}>
                <Icon type="feather" color="#7D4DF9" name="layers" size={16} />
                <Text style={styles.subtitle_text}>new frames</Text>
              </View>
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
    </ScrollView>
  );
}

export default LiveClubs;

const styles = StyleSheet.create({
  list_item_content: {
    height: windowHeight * 0.0719 * 0.75,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  subtitle_view: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle_icon: {},
  subtitle_text: {
    marginLeft: 5,
    //color: Platform.OS === 'ios' ? '#2dbbff' : 'rgb(109, 187, 253)',
    color: '#7D4DF9',
    fontFamily: 'GothamRounded-Book',
    fontSize: Platform.OS === 'ios' ? 13 : 12,
  },
  ListItemContainerEven: {
    flexDirection: 'column',
    marginRight: windowWidth * 0.5,
    backgroundColor: 'transparent',
  },
  ListItemContainerOdd: {
    flexDirection: 'column',
    marginLeft: windowWidth * 0.5,
    backgroundColor: 'transparent',
  },
  ImagesContainer: {},
  ScrollViewStyle: {
    marginBottom: windowHeight * 0.05,
  },
  LiveClubName: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: Platform.OS === 'ios' ? 17 : 16,
    color: '#06090e',
  },
});
