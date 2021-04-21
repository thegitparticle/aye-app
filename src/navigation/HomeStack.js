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
import {ClubDummyData} from '../dummy/ClubDummyData';
import ClubChatScreen from '../screens/ClubChatScreen';
import ClubFramesList from '../screens/ClubFramesList';
import ClubHub from '../screens/ClubHub';
import DirectFramesList from '../screens/DirectFramesList';
import DirectChatScreen from '../screens/DirectChatScreen';
import DirectHub from '../screens/DirectHub';
import AddPeopleToClub from '../screens/AddPeopleToClub';
import StartClub from '../screens/StartClub';
import InvitePeopleToClub from '../screens/InvitePeopleToClub';
import OtherProfile from '../screens/OtherProfile';
import ViewOldFrameClub from '../screens/ViewOldFrameClub';
import ViewOldFrameDirect from '../screens/ViewOldFrameDirect';

const StackMain = createStackNavigator();
//const HomeTabStack = createMaterialTopTabNavigator();
const HereStack = createStackNavigator();
const MyProfileStack = createStackNavigator();
const ClubChatStack = createStackNavigator();
const DirectChatStack = createStackNavigator();

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

function ClubInteractionScreens() {
  return (
    <ClubChatStack.Navigator headerMode="none">
      <ClubChatStack.Screen name="ClubChatScreen" component={ClubChatScreen} />
      <ClubChatStack.Screen name="ClubFramesList" component={ClubFramesList} />
      <ClubChatStack.Screen name="ClubHub" component={ClubHub} />
      <ClubChatStack.Screen
        name="ViewOldFrameClub"
        component={ViewOldFrameClub}
      />
    </ClubChatStack.Navigator>
  );
}

function DirectInteractionScreens() {
  return (
    <DirectChatStack.Navigator headerMode="none">
      <DirectChatStack.Screen
        name="DirectChatScreen"
        component={DirectChatScreen}
      />
      <DirectChatStack.Screen
        name="DirectFramesList"
        component={DirectFramesList}
      />
      <DirectChatStack.Screen name="DirectHub" component={DirectHub} />
      <DirectChatStack.Screen
        name="ViewOldFrameDirect"
        component={ViewOldFrameDirect}
      />
    </DirectChatStack.Navigator>
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
      <StackMain.Screen
        name="AddPeopleToClub"
        component={AddPeopleToClub}
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
      <StackMain.Screen
        name="InvitePeopleToClub"
        component={InvitePeopleToClub}
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
      <StackMain.Screen
        name="StartClub"
        component={StartClub}
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
      <StackMain.Screen
        name="OtherProfile"
        component={OtherProfile}
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
      <StackMain.Screen
        name="ClubInteractionScreens"
        component={ClubInteractionScreens}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'vertical',
        }}
      />
      <StackMain.Screen
        name="DirectInteractionScreens"
        component={DirectInteractionScreens}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'vertical',
        }}
      />
    </StackMain.Navigator>
  );
}

export default HomeStack;
