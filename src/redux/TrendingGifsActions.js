import {ADD_TRENDINGGIFS} from './types';
import axios from 'axios';

export const TrendingGifsActions = search_query => {
  console.log(search_query + 'giphy');

  return dispatch => {
    var res = [];

    axios
      .get(
        'https://api.giphy.com/v1/gifs/search?api_key=8ZV4VR88OP9WYJl2aoxT7d2xEeGaDsx7&q=' +
          search_query,
      )
      .then(response => (res = response.data.data))
      .then(() =>
        dispatch({
          type: ADD_TRENDINGGIFS,
          payload: res,
        }),
      )
      .catch(err => {
        console.log(err + 'giphy');
      });
  };
};
