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
import ShareMenu from 'react-native-share-menu';

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

  const [sharedData, setSharedData] = useState('');
  const [sharedMimeType, setSharedMimeType] = useState('');
  const [sharedExtraData, setSharedExtraData] = useState(null);

  const handleShare = useCallback(item => {
    if (!item) {
      return;
    }

    const {mimeType, data, extraData} = item;

    setSharedData(data);
    setSharedExtraData(extraData);
    setSharedMimeType(mimeType);
  }, []);

  useEffect(() => {
    ShareMenu.getInitialShare(handleShare);
  }, []);

  useEffect(() => {
    const listener = ShareMenu.addNewShareListener(handleShare);

    return () => {
      listener.remove();
    };
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
