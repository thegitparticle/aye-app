import React from 'react';
import {
  createStackNavigator,
  TransitionSpecs,
  CardStyleInterpolators,
  TransitionPresets,
} from '@react-navigation/stack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import RootStackScreen from '../screens/RootStackScreen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ClubsHomeD from '../dummy/ClubsHome';
import DirectsHomeD from '../dummy/DirectsHome';
import HomeMainD from '../dummy/HomeMainD';
import MyProfileScreen from '../screens/MyProfileScreen';
import EditProfile from '../screens/EditProfile';
import SettingsScreen from '../screens/SettingsScreen';

const StackMain = createStackNavigator();
//const HomeTabStack = createMaterialTopTabNavigator();
const HereStack = createStackNavigator();
const MyProfileStack = createStackNavigator();

const test_config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

function Here() {
  return (
    <HereStack.Navigator headerMode="none">
      <HereStack.Screen name="HomeMainD" component={HomeMainD} />
    </HereStack.Navigator>
  );
}

function MyProfileModalScreens() {
  return (
    <MyProfileStack.Navigator headerMode="none">
      <MyProfileStack.Screen
        name="MyProfileScreen"
        component={MyProfileScreen}
      />
      <MyProfileStack.Screen name="EditProfile" component={EditProfile} />
      <MyProfileStack.Screen name="SettingsScreen" component={SettingsScreen} />
    </MyProfileStack.Navigator>
  );
}

function HomeStack() {
  return (
    <StackMain.Navigator headerMode="none">
      <StackMain.Screen name="Here" component={Here} />
      <StackMain.Screen
        name="RootStackScreen"
        component={RootStackScreen}
        options={{
          gestureEnabled: true,
          transitionSpec: {
            open: TransitionSpecs.TransitionIOSSpec,
            close: TransitionSpecs.TransitionIOSSpec,
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <StackMain.Screen
        name="MyProfileModalScreens"
        component={MyProfileModalScreens}
        options={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'vertical',
          cardOverlayEnabled: true,
          //cardStyle: {backgroundColor: '#f1f4f9'},
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />
    </StackMain.Navigator>
  );
}

export default HomeStack;
