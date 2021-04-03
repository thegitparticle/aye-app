import React from 'react';
import {
  createStackNavigator,
  TransitionSpecs,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import RootStackScreen from '../screens/RootStackScreen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ClubsHomeD from '../dummy/ClubsHome';
import DirectsHomeD from '../dummy/DirectsHome';
import HomeMainD from '../dummy/HomeMainD';

const StackMain = createStackNavigator();
const HomeTabStack = createMaterialTopTabNavigator();
const HereStack = createStackNavigator();

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
    </StackMain.Navigator>
  );
}

export default HomeStack;
