import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import PageLayout from '../components/landing_page/PageLayout';
import GateHeader, { FlightStatus } from '../components/gate/GateHeader';
import MapView from '../components/navigation/MapView';
import PromotionList from '../components/navigation/promotions/PromotionList';
import RestroomList from '../components/navigation/restrooms/RestroomList';
import FoodPreviewList from '../components/navigation/food/FoodPreviewList';
import ShoppingPreviewList from '../components/navigation/shopping/ShoppingPreviewList';
import LoungeList from '../components/navigation/lounges/LoungeList';
import HelpDeskList from '../components/navigation/helpdesk/HelpDeskList';
import BottomNav from '../components/navigation/BottomNav';

export default function NavigationScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>('search');
  
  const flightNumber = Array.isArray(params.flightNumber) ? params.flightNumber[0] : (params.flightNumber || "91518");
  const destination = Array.isArray(params.destination) ? params.destination[0] : (params.destination || "Bangalore");
  const departureTime = Array.isArray(params.departure) ? params.departure[0] : (params.departure || "17:20");
  const status = Array.isArray(params.status) ? params.status[0] as FlightStatus : (params.status as FlightStatus || "GATE CHANGED");
  const gateNumber = Array.isArray(params.gateNumber) ? params.gateNumber[0] : (params.gateNumber || "34B");

  return (
    <PageLayout hideHeader={true}>
      <GateHeader 
        flightNumber={flightNumber}
        destination={destination}
        departureTime={departureTime}
        status={status}
        gateNumber={gateNumber}
      />
      
      <View style={styles.mainContainer}>
        <View style={styles.contentRow}>
          {/* LEFT side (70%) -> MapView */}
          <View style={styles.mapSection}>
            <MapView />
          </View>

          {/* RIGHT side (30%) -> Dynamic Sidebar */}
          <View style={styles.shopsSection}>
            {activeTab === 'restrooms' ? <RestroomList /> : 
             activeTab === 'food' ? <FoodPreviewList /> : 
             activeTab === 'shopping' ? <ShoppingPreviewList /> : 
             activeTab === 'lounges' ? <LoungeList /> : 
             activeTab === 'help' ? <HelpDeskList /> : 
             <PromotionList />}
          </View>
        </View>
      </View>
      
      <BottomNav 
        activeId={activeTab} 
        onNavPress={(id) => {
          if (id === 'exit') {
            router.push('/');
          } else {
            setActiveTab(id);
          }
        }} 
      />
    </PageLayout>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Clean background
  },
  contentRow: {
    flex: 1,
    flexDirection: 'row', // Tablet Layout requirements
  },
  mapSection: {
    flex: 0.7, // 70% width
  },
  shopsSection: {
    flex: 0.3, // 30% width
    borderLeftWidth: 1,
    borderColor: '#E2E8F0',
  }
});
