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
import DirectsListReducer from './DirectsListReducer';
import RecoOnTypeReducer from './RecoOnTypeReducer';
import MyNudgeToListReducer from './MyNudgeToListReducer';
import ChosenRecoItemReducer from './ChosenRecoItemReducer';

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

export const persistConfigMyNudgeToList = {
  key: 'my_nudgetolist',
  storage: AsyncStorage,
  //whitelist: ['bookmarks']              // put which objects to save as initial state
};

export const persistConfigMyClubs = {
  key: 'my_clubs',
  storage: AsyncStorage,
  //whitelist: ['bookmarks']              // put which objects to save as initial state
};

export const persistConfigDirectsList = {
  key: 'directs_list',
  storage: AsyncStorage,
};

export const persistConfigRecoOnType = {
  key: 'reco_on_type',
  storage: AsyncStorage,
};

export const persistConfigChosenReco = {
  key: 'chosen_reco',
  storage: AsyncStorage,
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
  MyNudgeToListReducer: persistReducer(
    persistConfigMyNudgeToList,
    MyNudgeToListReducer,
  ),
  MyClubsReducer: persistReducer(persistConfigMyClubs, MyClubsReducer),
  DirectsListReducer: persistReducer(
    persistConfigDirectsList,
    DirectsListReducer,
  ),
  RecoOnTypeReducer: persistReducer(persistConfigRecoOnType, RecoOnTypeReducer),
  ChosenRecoItemReducer: persistReducer(
    persistConfigChosenReco,
    ChosenRecoItemReducer,
  ),
});

export const storehere = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(storehere);
