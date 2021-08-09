import {ADD_TRENDINGPHOTOS} from './types';
import axios from 'axios';

export const TrendingPhotosActions = search_query => {
  return dispatch => {
    var res = [];

    axios
      .get(
        'https://api.unsplash.com/search/photos/?client_id=kJLvNUiTzhjWDxf2a2plyRFdbHbjD9MT84insrzOu9Q&query=' +
          search_query,
      )

      .then(response => (res = response.data))
      .then(() =>
        dispatch({
          type: ADD_TRENDINGPHOTOS,
          payload: res.results,
        }),
      )
      .catch(err => {
        console.log(err + 'unsplash');
      });
  };
};
