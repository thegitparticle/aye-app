import React from 'react';
import {
  createStackNavigator,
  TransitionSpecs,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import WelcomeScreen from '../screens/WelcomeScreen';
import EnterPhone from '../screens/EnterPhone';
import OTPCheck from '../screens/OTPCheck';
import SignUpDetailsInput from '../screens/SignUpDetailsInput';
import OTPCheckRegister from '../screens/OTPCheckRegister.ios';
import PermissionsAfterRegister from '../screens/PermissionsAfterRegister';

const StackMain = createSharedElementStackNavigator();

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

function AuthStack() {
  return (
    <StackMain.Navigator headerMode="none">
      <StackMain.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
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
        name="EnterPhone"
        component={EnterPhone}
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
        name="OTPCheck"
        component={OTPCheck}
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
        name="SignUpDetailsInput"
        component={SignUpDetailsInput}
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
        name="OTPCheckRegister"
        component={OTPCheckRegister}
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
        name="PermissionsAfterRegister"
        component={PermissionsAfterRegister}
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

export default AuthStack;
