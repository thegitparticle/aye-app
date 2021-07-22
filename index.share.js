/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
// import Share from './Share';
// import Share from './src/navigation/Share';
import {ShareMenuReactView} from 'react-native-share-menu';
import {MMKV} from 'react-native-mmkv';

const IosShareModal = () => {
  ShareMenuReactView.data().then(({mimeType, data}) => {
    MMKV.set('current-shared-url', data);
    console.log(typeof data);
  });
  ShareMenuReactView.continueInApp();
  return <></>;
};

AppRegistry.registerComponent('ShareMenuModuleComponent', () => IosShareModal);
