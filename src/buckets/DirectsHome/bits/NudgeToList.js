import React, {useEffect, useContext, useMemo} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import NudgeToBit from './NudgeToBit';
import {ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import {GetMyNudgeToList} from '../../../redux/MyNudgeToListActions';
import {useNavigation} from '@react-navigation/native';
import ThemeContext from '../../../themes/Theme';
import {useFocusEffect} from '@react-navigation/native';
import Contacts from 'react-native-contacts';
import axios from 'axios';

const windowHeight = Dimensions.get('window').height;
//const windowWidth = Dimensions.get('window').width;

var state_here = {};

function NudgeToList({dispatch}) {
  var NudgeToData = state_here.MyNudgeToListReducer.mynudgetolist;

  const navigation = useNavigation();

  const theme = useContext(ThemeContext);

  async function GrabContacts() {
    const contacts_here = await Contacts.getAll();

    var data2 = {};

    data2.contact_list = contacts_here;
    data2.contact_list.unshift({
      country_code:
        state_here.MyProfileReducer.myprofile.user.country_code_of_user,
    });

    var x1 = data2.contact_list;
    //console.log(x1);

    var dataf = {};
    dataf.contact_list = JSON.stringify(x1);

    var config = {
      method: 'put',
      url:
        'https://apisayepirates.life/api/users/post_contacts_to_server/' +
        String(state_here.MyProfileReducer.myprofile.user.id) +
        '/',
      data: dataf,
    };
    axios(config)
      //.then(response => console.log(response.data))
      .catch(err => console.log(err));
  }

  useFocusEffect(
    React.useCallback(() => {
      if (
        state_here.MyProfileReducer.myprofile.user.contact_list_sync_status ===
        true
      ) {
        GrabContacts();
      }
    }, []),
  );

  const RenderItem = useMemo(
    () =>
      function RenderItem(props) {
        return (
          <ListItem
            bottomDivider
            containerStyle={styles.list_item_container}
            underlayColor="#EEEEEE"
            onPress={() =>
              navigation.navigate('OtherProfile', {
                other_user_id: props.NudgeTo.id,
              })
            }>
            <NudgeToBit NudgeTo={props.NudgeTo} />
          </ListItem>
        );
      },
    [NudgeToData],
  );

  if (NudgeToData.length > 0) {
    if (NudgeToData[0].userid === 0) {
      return <View />;
    } else {
      return (
        <View style={styles.overall_view}>
          {NudgeToData.map((item, index) => (
            <RenderItem NudgeTo={item} key={index} />
          ))}
        </View>
      );
    }
  } else {
    return <View />;
  }
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(NudgeToList);

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
