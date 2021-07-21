import {SET_CHANNEL} from './types';

const INITIAL_STATE = {
  current_channel: '0',
};

const CurrentChannelReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CHANNEL:
      var current_channel = action.payload;
      const newState = {current_channel};
      return newState;
    default:
      return state;
  }
};

export default CurrentChannelReducer;
