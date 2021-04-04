import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import HeaderAtHome from '../components/HeaderAtHome';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import ClubsHomeD from './ClubsHome';
import DirectsHomeD from './DirectsHome';
import {Icon} from 'react-native-elements';

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

  const renderIconHere = ({route, focused}) => (
    <View style={styles.tab_icon_view}>
      <Icon
        name={route.icon}
        type="feather"
        color={focused ? 'red' : 'black'}
        iconStyle={styles.tab_icon}
      />
    </View>
  );

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.tab_bar_indicator}
      style={styles.tab_bar}
      renderIcon={renderIconHere}
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
        style={styles.tab_view}
      />
    </View>
  );
}

export default HomeMainD;

const styles = StyleSheet.create({
  overall_view: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  tab_view: {
    flex: 1,
    backgroundColor: '#fafafa',
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
    paddingTop: 5,
  },
  tab_icon: {},
});
