/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Icon} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import ThemeContext from '../../../themes/Theme';

const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

function DormantClubBit(props) {
  const theme = useContext(ThemeContext);

  if (props.Club.club_id === 0) {
    return <View />;
  } else {
    return (
      <View>
        <View
          style={{
            ...styles.overall_view_under,
            backgroundColor: theme.colors.full_light,
          }}>
          <FastImage
            source={{uri: props.Club.club_profile_pic}}
            style={styles.avatar_of_club}
            size={68}
          />
          <View style={styles.text_block_view}>
            <Text
              style={{
                ...theme.text.subhead_medium,
                marginBottom: 10,
                color: theme.colors.full_dark,
              }}>
              {props.Club.club_name}
            </Text>

            <View style={styles.subtitle_view}>
              <Icon
                type="feather"
                color={theme.colors.full_dark_25}
                name="layers"
                size={12}
              />
              <Text
                style={{
                  ...theme.text.smallest,
                  color: theme.colors.full_dark_25,
                  marginLeft: 5,
                }}>
                tap to start new frame
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default DormantClubBit;

const styles = StyleSheet.create({
  subtitle_view: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar_of_club: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  overall_view_under: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    width: windowWidth - 40,
  },
  text_block_view: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
});
