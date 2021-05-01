import {ADD_MYNUDGETOLIST} from './types';
import axios from 'axios';

export const GetMyNudgeToList = user_id => {
  return dispatch => {
    var res = [];
    axios
      .get(
        'https://apisayepirates.life/api/users/fetch_friends_list/' +
          String(user_id) +
          '/',
      )
      .then(response => (res = response.data))
      .then(() => console.log(res))
      .then(() =>
        dispatch({
          type: ADD_MYNUDGETOLIST,
          payload: res,
        }),
      )
      .catch(err => {
        console.log(err);
      });
  };
};
