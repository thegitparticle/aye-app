import React, {useEffect} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import NudgeToBit from '../uibits/NudgeToBit';
import {ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import {GetMyNudgeToList} from '../redux/MyNudgeToListActions';

const windowHeight = Dimensions.get('window').height;
//const windowWidth = Dimensions.get('window').width;

var state_here = {};

function NudgeToList({dispatch}) {
  var NudgeToData = state_here.MyNudgeToListReducer.mynudgetolist;

  useEffect(() => {
    dispatch(GetMyNudgeToList(state_here.MyProfileReducer.myprofile.user.id));
  }, [dispatch]);

  function RenderItem(props) {
    return (
      <ListItem bottomDivider containerStyle={styles.list_item_container}>
        <NudgeToBit NudgeTo={props.NudgeTo} />
      </ListItem>
    );
  }

  if (NudgeToData.length > 0) {
    if (NudgeToData[0].userid === 0) {
      return <View />;
    } else {
      return (
        <View style={styles.overall_view}>
          <Text style={styles.nudgeto_heading}>MORE FRIENDS</Text>
          {NudgeToData.map((item, index) => (
            <RenderItem NudgeTo={item} />
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
