import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import ShowMessageOld from '../bits/ShowMessageOld';
import {usePubNub} from 'pubnub-react';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function ViewOldFrameClub({route, navigation}) {
  const {channel_id, club_name, start_time, end_time} = route.params;
  const [old_messages, addOldMessages] = useState();
  const [old_messages_resolve, changeOldMessagesResolve] = useState(false);
  const pubnub = usePubNub();

  console.log(old_messages);

  function LeftHeaderComponent() {
    return (
      <View style={styles.header_club_view}>
        <Text style={styles.header_club_name}>
          {club_name.substring(0, 14)}
        </Text>
      </View>
    );
  }

  function CenterHeaderComponent() {
    return <View />;
  }

  function RightHeaderComponent() {
    return (
      <Icon
        type="feather"
        color="#FFFFFF"
        name="chevron-down"
        onPress={() => navigation.goBack()}
      />
    );
  }

  useEffect(() => {
    pubnub.fetchMessages(
      {
        channels: [String(channel_id) + '_c'],
        includeMeta: true,
        end: String(end_time) + '0000000',
        start: String(start_time) + '0000000',
        count: 100, // default/max is 25 messages for multiple channels (up to 500)
      },
      function (status, response) {
        // console.log(response);
        if (response) {
          addOldMessages(response);
          changeOldMessagesResolve(true);
        }
      },
    );
  }, []);

  function RenderMessages() {
    if (!old_messages_resolve) {
      return <View />;
    } else {
      var x_here = old_messages.channels[String(channel_id) + '_c'];
      if (x_here.length > 0) {
        return old_messages.channels[
          String(channel_id) + '_c'
        ].map((item, index) => <ShowMessageOld Message={item} />);
      } else {
        return <View />;
      }
    }
  }

  return (
    <View style={styles.overall_view}>
      <Header
        backgroundColor="#050505"
        containerStyle={styles.header_container}
        barStyle="light-content">
        <LeftHeaderComponent />
        <CenterHeaderComponent />
        <RightHeaderComponent />
      </Header>

      <ScrollView
        style={styles.body_scroll_view}
        contentContainerStyle={styles.body_scroll_view_content_container}
        showsVerticalScrollIndicator={false}>
        <RenderMessages />
      </ScrollView>
    </View>
  );
}

export default ViewOldFrameClub;

const styles = StyleSheet.create({
  body_scroll_view: {
    flex: 0.92,
    backgroundColor: '#FFFFFF',
    width: windowWidth,
    borderRadius: 20,
    padding: 0,
    margin: 0,
  },
  body_scroll_view_content_container: {
    flexGrow: 1,
    width: windowWidth,
    alignItems: 'center',
    flexDirection: 'column',
    //justifyContent: 'flex-end',
    padding: 0,
    margin: 0,
  },
  overall_view: {
    flex: 1,

    backgroundColor: '#050505',
    alignItems: 'center',
  },
  header_container: {borderBottomWidth: 0},
  header_club_view: {width: windowWidth * 0.75, alignItems: 'flex-start'},
  header_club_name: {
    color: '#FFFFFF',
    fontFamily: 'GothamRounded-Bold',
    fontSize: 21,
    textAlign: 'center',
  },
});
