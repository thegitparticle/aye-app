import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

import MyProfileReducer from './MyProfileReducer';
import AuthStateReducer from './AuthStateReducer';
import TrendingGifsReducer from './TrendingGifsReducer';
import TrendingPhotosReducer from './TrendingPhotosReducer';
import GetFramesReducer from './GetFramesReducer';
import ClubHubDetailsReducer from './ClubHubReducer';
import MyCircleReducer from './MyCircleReducer';
import MyClubsReducer from './MyClubsReducer';

export const persistConfigAuth = {
  key: 'auth_here',
  storage: AsyncStorage,
};

export const persistConfigMyProfile = {
  key: 'my_profile',
  storage: AsyncStorage,
};

export const persistConfigTrendingGifs = {
  key: 'trending_gifs',
  storage: AsyncStorage,
  //whitelist: ['bookmarks']              // put which objects to save as initial state
};

export const persistConfigTrendingPhotos = {
  key: 'trending_photos',
  storage: AsyncStorage,
  //whitelist: ['bookmarks']              // put which objects to save as initial state
};

export const persistConfigGetFrames = {
  key: 'get_frames',
  storage: AsyncStorage,
  //whitelist: ['bookmarks']              // put which objects to save as initial state
};

export const persistConfigClubsHub = {
  key: 'clubs_hub',
  storage: AsyncStorage,
  //whitelist: ['bookmarks']              // put which objects to save as initial state
};

export const persistConfigMyCircle = {
  key: 'my_circle',
  storage: AsyncStorage,
  //whitelist: ['bookmarks']              // put which objects to save as initial state
};

export const persistConfigMyClubs = {
  key: 'my_clubs',
  storage: AsyncStorage,
  //whitelist: ['bookmarks']              // put which objects to save as initial state
};

const rootReducer = combineReducers({
  AuthStateReducer: persistReducer(persistConfigAuth, AuthStateReducer),
  MyProfileReducer: persistReducer(persistConfigMyProfile, MyProfileReducer),
  TrendingGifsReducer: persistReducer(
    persistConfigTrendingGifs,
    TrendingGifsReducer,
  ),
  TrendingPhotosReducer: persistReducer(
    persistConfigTrendingPhotos,
    TrendingPhotosReducer,
  ),
  GetFramesReducer: persistReducer(persistConfigGetFrames, GetFramesReducer),
  ClubHubDetailsReducer: persistReducer(
    persistConfigClubsHub,
    ClubHubDetailsReducer,
  ),
  MyCircleReducer: persistReducer(persistConfigMyCircle, MyCircleReducer),
  MyClubsReducer: persistReducer(persistConfigMyClubs, MyClubsReducer),
});

export const storehere = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(storehere);
