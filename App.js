import React, {useEffect} from 'react';
import type {Node} from 'react';
import RootStack from './src/navigation/RootStack';
import {Provider} from 'react-redux';
import {storehere, persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import messaging from '@react-native-firebase/messaging';
import * as Sentry from '@sentry/react-native';

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

  return (
    <Provider store={storehere}>
      <PersistGate loading={null} persistor={persistor}>
        <RootStack />
      </PersistGate>
    </Provider>
  );
};

export default App;
