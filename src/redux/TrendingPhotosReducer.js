import {ADD_TRENDINGPHOTOS} from './types';

const INITIAL_STATE = {
  trending_photos: [
    {
      width: 5030,
      height: 4024,
      urls: {
        thumb:
          'https://images.unsplash.com/photo-1612831660648-ba96d72bfc5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMTEyMTR8MXwxfGFsbHwxfHx8fHx8Mnw&ixlib=rb-1.2.1&q=80&w=200',
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
