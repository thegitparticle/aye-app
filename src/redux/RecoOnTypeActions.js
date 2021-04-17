// https://run.mocky.io/v3/fcd363e5-811f-467c-9ec6-07bfa06b36a5

import {ADD_RECOONTYPE} from './types';
import axios from 'axios';

export const GetRecosOnType = text_string => {
  console.log(text_string + 'api call for gifs');
  return dispatch => {
    var res = [];
    axios
      .get('https://run.mocky.io/v3/fcd363e5-811f-467c-9ec6-07bfa06b36a5')
      .then(response => (res = response.data))
      .then(() =>
        dispatch({
          type: ADD_RECOONTYPE,
          payload: res,
        }),
      )
      .catch(err => {
        console.log(err);
      });
  };
};
