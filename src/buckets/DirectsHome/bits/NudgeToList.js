import React, {useEffect, useContext, useMemo} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import NudgeToBit from './NudgeToBit';
import {ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import {GetMyNudgeToList} from '../../../redux/MyNudgeToListActions';
import {useNavigation} from '@react-navigation/native';
import ThemeContext from '../../../themes/Theme';

const windowHeight = Dimensions.get('window').height;
//const windowWidth = Dimensions.get('window').width;

var state_here = {};

function NudgeToList({dispatch}) {
  var NudgeToData = state_here.MyNudgeToListReducer.mynudgetolist;

  const navigation = useNavigation();

  const theme = useContext(ThemeContext);

  console.log('nudge list');

  useEffect(() => {
    dispatch(GetMyNudgeToList(state_here.MyProfileReducer.myprofile.user.id));
  }, [dispatch]);

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
  nudgeto_heading: {
    fontSize: 17,
    fontFamily: 'GothamRounded-Bold',
    marginHorizontal: 20,
    marginBottom: 15,
    color: '#05050550',
  },
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
