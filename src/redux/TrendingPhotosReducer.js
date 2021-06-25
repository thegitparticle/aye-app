import {ADD_TRENDINGPHOTOS} from './types';

const INITIAL_STATE = {
  trending_photos: [
    {
      width: 500,
      height: 250,
      urls: {
        thumb:
          'https://images.unsplash.com/photo-&fit=max&fm=jpg&ixid=MXwyMTEyMTR8MXwxfGFsbHwxfHx8fHx8Mnw&ixlib=rb-1.2.1&q=80&w=200',
      },
    },
  ],
};

const TrendingPhotosReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TRENDINGPHOTOS:
      var trending_photos = action.payload;
      const newState = {trending_photos};
      return newState;
    default:
      return state;
  }
};

export default TrendingPhotosReducer;
