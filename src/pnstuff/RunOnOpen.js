import React from 'react';
import {connect} from 'react-redux';

var state_here = {};

function RunOnOpen() {
  function InsideRun() {
    console.log('running things on open');
  }
  InsideRun();
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(RunOnOpen);
