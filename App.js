import React, {useEffect, useState, useCallback} from 'react';
import type {Node} from 'react';
import RootStack from './src/navigation/RootStack';
import {Provider} from 'react-redux';
import {storehere, persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import messaging from '@react-native-firebase/messaging';
import * as Sentry from '@sentry/react-native';
import FlashMessage from 'react-native-flash-message';
import {ThemeProvider} from './src/themes/Theme';
import {ButterTheme} from './src/themes/ButterTheme';
import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  'source.uri should not be an empty string',
  'Warning: Each child in a list should have a unique "key" prop.',
]);

Sentry.init({
  dsn:
    'https://f2fbb9a8c45146c98e35089e1b72a46d@o578195.ingest.sentry.io/5734301',
});

const App: () => Node = () => {
  useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
  }, []);

  useEffect(() => {
    console.log('use effect in app is working');
  }, []);

  return (
    <Provider store={storehere}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider value={ButterTheme}>
          <RootStack />
          <FlashMessage
            position="top"
            duration={3000}
            textStyle={{fontFamily: 'GothamRounded-Medium', fontSize: 17}}
            titleStyle={{fontFamily: 'GothamRounded-Medium', fontSize: 17}}
          />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
