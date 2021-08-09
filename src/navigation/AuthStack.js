import React from 'react';
import {
  createStackNavigator,
  TransitionSpecs,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import WelcomeScreen from '../buckets/Auth/screens/WelcomeScreen';
import EnterPhone from '../buckets/Auth/screens/EnterPhone';
import OTPCheck from '../buckets/Auth/screens/OTPCheck';
import SignUpDetailsInput from '../buckets/Auth/screens/SignUpDetailsInput';
import OTPCheckRegister from '../buckets/Auth/screens/OTPCheckRegister';
import PermissionsAfterRegister from '../buckets/Auth/screens/PermissionsAfterRegister';

const StackMain = createSharedElementStackNavigator();

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
