import React from 'react';
import {
  createStackNavigator,
  TransitionSpecs,
  CardStyleInterpolators,
  TransitionPresets,
} from '@react-navigation/stack';
import InvitePeopleToApp from '../buckets/InvitePeople/screens/InvitePeopleToApp';
import HomeMainD from '../buckets/HomeMain/screens/HomeMainD';
import MyProfileScreen from '../buckets/MyProfile/screens/MyProfileScreen';
import EditProfile from '../buckets/MyProfile/screens/EditProfile';
import SettingsScreen from '../buckets/MyProfile/screens/SettingsScreen';
import ClubChatScreen from '../buckets/ClanChat/screens/ClubChatScreen';
import ClubFramesList from '../buckets/ClanFrames/screens/ClubFramesList';
import ClubHub from '../buckets/ClanHub/screens/ClubHub';
import DirectFramesList from '../buckets/DirectFrames/screens/DirectFramesList';
import DirectChatScreen from '../buckets/DirectChat/screens/DirectChatScreen';
import DirectHub from '../buckets/DirectHub/screens/DirectHub';
import AddPeopleToClub from '../buckets/AddPeople/screens/AddPeopleToClub';
import StartClub from '../buckets/StartClan/screens/StartClub';
import InvitePeopleToClub from '../buckets/InvitePeople/screens/InvitePeopleToClub';
import OtherProfile from '../buckets/OtherProfile/screens/OtherProfile';
import ViewOldFrameClub from '../buckets/ClanFrames/screens/ViewOldFrameClub';
import ViewOldFrameDirect from '../buckets/DirectFrames/screens/ViewOldFrameDirect';
import TheAyeScreen from '../buckets/Aye/screens/TheAyeScreen';
import MediaModal from '../buckets/ClanChat/bits/MediaModal';
import CameraModal from '../buckets/ClanChat/bits/CameraModal';
import CraftCamera from '../buckets/ClanChat/chatitems/camera/CraftCamera';
import CameraModalD from '../buckets/DirectChat/bits/CameraModal';
import MediaModalD from '../buckets/DirectChat/bits/MediaModal';
import ViewMessageModal from '../buckets/ClanChat/bits/ViewMessageModal';
import ViewMessageModalD from '../buckets/DirectChat/bits/ViewMessageModal';

const StackMain = createStackNavigator();
const HereStack = createStackNavigator();
const MyProfileStack = createStackNavigator();
const TheAyeStack = createStackNavigator();
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

function TheAyeStackScreens() {
  return (
    <TheAyeStack.Navigator headerMode="none">
      <TheAyeStack.Screen name="TheAyeScreen" component={TheAyeScreen} />
    </TheAyeStack.Navigator>
  );
}

function ClubInteractionScreens() {
  return (
    <ClubChatStack.Navigator headerMode="none">
      <ClubChatStack.Screen name="ClubChatScreen" component={ClubChatScreen} />
      <StackMain.Screen
        name="MediaModal"
        component={MediaModal}
        options={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'vertical',
          cardOverlayEnabled: true,
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />
      <StackMain.Screen
        name="CameraModal"
        component={CameraModal}
        options={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'vertical',
          cardOverlayEnabled: true,
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />
      <StackMain.Screen
        name="ViewMessageModal"
        component={ViewMessageModal}
        options={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'vertical',
          cardOverlayEnabled: true,
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />
      <StackMain.Screen name="CraftCamera" component={CraftCamera} />
      <ClubChatStack.Screen
        name="ClubFramesList"
        component={ClubFramesList}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          gestureDirection: 'horizontal-inverted',
        }}
      />
      <ClubChatStack.Screen
        name="ClubHub"
        component={ClubHub}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          gestureDirection: 'horizontal-inverted',
        }}
      />
      <ClubChatStack.Screen
        name="ViewOldFrameClub"
        component={ViewOldFrameClub}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'vertical',
        }}
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
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          gestureDirection: 'horizontal-inverted',
        }}
      />
      <DirectChatStack.Screen
        name="DirectHub"
        component={DirectHub}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          gestureDirection: 'horizontal-inverted',
        }}
      />
      <StackMain.Screen
        name="MediaModalD"
        component={MediaModalD}
        options={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'vertical',
          cardOverlayEnabled: true,
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />
      <StackMain.Screen
        name="CameraModalD"
        component={CameraModalD}
        options={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'vertical',
          cardOverlayEnabled: true,
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />
      <StackMain.Screen
        name="ViewMessageModalD"
        component={ViewMessageModalD}
        options={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'vertical',
          cardOverlayEnabled: true,
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />
      <DirectChatStack.Screen
        name="ViewOldFrameDirect"
        component={ViewOldFrameDirect}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'vertical',
        }}
      />
    </DirectChatStack.Navigator>
  );
}

function HomeStack() {
  return (
    <StackMain.Navigator headerMode="none">
      <StackMain.Screen name="Here" component={Here} />

      <StackMain.Screen
        name="MyProfileModalScreens"
        component={MyProfileModalScreens}
        options={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'vertical',
          cardOverlayEnabled: true,
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />
      <StackMain.Screen
        name="TheAyeStackScreens"
        component={TheAyeStackScreens}
        options={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'vertical',
          cardOverlayEnabled: true,
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
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />
      <StackMain.Screen
        name="InvitePeopleToApp"
        component={InvitePeopleToApp}
        options={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'vertical',
          cardOverlayEnabled: true,
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
