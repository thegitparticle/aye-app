import React from 'react';
import analytics from '@segment/analytics-react-native';
import {connect} from 'react-redux';

var state_here = {};

function RunOnLog() {
  function InsideRun() {
    analytics.setup('vlkm1h2s27bCnL8EBDWFkFoQReJOxT7R', {
      // Record screen views automatically!
      // Record certain application events automatically!
      trackAppLifecycleEvents: true,
    });

    analytics.identify(
      JSON.stringify(state_here.MyProfileReducer.myprofile.user.id),
    );

    console.log('running things on log');
  }
  InsideRun();
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(RunOnLog);
