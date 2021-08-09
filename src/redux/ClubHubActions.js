import {ADD_CLUBHUBDETAILS} from './types';
import axios from 'axios';

export const GetClubHubDetails = club_id => {
  return dispatch => {
    var res = [];

    axios
      .get('https://apisayepirates.life/api/clubs/' + String(club_id))
      // .get('https://run.mocky.io/v3/030af608-3974-40be-a6cf-88a89b3d7845')
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
