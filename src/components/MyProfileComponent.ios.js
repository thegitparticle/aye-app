import React, {useMemo, useContext} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Pressable,
  Image,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Avatar, Header, Icon} from 'react-native-elements';
import BackChevronDownIcon from '../uibits/BackChevronDownIcon';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import Iconly from '../pnstuff/Iconly';
import ThemeContext from '../themes/Theme';

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
          <View style={styles.clubs_icon_view_wrap}>
            <FastImage
              source={require('/Users/san/Desktop/toastgo/assets/house_closed_color1.png')}
              style={styles.clubs_icon}
            />
          </View>
          <Text style={styles.clubs_count_text}>{props.ClubsCount}</Text>
        </View>

        <View style={styles.show_case_circle_view}>
          <View style={styles.circle_icon_view_wrap}>
            <Icon type="feather" name="layers" color="#7D4DF9" size={32} />
          </View>
          <Text style={styles.circle_count_text}>{props.FrameCount}</Text>
        </View>
      </View>
    );
  }
  const navigation = useNavigation();

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
    </View>
  );
}

export default MyProfileComponent;

const styles = StyleSheet.create({
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
