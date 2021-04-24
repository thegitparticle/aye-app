import {ADD_MYCLUBS} from './types';
import axios from 'axios';

export const GetMyClubs = userid => {
  return dispatch => {
    var res = [];

    axios

      //.get('https://run.mocky.io/v3/05a03257-1f7e-401e-a116-c67972f11830')
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
