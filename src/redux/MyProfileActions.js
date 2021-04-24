import {ADD_MYPROFILEDETAILS} from './types';
import axios from 'axios';

export const GetMyProfile = phone => {
  return dispatch => {
    var res = [];
    console.log('get my profile dispatched');
    console.log(phone);
    axios
      .get('https://apisayepirates.life/api/users/profile/' + phone + '/')
      .then(response => (res = response.data))
      .then(() => console.log(res))
      .then(() =>
        dispatch({
          type: ADD_MYPROFILEDETAILS,
          payload: res,
        }),
      )
      .catch(err => {
        console.log(err);
      });
  };
};
