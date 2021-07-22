import React, {useState, useEffect, useCallback} from 'react';
import {View, Text} from 'react-native';
import ShareMenu from 'react-native-share-menu';
import {MMKV} from 'react-native-mmkv';

function Handle() {
  const [sharedData, setSharedData] = useState('');
  const [sharedMimeType, setSharedMimeType] = useState('');
  const [sharedExtraData, setSharedExtraData] = useState(null);
  const [url, setUrl] = useState('');

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
    setUrl(MMKV.getString('current-shared-url'));
    console.log(MMKV.getString('current-shared-url'));
    const keys = MMKV.getAllKeys();
    console.log(keys);
  }, []);

  useEffect(() => {
    const listener = ShareMenu.addNewShareListener(handleShare);

    return () => {
      listener.remove();
    };
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'skyblue'}}>
      <Text>handle it here</Text>
      <Text>sharedData</Text>
      <Text>{url}</Text>
    </View>
  );
}

export default Handle;
