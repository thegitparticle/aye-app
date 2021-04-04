import React, {useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Button} from 'react-native-elements';
import {ClubDummyData} from '../dummy/ClubDummyData';
import LiveClubs from '../components/LiveClubs';
import DormantClubs from '../components/DormantClubs';
import {useNavigation} from '@react-navigation/native';

function ClubsHomeD({dispatch}) {
  const navigation = useNavigation();
  const LiveClubsDataHere = [];
  const DorClubsDataHere = [];
  /*
  useEffect(() => {
    {
      ClubDummyData.map(item => {
        if (item.pn_live === true) {
          LiveClubsDataHere.push(item);
        } else {
          DorClubsDataHere.push(item);
        }
      });
    }
  }, [ClubDummyData]);
*/
  //<LiveClubs ClubsData={ClubDummyData} />
  return (
    <ScrollView
      style={styles.overall_view}
      showsVerticalScrollIndicator={false}>
      <LiveClubs ClubsData={ClubDummyData} />
      <DormantClubs />
      <Button
        // raised
        buttonStyle={styles.start_club_button_style}
        containerStyle={styles.start_club_button_container_style}
        titleStyle={styles.start_club_button_title_style}
        title="start club"
        onPress={() => navigation.navigate('StartClub')}
      />
    </ScrollView>
  );
}

export default ClubsHomeD;

const styles = StyleSheet.create({
  overall_view: {flex: 1},
  start_club_button_title_style: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 17,
    color: '#F1f4f9',
  },
  start_club_button_container_style: {
    alignSelf: 'center',
    marginVertical: 30,
    backgroundColor: 'transparent',
  },
  start_club_button_style: {
    height: 60,
    width: 160,
    borderRadius: 30,
    backgroundColor: '#36b37e',
  },
});
