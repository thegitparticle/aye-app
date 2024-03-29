import {Dimensions} from 'react-native';

const windowHeight = Dimensions.get('window').height;
// const windowWidth = Dimensions.get('window').width;

export const ButterTheme = {
  colors: {
    success_green: '#00C781',
    success_green_75: '#00C78175',
    success_green_50: '#00C78150',
    success_green_25: '#00C78125',
    danger_red: '#ED4245',
    danger_red_75: '#ED424575',
    danger_red_50: '#ED424550',
    danger_red_25: '#ED424525',
    chat_prime: '#5FC9F8',
    chat_prime_75: '#5FC9F875',
    chat_prime_50: '#5FC9F850',
    chat_prime_25: '#5FC9F825',
    friends_prime: '#7D4DF9',
    friends_prime_75: '#7D4DF975',
    friends_prime_50: '#7D4DF950',
    friends_prime_25: '#7D4DF925',
    you_prime: '#FE2A55',
    you_prime_75: '#FE2A5575',
    you_prime_50: '#FE2A5550',
    you_prime_25: '#FE2A5525',
    full_light: '#FFFFFF',
    full_light_75: '#FFFFFF75',
    full_light_50: '#FFFFFF50',
    full_light_25: '#FFFFFF25',
    full_light_10: '#FFFFFF10',
    // off_light: '#F2F4F9',
    off_light: '#F1F1F1',
    off_light_75: '#F2F4F975',
    off_light_50: '#F2F4F950',
    off_light_25: '#F2F4F925',
    mid_light: '#CCCCCC',
    mid_light_75: '#CCCCCC75',
    mid_light_50: '#CCCCCC50',
    mid_light_25: '#CCCCCC25',
    mid_dark: '#333333',
    mid_dark_75: '#33333375',
    mid_dark_50: '#33333350',
    mid_dark_25: '#33333325',
    off_dark: '#131313',
    off_dark_75: '#13131375',
    off_dark_50: '#13131350',
    off_dark_25: '#13131325',
    full_dark: '#050505',
    full_dark_75: '#05050575',
    full_dark_50: '#05050550',
    full_dark_25: '#05050525',
    full_dark_10: '#05050510',
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  text: {
    title_large: {
      fontFamily: 'GothamRounded-Bold',
      fontSize: windowHeight > 770 ? 34 : 32,
    },
    title_1: {
      fontFamily: 'GothamRounded-Bold',
      fontSize: windowHeight > 770 ? 28 : 26,
    },
    title_2: {
      fontFamily: 'GothamRounded-Bold',
      fontSize: windowHeight > 770 ? 22 : 21,
    },
    title_3: {
      fontFamily: 'GothamRounded-Bold',
      fontSize: windowHeight > 770 ? 20 : 19,
    },
    header: {
      fontFamily: 'GothamRounded-Medium',
      fontSize: windowHeight > 770 ? 17 : 16,
    },
    body: {
      fontFamily: 'GothamRounded-Book',
      fontSize: windowHeight > 770 ? 17 : 16,
    },
    callout: {
      fontFamily: 'GothamRounded-Book',
      fontSize: windowHeight > 770 ? 16 : 15,
    },
    subhead_medium: {
      fontFamily: 'GothamRounded-Medium',
      fontSize: windowHeight > 770 ? 15 : 14,
    },
    subhead: {
      fontFamily: 'GothamRounded-Book',
      fontSize: windowHeight > 770 ? 15 : 14,
    },
    caption: {
      fontFamily: 'GothamRounded-Book',
      fontSize: windowHeight > 770 ? 13 : 12,
    },
    smallest: {
      fontFamily: 'GothamRounded-Book',
      fontSize: windowHeight > 770 ? 12 : 11,
    },
  },
};
