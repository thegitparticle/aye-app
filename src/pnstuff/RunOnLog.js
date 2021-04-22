import React from 'react';
import {connect} from 'react-redux';

var state_here = {};

function RunOnLog() {
  function InsideRun() {
    console.log('running things on log');
  }
  InsideRun();
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(RunOnLog);
