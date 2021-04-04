import {ADD_CLUBHUBDETAILS} from './types';
import axios from 'axios';

export const GetClubHubDetails = () => {
  return (dispatch) => {
    var res = [];

    axios
      .get('https://run.mocky.io/v3/c78770c8-d6f9-4c18-94bf-ffc5dc170bb9')
      .then((response) => (res = response.data))
      //.then(() => console.log(JSON.parse(res)))
      .then(() =>
        dispatch({
          type: ADD_CLUBHUBDETAILS,
          payload: res,
        }),
      )
      .catch((err) => {
        console.log(err);
      });
  };
};
