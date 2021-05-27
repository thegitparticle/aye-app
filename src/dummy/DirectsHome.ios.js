import React, {useState, useCallback} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import DirectsList from '../components/DirectsList';
import NudgeToList from '../components/NudgeToList';
import {connect} from 'react-redux';
import {GetDirectsList} from '../redux/DirectsListActions';
import {GetMyNudgeToList} from '../redux/MyNudgeToListActions';
import AnimatedPullToRefresh from './AnimatedPullRefreshCopy';
import {usePubNub} from 'pubnub-react';

var state_here = {};

function DirectsHomeD({dispatch}) {
  const pubnub = usePubNub();
  const user_id_here = state_here.MyProfileReducer.myprofile.user.id;

  const [refreshing, setRefreshing] = useState(false);

  const memoizedHandleRefresh = useCallback(() => {
    console.log('refresh happened');
    dispatch(GetDirectsList(user_id_here));
    dispatch(GetMyNudgeToList(user_id_here));
  }, []);

  return (
    <AnimatedPullToRefresh
      isRefreshing={refreshing}
      //animationBackgroundColor={'#564A63'}

      animationBackgroundColor={'#FFFFFF'}
      onRefresh={memoizedHandleRefresh}
      pullHeight={180}
      contentView={
        <ScrollView
          style={styles.overall_view}
          showsVerticalScrollIndicator={false}>
          <DirectsList />
          <NudgeToList />
        </ScrollView>
      }
      onPullAnimationSrc={require('/Users/san/Desktop/toastgo/assets/puppy_wave.json')}
      onStartRefreshAnimationSrc={require('/Users/san/Desktop/toastgo/assets/puppy_wave.json')}
      onRefreshAnimationSrc={require('/Users/san/Desktop/toastgo/assets/puppy_wave.json')}
      onEndRefreshAnimationSrc={require('/Users/san/Desktop/toastgo/assets/puppy_wave.json')}
      /*
      onPullAnimationSrc={require('/Users/san/Desktop/toastgo/assets/umbrella_full.json')}
      onStartRefreshAnimationSrc={require('/Users/san/Desktop/toastgo/assets/umbrella_full.json')}
      onRefreshAnimationSrc={require('/Users/san/Desktop/toastgo/assets/umbrella_full.json')}
      onEndRefreshAnimationSrc={require('/Users/san/Desktop/toastgo/assets/umbrella_full.json')}
      */
    />
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
});
