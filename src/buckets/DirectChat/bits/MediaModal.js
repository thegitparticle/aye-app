/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState, useEffect, useMemo} from 'react';
import {
  View,
  FlatList,
  useWindowDimensions,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useStyle} from 'react-native-style-utilities';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view-tgp';
import ThemeContext from '../../../themes/Theme';
import {SearchBar} from 'react-native-elements';
import {SquircleView} from 'react-native-figma-squircle';
import {TrendingGifsActions} from '../../../redux/TrendingGifsActions';
import {TrendingPhotosActions} from '../../../redux/TrendingPhotosActions';
import {connect} from 'react-redux';
import RenderSearchedGifItem from '../chatitems/gifs/RenderSearchedGifItem';
import RenderSearchedImageItem from '../chatitems/images/RenderSearchedImageItem';
import CraftGif from '../chatitems/gifs/CraftGif';
import CraftImage from '../chatitems/images/CraftImage';

const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

var state_here = {};

function MediaModalD({dispatch, route}) {
  const theme = useContext(ThemeContext);

  const {channelOnGoing, clubName, clubID, channelID, messages} = route.params;

  const [searchItem, setSearchItem] = useState('modi');

  const [gifPicked, setGifPicked] = useState('');

  const [imagePicked, setImagePicked] = useState('');

  const [showWhat, setShowWhat] = useState('SearchMode'); //SearchMode, GifCraft, ImageCraft

  const UnsplashRoute = useMemo(
    () =>
      function UnsplashRoute() {
        return (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FlatList
              data={trending_photos_data_block}
              renderItem={item => (
                <TouchableOpacity
                  style={{margin: 3}}
                  onPress={() => {
                    setImagePicked(item.item.urls.regular);
                    setShowWhat('ImageCraft');
                  }}>
                  <RenderSearchedImageItem Item={item} />
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
              numColumns={2}
            />
          </View>
        );
      },
    [searchItem],
  );

  const GiphyRoute = useMemo(
    () =>
      function GiphyRoute() {
        return (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FlatList
              data={trending_gifs_data_block}
              renderItem={item => (
                <TouchableOpacity
                  style={{margin: 3}}
                  onPress={() => {
                    setGifPicked(item.item.images.fixed_height.url);
                    setShowWhat('GifCraft');
                  }}>
                  <RenderSearchedGifItem Item={item} />
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
              numColumns={2}
            />
          </View>
        );
      },
    [searchItem],
  );

  useEffect(() => {
    dispatch(TrendingPhotosActions(searchItem));
    dispatch(TrendingGifsActions(searchItem));
  }, [dispatch, searchItem]);

  var trending_gifs_data_block = state_here.TrendingGifsReducer.trending_gifs;

  var trending_photos_data_block =
    state_here.TrendingPhotosReducer.trending_photos;

  const renderScene = SceneMap({
    unsplash: UnsplashRoute,
    giphy: GiphyRoute,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: 'transparent'}}
      style={tab_bar_styles}
      labelStyle={tab_bar_label}
    />
  );

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'unsplash', title: 'UNSPLASH'},
    {key: 'giphy', title: 'GIPHY'},
  ]);

  const style_view_wrap = useStyle(
    () => [
      {
        backgroundColor: theme.colors.off_dark,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
    ],
    [],
  );

  const tab_bar_styles = useStyle(() => [
    {
      backgroundColor: theme.colors.off_dark,
      borderRadius: 13,
      marginHorizontal: windowWidth * 0.04,
      width: windowWidth * 0.95,
    },
  ]);

  const tab_bar_label = useStyle(() => [
    {
      ...theme.text.subhead,
    },
  ]);

  const search_bar_squircle = useStyle(() => [
    {
      width: windowWidth * 0.95,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      marginVertical: 10,
    },
  ]);

  const search_bar_container = useStyle(() => [
    {
      backgroundColor: 'transparent',
      borderBottomWidth: 0,
      borderTopWidth: 0,
      width: windowWidth * 0.95,
      height: 50,
      justifyContent: 'center',
    },
  ]);

  if (showWhat === 'SearchMode') {
    return (
      <View style={style_view_wrap}>
        <SquircleView
          style={search_bar_squircle}
          squircleParams={{
            cornerSmoothing: 1,
            cornerRadius: 10,
            fillColor: theme.colors.mid_dark,
          }}>
          <SearchBar
            placeholder="search ..."
            onChangeText={search => {
              setSearchItem(search);
            }}
            value={searchItem}
            containerStyle={search_bar_container}
            inputContainerStyle={{
              backgroundColor: 'transparent',
            }}
            inputStyle={{...theme.text.header, color: theme.colors.off_light}}
            placeholderTextColor={theme.colors.mid_light_50}
            searchIcon={{color: theme.colors.mid_light_50}}
          />
        </SquircleView>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
        />
      </View>
    );
  } else if (showWhat === 'GifCraft') {
    return (
      <CraftGif
        channelOnGoing={channelOnGoing}
        messages={messages}
        channelID={channelID}
        clubID={clubID}
        clubName={clubName}
        gifPicked={gifPicked}
      />
    );
  } else if (showWhat === 'ImageCraft') {
    return (
      <CraftImage
        channelOnGoing={channelOnGoing}
        messages={messages}
        channelID={channelID}
        clubID={clubID}
        clubName={clubName}
        imagePicked={imagePicked}
      />
    );
  } else {
    return <View />;
  }
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(MediaModalD);
