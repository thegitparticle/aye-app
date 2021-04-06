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

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

var state_here = {};

function DirectsList() {
  const pubnub = usePubNub();
  const [directsList, setDirectsList] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      pubnub.objects.getMemberships(
        {
          uuid: state_here.MyProfileReducer.myprofile.user.id,
          include: {
            channelFields: true,
            customChannelFields: true,
            customFields: true,
          },
          sort: {updated: 'desc'},
        },
        (status, response) => {
          console.log(response.data);
          setDirectsList(response.data);
        },
      );
    }, []),
  );

  function RenderItem(props) {
    return (
      <ListItem topDivider containerStyle={styles.list_item_container}>
        <DirectBit Direct={props.Direct} />
      </ListItem>
    );
  }

  return (
    <View style={styles.overall_view}>
      {directsList.map((item, index) => (
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
