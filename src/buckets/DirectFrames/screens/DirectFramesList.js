import React, {useEffect, useState, useRef, useContext} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  Animated,
  Pressable,
} from 'react-native';
import {Header, Icon, Badge} from 'react-native-elements';
import {connect} from 'react-redux';
import dayjs from 'dayjs';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import {BlurView} from '@react-native-community/blur';
import {MixpanelContext} from '../../../external/MixPanelStuff';
import Iconly from '../../../external/Iconly';
import ThemeContext from '../../../themes/Theme';

const header_color = 'transparent';
const header_bar_style = 'dark-content';
const font_color_header = '#050505';
const header_back_image = '/Users/san/Desktop/toastgo/assets/3.jpeg';

var statehere = {};

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function DirectFramesList({dispatch, navigation, route}) {
  const theme = useContext(ThemeContext);
  const {direct_id, other_name} = route.params;
  const [thisMonth, setThisMonth] = useState(); // actual month IRL
  const [currentmonth, setCurrentmonth] = useState(); // string value of rendering month
  const [monthnum, setMonthnum] = useState(); // num value of rendering month
  const [date, setDate] = useState(); //today's date
  const [currentyear, setCurrentYear] = useState(); //num value of rendering year
  const [thisyear, setThisYear] = useState();

  const mixpanel = useContext(MixpanelContext);
  useEffect(() => {
    mixpanel.track('Opened Direct Frames List');
  }, []);

  function LeftHeaderComponent() {
    return (
      <Pressable
        style={{
          width: 75,
          height: 35,
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
        onPress={() =>
          navigation.navigate('DirectHub', {
            direct_id: direct_id,
            other_name: other_name,
          })
        }>
        <Icon type="feather" color={theme.colors.off_dark} name="user" />
      </Pressable>
    );
  }

  function RightHeaderComponent() {
    return (
      <Pressable
        style={{
          width: 75,
          height: 35,
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
        onPress={() => navigation.navigate('DirectChatScreen')}>
        <Iconly
          name="ChevronRightBroken"
          color={theme.colors.off_dark}
          size={30}
        />
      </Pressable>
    );
  }

  function CenterHeaderComponent() {
    return (
      <View style={styles.center_header_view}>
        <Text style={styles.center_header_club_name}>
          {other_name.substring(0, 14)}
        </Text>
      </View>
    );
  }

  function stringmonth(month, year) {
    if (month === 0) {
      return `JANUARY, ${year}`;
    } else if (month === 1) {
      return `FEBRUARY, ${year}`;
    } else if (month === 2) {
      return `MARCH, ${year}`;
    } else if (month === 3) {
      return `APRIL, ${year}`;
    } else if (month === 4) {
      return `MAY, ${year}`;
    } else if (month === 5) {
      return `JUNE, ${year}`;
    } else if (month === 6) {
      return `JULY, ${year}`;
    } else if (month === 7) {
      return `AUGUST, ${year}`;
    } else if (month === 8) {
      return `SEPTEMBER, ${year}`;
    } else if (month === 9) {
      return `OCTOBER, ${year}`;
    } else if (month === 10) {
      return `NOVEMBER, ${year}`;
    } else if (month === 11) {
      return `DECEMBER, ${year}`;
    } else {
      return;
    }
  }

  useEffect(() => {
    console.log('dayjs grabbing effect working');
    var month_here = dayjs().get('month');
    var year_here = dayjs().get('year');
    setThisYear(year_here);
    var year_2 = year_here - 2000;
    setCurrentYear(year_2);
    setMonthnum(month_here);
    setThisMonth(month_here + 1);
    setCurrentmonth(stringmonth(month_here, year_here));
    var date_here = dayjs().get('date');
    setDate(date_here);
    console.log(month_here, year_here);
  }, []);

  const anim = useRef(new Animated.Value(1));

  useEffect(() => {
    // makes the sequence loop
    Animated.loop(
      // runs given animations in a sequence
      Animated.sequence([
        // increase size
        Animated.timing(anim.current, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        // decrease size
        Animated.timing(anim.current, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  function CalenderComponent() {
    if (monthnum + 1 === thisMonth && currentyear + 2000 === thisyear) {
      return (
        <View style={styles.month_container}>
          <View style={styles.month_container_internal_view}>
            <Icon
              type="feather"
              name="chevron-left"
              onPress={() => {
                if (monthnum === 0) {
                  setMonthnum(11);
                  setCurrentYear(currentyear - 1);
                  setCurrentmonth(stringmonth(11, currentyear - 1));
                } else {
                  setMonthnum(monthnum - 1);
                  setCurrentmonth(stringmonth(monthnum - 1, currentyear));
                }
              }}
            />
            <Text style={styles.monthtext}>{currentmonth}</Text>
            <Icon type="feather" name="chevron-right" color="#00000050" />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.month_container}>
          <View style={styles.month_container_internal_view}>
            <Icon
              type="feather"
              name="chevron-left"
              onPress={() => {
                if (monthnum === 0) {
                  setMonthnum(11);
                  setCurrentYear(currentyear - 1);
                  setCurrentmonth(stringmonth(11, currentyear - 1));
                } else {
                  setMonthnum(monthnum - 1);
                  setCurrentmonth(stringmonth(monthnum - 1, currentyear));
                }
              }}
            />
            <Text style={styles.monthtext}>{currentmonth}</Text>
            <Icon
              type="feather"
              name="chevron-right"
              onPress={() => {
                if (monthnum === 11) {
                  setCurrentYear(currentyear + 1);
                  setMonthnum(0);
                  setCurrentmonth(stringmonth(0, currentyear + 1));
                } else {
                  setMonthnum(monthnum + 1);
                  setCurrentmonth(stringmonth(monthnum + 1, currentyear));
                }
              }}
            />
          </View>
        </View>
      );
    }
  }

  function DatesBlock(props) {
    // takes in start and end date and gives out
    //console.log(props.Frames);
    var items = [];
    var badge_style = props.BadgeStyle;

    for (var i = props.MinDate; i <= props.MaxDate; i++) {
      items.push(i);
    }

    var grand_list = [];
    const Generate_Grand_List = items.map(item => {
      var ob = Object();
      var ro = props.Frames.filter(
        y => Number(y.published_date.slice(-2)) === item,
      ).map(x => JSON.stringify(x));

      /*
      var ro = frames_list_here
        //.filter(y => Number(y.published_date.slice(-2)) === item)
        .filter(y => y.date === item)
        .map(x => x.link);
*/
      var ro = (ob.ro = ro);
      ob.date = item;
      grand_list.push(ob);
    }, {});

    Generate_Grand_List;
    //console.log(grand_list);

    function AniRenderOrNot(props) {
      if (props.Render.frame_status) {
        return (
          <Animated.View
            style={{
              transform: [
                {
                  scale: anim.current,
                },
              ],
            }}>
            <Pressable
              onPress={() =>
                navigation.navigate('ViewOldFrameDirect', {
                  other_name: other_name,
                  channel_id: direct_id,
                  start_time: props.Render.start_time,
                  end_time: props.Render.end_time,
                })
              }>
              <View style={styles.frame_thumbnail_on_strip_one_frame_view}>
                <FastImage
                  source={{uri: props.Render.frame_picture_link}}
                  style={styles.frame_thumbnail_on_strip_image}
                  size={80}
                />
                <Badge
                  status="success"
                  value={props.Date}
                  containerStyle={
                    styles.frame_thumbnail_date_badge_on_strip_container
                  }
                  badgeStyle={badge_style}
                />
              </View>
            </Pressable>
          </Animated.View>
        );
      } else {
        return (
          <Pressable
            onPress={() =>
              navigation.navigate('ViewOldFrameDirect', {
                other_name: other_name,
                channel_id: direct_id,
                start_time: props.Render.start_time,
                end_time: props.Render.end_time,
              })
            }>
            <View style={styles.frame_thumbnail_on_strip_one_frame_view}>
              <FastImage
                source={{uri: props.Render.frame_picture_link}}
                style={styles.frame_thumbnail_on_strip_image}
              />
              <Badge
                status="success"
                value={props.Date}
                containerStyle={
                  styles.frame_thumbnail_date_badge_on_strip_container
                }
                badgeStyle={badge_style}
              />
            </View>
          </Pressable>
        );
      }
    }

    function WhatToRender(props) {
      // individual frame/date item
      if (props.Item.ro.length !== 0) {
        //console.log(props.Item.ro[0]);
        return (
          <View style={styles.frame_thumbnail_on_strip_date_view}>
            {props.Item.ro.map(item => (
              <AniRenderOrNot
                Render={JSON.parse(item)}
                Date={props.Item.date}
              />
            ))}
          </View>
        );
      } else {
        return <Text style={styles.date_on_strip_text}>{props.Item.date}</Text>;
      }
    }

    return (
      <View style={{flexDirection: 'column-reverse'}}>
        {grand_list.map(item => (
          <View style={styles.date_on_strip_view}>
            <WhatToRender Item={item} />
          </View>
        ))}
      </View>
    );
  }

  function FrameStrip(props) {
    //Strips which render
    console.log(monthnum + 'month num');
    console.log(thisMonth + 'this month');
    console.log(thisyear + 'this year');
    console.log(currentyear + 'current year');
    if (monthnum + 1 === thisMonth && currentyear + 2000 === thisyear) {
      const default_list = [
        {
          id: 4,
          club_name: 1,
          published_date: '2021-04-03',
          frame_picture_link:
            'https://apisayepirates.life/media/club_images/1XLzCRzy_400x400.jpg',
          frame_status: false,
          channel_id: '1_c',
          start_time: '1616670128',
          end_time: '1616713328',
        },
        {
          id: 5,
          club_name: 1,
          published_date: '2021-04-03',
          frame_picture_link:
            'https://apisayepirates.life/media/club_images/3.jpeg',
          frame_status: false,
          channel_id: '1_c',
          start_time: '1616780946.5139637',
          end_time: '1616824146.5139637',
        },
      ];
      const [framesThisMonth, setFramesThisMonth] = useState(default_list);
      const [resolved, setResolved] = useState(false);

      var res = [];

      console.log('current month api call about to happen');
      console.log(framesThisMonth);

      useEffect(() => {
        axios
          .get(
            'https://apisayepirates.life/api/clubs/frames_one_on_one_filtered/' +
              String(thisyear) +
              '/' +
              String(monthnum + 1) +
              '/' +
              direct_id +
              '/',
          )
          .then(response => (res = response.data))
          .then(() => setFramesThisMonth(res))
          //.then(console.log(framesThisMonth))
          .then(setResolved(true))
          .catch(err => {
            console.log(err);
          });
      }, []);

      if (resolved) {
        if (date < 11) {
          return (
            <View style={styles.frame_strips_view}>
              <View style={styles.frame_strip_block_1}>
                <DatesBlock
                  MaxDate={date}
                  MinDate={1}
                  Render="this month 1"
                  Frames={framesThisMonth}
                  BadgeStyle={styles.frame_thumbnail_date_badge_on_strip_1}
                />
              </View>
            </View>
          );
        } else if (date < 21) {
          return (
            <View style={styles.frame_strips_view}>
              <View style={styles.frame_strip_block_1}>
                <DatesBlock
                  MaxDate={10}
                  MinDate={1}
                  Render="this month 1"
                  Frames={framesThisMonth}
                  BadgeStyle={styles.frame_thumbnail_date_badge_on_strip_1}
                />
              </View>
              <View style={styles.frame_strip_block_2}>
                <DatesBlock
                  MaxDate={date}
                  MinDate={11}
                  Render="this month 2"
                  Frames={framesThisMonth}
                  BadgeStyle={styles.frame_thumbnail_date_badge_on_strip_2}
                />
              </View>
            </View>
          );
        } else if (date >= 21) {
          return (
            <View style={styles.frame_strips_view}>
              <View style={styles.frame_strip_block_1}>
                <DatesBlock
                  MaxDate={10}
                  MinDate={1}
                  Render="this month 1"
                  Frames={framesThisMonth}
                  BadgeStyle={styles.frame_thumbnail_date_badge_on_strip_1}
                />
              </View>
              <View style={styles.frame_strip_block_2}>
                <DatesBlock
                  MaxDate={20}
                  MinDate={11}
                  Render="this month 2"
                  Frames={framesThisMonth}
                  BadgeStyle={styles.frame_thumbnail_date_badge_on_strip_2}
                />
              </View>
              <View style={styles.frame_strip_block_3}>
                <DatesBlock
                  MaxDate={date}
                  MinDate={21}
                  Render="this month 3"
                  Frames={framesThisMonth}
                  BadgeStyle={styles.frame_thumbnail_date_badge_on_strip_3}
                />
              </View>
            </View>
          );
        } else {
          return <View />;
        }
      } else {
        return <View />;
      }
    } else {
      const List31 = [0, 2, 4, 6, 7, 9, 11];
      const List30 = [3, 5, 8, 10];

      var month_here = monthnum + 1;
      const list = [
        {
          id: 4,
          club_name: 1,
          published_date: '2021-04-03',
          frame_picture_link:
            'https://apisayepirates.life/media/club_images/1XLzCRzy_400x400.jpg',
          frame_status: false,
          channel_id: '1_c',
          start_time: '1616670128',
          end_time: '1616713328',
        },
      ];

      const [framesThisMonthH, setFramesThisMonthH] = useState(list);

      const [resolvedHere, setResolvedHere] = useState(false);

      console.log(framesThisMonthH);

      var res = [];

      console.log('old month api call about to happen');

      console.log(thisyear + 'this year');
      console.log(monthnum);

      console.log(
        'https://apisayepirates.life/api/clubs/frames_one_on_one_filtered/' +
          String(thisyear) +
          '/' +
          String(monthnum + 1) +
          '/' +
          direct_id +
          '/',
      );

      useEffect(() => {
        axios
          .get(
            'https://apisayepirates.life/api/clubs/frames_one_on_one_filtered/' +
              String(thisyear) +
              '/' +
              String(monthnum + 1) +
              '/' +
              direct_id +
              '/',
          )
          .then(response => (res = response.data))
          .then(() => setFramesThisMonthH(res))
          .then(setResolvedHere(true))
          //.then(console.log(framesThisMonthHere))
          .catch(err => {
            console.log(err);
          });
      }, []);

      if (resolvedHere) {
        if (List31.includes(monthnum)) {
          //console.log(monthnum + 'odd months');
          return (
            <View style={styles.frame_strips_view}>
              <View style={styles.frame_strip_block_1}>
                <DatesBlock
                  MaxDate={10}
                  MinDate={1}
                  Render="odd month 1"
                  Frames={framesThisMonthH}
                  BadgeStyle={styles.frame_thumbnail_date_badge_on_strip_1}
                />
              </View>
              <View style={styles.frame_strip_block_2}>
                <DatesBlock
                  MaxDate={20}
                  MinDate={11}
                  Render="odd month 2"
                  Frames={framesThisMonthH}
                  BadgeStyle={styles.frame_thumbnail_date_badge_on_strip_2}
                />
              </View>
              <View style={styles.frame_strip_block_3}>
                <DatesBlock
                  MaxDate={31}
                  MinDate={21}
                  Render="odd month 3"
                  Frames={framesThisMonthH}
                  BadgeStyle={styles.frame_thumbnail_date_badge_on_strip_3}
                />
              </View>
            </View>
          );
        } else if (List30.includes(monthnum)) {
          //console.log(monthnum + 'even months');
          return (
            <View style={styles.frame_strips_view}>
              <View style={styles.frame_strip_block_1}>
                <DatesBlock
                  MaxDate={10}
                  MinDate={1}
                  Render="even month 1"
                  Frames={framesThisMonthH}
                  BadgeStyle={styles.frame_thumbnail_date_badge_on_strip_1}
                />
              </View>
              <View style={styles.frame_strip_block_2}>
                <DatesBlock
                  MaxDate={20}
                  MinDate={11}
                  Render="even month 2"
                  Frames={framesThisMonthH}
                  BadgeStyle={styles.frame_thumbnail_date_badge_on_strip_2}
                />
              </View>
              <View style={styles.frame_strip_block_3}>
                <DatesBlock
                  MaxDate={30}
                  MinDate={21}
                  Frames={framesThisMonthH}
                  Render="even month 3"
                  BadgeStyle={styles.frame_thumbnail_date_badge_on_strip_3}
                />
              </View>
            </View>
          );
        } else {
          //console.log(monthnum + 'else');
          return (
            <View style={styles.frame_strips_view}>
              <View style={styles.frame_strip_block_1}>
                <DatesBlock
                  MaxDate={10}
                  MinDate={1}
                  Render="feb month 1"
                  Frames={framesThisMonthH}
                  BadgeStyle={styles.frame_thumbnail_date_badge_on_strip_1}
                />
              </View>
              <View style={styles.frame_strip_block_2}>
                <DatesBlock
                  MaxDate={20}
                  MinDate={11}
                  Render="feb month 2"
                  Frames={framesThisMonthH}
                  BadgeStyle={styles.frame_thumbnail_date_badge_on_strip_2}
                />
              </View>
              <View style={styles.frame_strip_block_3}>
                <DatesBlock
                  MaxDate={28}
                  MinDate={21}
                  Render="feb month 3"
                  Frames={framesThisMonthH}
                  BadgeStyle={styles.frame_thumbnail_date_badge_on_strip_3}
                />
              </View>
            </View>
          );
        }
      } else {
        return <View />;
      }
    }
  }

  return (
    <View style={styles.view}>
      <View>
        <Image
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            width: windowWidth,
            height: 200,
          }}
          source={require(header_back_image)}
        />
        <BlurView
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            width: windowWidth,
            height: 200,
          }}
          blurType="light"
          blurAmount={50}
          reducedTransparencyFallbackColor="blue"
        />
        <Header
          backgroundColor={header_color}
          containerStyle={styles.header_container}
          barStyle={header_bar_style}>
          <LeftHeaderComponent />
          <CenterHeaderComponent />
          <RightHeaderComponent />
        </Header>
      </View>
      <CalenderComponent />
      <ScrollView
        style={styles.body_scroll_view}
        contentContainerStyle={styles.body_scroll_view_content_container}>
        <FrameStrip />
      </ScrollView>
    </View>
  );
}

const mapStateToProps = state => {
  statehere = state;
  return statehere;
};

export default connect(mapStateToProps)(DirectFramesList);

const styles = StyleSheet.create({
  body_scroll_view: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    width: windowWidth,
    ///borderRadius: 10,
  },
  body_scroll_view_content_container: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#050505',
    alignItems: 'center',
  },
  view: {
    flex: 1,
    backgroundColor: '#06090e',
  },
  header_container: {borderBottomWidth: 0},
  center_header_view: {flexDirection: 'column'},
  center_header_club_name: {
    //color: '#050505',
    color: font_color_header,
    fontFamily: 'GothamRounded-Bold',
    fontSize: 21,
    textAlign: 'center',
  },
  center_header_people_view: {
    justifyContent: 'space-between',
    marginTop: 10,
    flexDirection: 'row',
  },
  center_header_people_image: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  monthtext: {
    fontFamily: 'GothamRounded-Bold',
    fontSize: 17,
    color: '#111111',
  },
  month_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: windowWidth,
    backgroundColor: '#FFFFFF',
  },
  month_container_internal_view: {
    marginVertical: windowHeight * 0.021,
    width: windowWidth * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  frame_strips_view: {
    flexDirection: 'row',
    marginVertical: windowHeight * 0.05,
    flex: 1,
  },
  frame_strip_block_1: {
    backgroundColor: '#FF7272',
    width: 32,
    marginHorizontal: windowWidth * 0.1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  frame_strip_block_2: {
    backgroundColor: '#D079FF',
    width: 32,
    marginHorizontal: windowWidth * 0.1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  frame_strip_block_3: {
    backgroundColor: '#8DD384',
    width: 32,
    marginHorizontal: windowWidth * 0.1,
    alignItems: 'center',
    flexDirection: 'column',
  },

  date_on_strip_view: {
    //width: 32,
    //height: 32,
    backgroundColor: '#FFFFFF05',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 40,
  },
  date_on_strip_text: {
    fontFamily: 'GothamRounded-Book',
    color: '#Fafafa50',
    fontSize: 21,
    //marginVertical: 40,
  },
  frame_thumbnail_on_strip_image: {
    width: 80,
    height: 80,
    //marginVertical: 10,
    borderRadius: 20,
  },

  frame_thumbnail_on_strip_date_view: {},
  frame_thumbnail_on_strip_one_frame_view: {},

  frame_thumbnail_date_badge_on_strip_container: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  frame_thumbnail_date_badge_on_strip_1: {
    backgroundColor: '#FF7272',
    borderWidth: 0,
    width: 25,
    height: 25,
    borderRadius: 10,
  },
  frame_thumbnail_date_badge_on_strip_2: {
    backgroundColor: '#D079FF',
    borderWidth: 0,
    width: 25,
    height: 25,
    borderRadius: 10,
  },
  frame_thumbnail_date_badge_on_strip_3: {
    backgroundColor: '#8DD384',
    borderWidth: 0,
    width: 25,
    height: 25,
    borderRadius: 10,
  },
});
