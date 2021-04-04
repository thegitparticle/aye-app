import {ADD_FRAMES} from './types';
import axios from 'axios';

export const GetFrames = () => {
  return (dispatch) => {
    var res = [];

    axios
      .get('https://run.mocky.io/v3/6416835d-edaf-4bdd-a39b-3e0798fec500')
      .then((response) => (res = response.data))
      //.then(() => console.log(JSON.parse(res)))
      .then(() =>
        dispatch({
          type: ADD_FRAMES,
          payload: res,
        }),
      )
      .catch((err) => {
        console.log(err);
      });
  };
};
