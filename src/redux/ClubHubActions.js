import {ADD_CLUBHUBDETAILS} from './types';
import axios from 'axios';

export const GetClubHubDetails = club_id => {
  return dispatch => {
    var res = [];

    axios
      .get('https://apisayepirates.life/api/clubs/' + String(club_id))
      .then(response => (res = response.data))
      //.then(() => console.log(JSON.parse(res)))
      .then(() =>
        dispatch({
          type: ADD_CLUBHUBDETAILS,
          payload: res,
        }),
      )
      .catch(err => {
        console.log(err);
      });
  };
};
