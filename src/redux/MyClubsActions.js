import {ADD_MYCLUBS} from './types';
import axios from 'axios';

export const GetMyClubs = userid => {
  return dispatch => {
    var res = [];

    axios

      .get(
        'https://apisayepirates.life/api/users/my_clubs/' +
          String(userid) +
          '/',
      )
      .then(response => (res = response.data))
      .then(() =>
        dispatch({
          type: ADD_MYCLUBS,
          payload: res,
        }),
      )
      .catch(err => {
        console.log(err);
      });
  };
};
