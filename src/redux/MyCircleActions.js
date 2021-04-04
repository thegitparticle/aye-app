import {ADD_MYCIRCLE} from './types';
import axios from 'axios';

export const GetMyCircle = () => {
  return (dispatch) => {
    var res = [];

    axios
      .get('https://run.mocky.io/v3/2e42d964-52e7-4288-a812-9b9170f1d323')
      .then((response) => (res = response.data))
      //.then(() => console.log(JSON.parse(res)))
      .then(() =>
        dispatch({
          type: ADD_MYCIRCLE,
          payload: res,
        }),
      )
      .catch((err) => {
        console.log(err);
      });
  };
};
