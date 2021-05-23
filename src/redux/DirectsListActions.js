import {ADD_DIRECTSLIST} from './types';
import axios from 'axios';

export const GetDirectsList = user_id => {
  console.log(user_id, 'keep track of this object or not');
  return dispatch => {
    var res = [];
    //https://apisayepirates.life/api/users/my_directs_trigger/58/

    axios

      .get(
        'https://apisayepirates.life/api/users/my_directs_trigger/' +
          String(user_id) +
          '/',
      )

      .catch(err => {
        console.log(err);
      });

    axios

      .get(
        'https://apisayepirates.life/api/users/my_directs/' + String(user_id),
        //+ '/',
      )

      .then(response => (res = response.data))
      .then(() =>
        dispatch({
          type: ADD_DIRECTSLIST,
          payload: res,
        }),
      )
      .catch(err => {
        console.log(err);
      });
  };
};
