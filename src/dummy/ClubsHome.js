import React, {useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';
import HeaderAtHome from '../components/HeaderAtHome';
import FastImage from 'react-native-fast-image';
import LiveClubComponent from '../components/LiveClubComponent';
import {ClubDummyData} from '../dummy/ClubDummyData';
import LiveClubs from '../components/LiveClubs';
import DormantClubs from '../components/DormantClubs';

function ClubsHomeD({dispatch}) {
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
    </ScrollView>
  );
}

export default ClubsHomeD;

const styles = StyleSheet.create({
  overall_view: {flex: 1},
});
