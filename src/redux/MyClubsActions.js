import {ADD_MYCLUBS} from './types';
import axios from 'axios';

export const GetMyClubs = () => {
  return dispatch => {
    var res = [];

    axios

      .get('https://run.mocky.io/v3/05a03257-1f7e-401e-a116-c67972f11830')

      //.get('https://run.mocky.io/v3/29201873-d5f2-4264-b18a-058478396357')
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
