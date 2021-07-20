import {SET_CHANNEL} from './types';

export const SetCurrentChannel = channel_id => {
  return dispatch => {
    dispatch({
      type: SET_CHANNEL,
      payload: channel_id,
    });
  };
};
