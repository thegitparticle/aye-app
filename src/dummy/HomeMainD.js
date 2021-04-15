import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import HeaderAtHome from '../components/HeaderAtHome';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view-tgp';
import ClubsHomeD from './ClubsHome';
import DirectsHomeD from './DirectsHome';
import {Icon} from 'react-native-elements';
import IconlyDirectIcon from '../uibits/IconlyDirectIcon';
import IconlyHomeClubsIcon from '../uibits/IconlyHomeClubsIcon';

//const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function HomeMainD({dispatch, navigation}) {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'clubs', title: 'clubs', icon: 'home'},
    {key: 'directs', title: 'directs', icon: 'send'},
  ]);

  const renderScene = SceneMap({
    clubs: ClubsHomeD,
    directs: DirectsHomeD,
  });

  function renderIconHere({route, focused}) {
    if (route.title === 'clubs') {
      if (focused) {
        return (
          <View style={styles.tab_icon_view}>
            <IconlyHomeClubsIcon Color="black" />
          </View>
        );
      } else {
        return (
          <View style={styles.tab_icon_view}>
            <IconlyHomeClubsIcon Color="grey" />
          </View>
        );
      }
    } else {
      if (focused) {
        return (
          <View style={styles.tab_icon_view}>
            <IconlyDirectIcon Color="black" />
          </View>
        );
      } else {
        return (
          <View style={styles.tab_icon_view}>
            <IconlyDirectIcon Color="grey" />
          </View>
        );
      }
    }
  }

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.tab_bar_indicator}
      style={styles.tab_bar}
      renderIcon={renderIconHere}
      // eslint-disable-next-line react-native/no-inline-styles
      tabStyle={{backgroundColor: 'transparent'}}
    />
  );

  return (
    <View style={styles.overall_view}>
      <HeaderAtHome />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        tabBarPosition="bottom"
        // eslint-disable-next-line react-native/no-inline-styles
        sceneContainerStyle={{
          overflow: 'visible',
          //flex: 1,
          backgroundColor: '#fff',
        }}
        style={styles.tab_view}
      />
    </View>
  );
}

export default HomeMainD;

const styles = StyleSheet.create({
  overall_view: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tab_view: {
    //flex: 1,
    backgroundColor: 'transparent',
    //overflow: 'visible',
  },
  tab_bar: {
    backgroundColor: '#fff',
    color: '#000',
    height: 60,
    justifyContent: 'center',
    alignSelf: 'center',
    width: 160,
    marginBottom: windowHeight * 0.05,
    borderRadius: 30,
    borderTopWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  tab_bar_indicator: {
    width: 0,
  },
  tab_icon_view: {
    alignItems: 'center',
    alignContent: 'center',
    height: 60,
    paddingTop: 2.5,
  },
  tab_icon: {},
});
