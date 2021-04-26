import {ADD_MYCIRCLE} from './types';
import axios from 'axios';

export const GetMyCircle = user_id => {
  return dispatch => {
    var res = [];
    console.log(user_id);
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
          type: ADD_MYCIRCLE,
          payload: res,
        }),
      )
      .catch(err => {
        console.log(err);
      });
  };
};
