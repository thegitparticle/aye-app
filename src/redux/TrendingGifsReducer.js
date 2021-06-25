import {ADD_TRENDINGGIFS} from './types';

const INITIAL_STATE = {
  trending_gifs: [
    {
      images: {
        fixed_height_small: {
          url:
            'https://media0.giphy.com/media/xUPGcyi4YxcZp8dWZq/giphy.gif?cid=60184b23utx00z40sy5whv4v25bm3irbrlgqpywqejlen4dg&rid=giphy.gif',
        },
      },
    },
  ],
};

const TrendingGifsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TRENDINGGIFS:
      var trending_gifs = action.payload;
      const newState = {trending_gifs};
      return newState;
    default:
      return state;
  }
};

export default TrendingGifsReducer;
