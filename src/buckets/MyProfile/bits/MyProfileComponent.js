/* eslint-disable react-native/no-inline-styles */
import React, {useMemo, useContext, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Pressable,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Avatar, Header, Icon, Overlay} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import Iconly from '../../../external/Iconly';
import ThemeContext from '../../../themes/Theme';
import {SquircleView} from 'react-native-figma-squircle';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function MyProfileComponent(props) {
  const theme = useContext(ThemeContext);
  const FirstBlock = useMemo(
    () =>
      function FirstBlockX(props) {
        const navigation = useNavigation();
        //console.log(props.DPLink);
        return (
          <View style={styles.first_block_view}>
            <Pressable onPress={() => navigation.navigate('EditProfile')}>
              <Avatar
                source={{
                  uri: props.DPLink,
                }}
                size={windowHeight * 0.15}
                rounded
                // eslint-disable-next-line react-native/no-inline-styles
                containerStyle={{
                  backgroundColor: '#05050510',
                }}>
                <Avatar.Accessory size={windowHeight * 0.03} rounded />
              </Avatar>
            </Pressable>
            <Text style={styles.first_view_name}>{props.Name}</Text>
            <Text style={styles.first_view_username}>{props.UserName}</Text>
          </View>
        );
      },
    [],
  );

  function SecondBlock(props) {
    return (
      <View style={styles.second_block_view}>
        <View style={styles.show_case_clubs_view}>
          <TouchableOpacity
            style={styles.clubs_icon_view_wrap}
            onPress={() => toggleClansOverlay()}>
            <FastImage
              source={require('/Users/san/Desktop/toastgo/assets/house_closed_color1.png')}
              style={styles.clubs_icon}
            />
          </TouchableOpacity>
          <Text style={styles.clubs_count_text}>{props.ClubsCount}</Text>
        </View>

        <View style={styles.show_case_circle_view}>
          <TouchableOpacity
            style={styles.circle_icon_view_wrap}
            onPress={() => toggleFramesOverlay()}>
            <Icon type="feather" name="layers" color="#7D4DF9" size={32} />
          </TouchableOpacity>
          <Text style={styles.circle_count_text}>{props.FrameCount}</Text>
        </View>
      </View>
    );
  }
  const navigation = useNavigation();

  const [clansOverlay, showClansOverlay] = useState(false);
  const [framesOverlay, showFramesOverlay] = useState(false);

  const toggleClansOverlay = () => {
    showClansOverlay(!clansOverlay);
  };

  const toggleFramesOverlay = () => {
    showFramesOverlay(!framesOverlay);
  };

  return (
    <View style={styles.containerview}>
      <Header
        rightComponent={
          <Pressable
            style={{width: 50, height: 50}}
            onPress={() => navigation.goBack()}>
            <Iconly
              name="ChevronDownBroken"
              color={theme.colors.off_dark}
              size={30}
            />
          </Pressable>
        }
        backgroundColor="#fafafa"
      />
      <View style={styles.body_view}>
        <View style={styles.top_blocks}>
          <FirstBlock
            DPLink={props.Profile.image}
            Name={props.Profile.user.full_name}
            UserName={props.Profile.user.username}
            FrameCount={props.Profile.user.total_frames_participation}
          />

          <SecondBlock
            ClubsCount={props.Profile.user.number_of_clubs_joined}
            FrameCount={props.Profile.user.total_frames_participation}
          />
        </View>
      </View>
      <Overlay
        isVisible={clansOverlay}
        onBackdropPress={toggleClansOverlay}
        overlayStyle={styles.ClansFramesOverlay}>
        <SquircleView
          style={{
            width: windowWidth * 0.8,
            alignItems: 'center',
            justifyContent: 'center',
            height: windowHeight * 0.2,
          }}
          squircleParams={{
            cornerSmoothing: 1,
            cornerRadius: 20,
            fillColor: theme.colors.full_light,
          }}>
          <Text style={{...theme.text.smallest}}>
            you are part of{' '}
            <Text
              style={{...theme.text.callout, color: theme.colors.danger_red}}>
              {props.Profile.user.number_of_clubs_joined}
            </Text>{' '}
            clans!
          </Text>
        </SquircleView>
      </Overlay>
      <Overlay
        isVisible={framesOverlay}
        onBackdropPress={toggleFramesOverlay}
        overlayStyle={styles.ClansFramesOverlay}>
        <SquircleView
          style={{
            width: windowWidth * 0.8,
            alignItems: 'center',
            justifyContent: 'center',
            height: windowHeight * 0.2,
          }}
          squircleParams={{
            cornerSmoothing: 1,
            cornerRadius: 20,
            fillColor: theme.colors.full_light,
          }}>
          <Text style={{...theme.text.smallest}}>
            you participated in{' '}
            <Text
              style={{...theme.text.callout, color: theme.colors.danger_red}}>
              {props.Profile.user.total_frames_participation}
            </Text>{' '}
            frames!
          </Text>
        </SquircleView>
      </Overlay>
    </View>
  );
}

export default MyProfileComponent;

const styles = StyleSheet.create({
  ClansFramesOverlay: {
    height: windowHeight * 0.2,
    width: windowWidth * 0.8,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  top_blocks: {
    justifyContent: 'space-between',
  },
  containerview: {
    //backgroundColor: '#f1f4f8',
    backgroundColor: '#fafafa',
    flex: 1,
    justifyContent: 'space-between',
  },

  frames_component_wrap: {
    flexDirection: 'row',
  },

  body_view: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: windowHeight * 0.9,
  },
  first_block_view: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: windowHeight * 0.25,
  },
  first_view_name: {
    fontFamily: 'GothamRounded-Bold',
    fontSize: 25,
    color: '#121c2b',
  },
  first_view_username: {
    fontFamily: 'GothamRounded-Bold',
    fontSize: 15,
    color: '#121c2b80',
  },
  first_view_frames_count: {
    fontFamily: 'GothamRounded-Bold',
    fontSize: 15,
    color: '#7D4DF9',
    marginLeft: 5,
  },
  second_block_view: {
    flexDirection: 'row',
    marginVertical: windowHeight * 0.05,
    marginHorizontal: windowWidth * 0.05,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  show_case_clubs_view: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: windowHeight * 0.11,
  },
  show_case_circle_view: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: windowHeight * 0.11,
  },
  clubs_icon_view_wrap: {
    backgroundColor: '#F9DDE3',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  circle_icon_view_wrap: {
    backgroundColor: '#7D4DF925',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  clubs_icon: {
    width: 24,
    height: 25.6,
  },
  circle_icon: {
    height: 24,
    width: 33.6,
  },
  clubs_count_text: {
    fontFamily: 'GothamRounded-Bold',
    fontSize: 25,
    color: '#FF4E4D',
  },
  circle_count_text: {
    fontFamily: 'GothamRounded-Bold',
    fontSize: 25,
    color: '#7D4DF9',
  },
});
