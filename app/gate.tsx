import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PageLayout from '../components/landing_page/PageLayout';
import GateHeader, { FlightStatus } from '../components/gate/GateHeader';
import GateMainContent, { GateState, GateStatusType } from '../components/gate/GateMainContent';
import GateAction from '../components/gate/GateAction';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function GateScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const defaultFlightNumber = Array.isArray(params.flightNo) ? params.flightNo[0] : (params.flightNo || "6E 123");
  const defaultDestination = Array.isArray(params.destination) ? params.destination[0] : (params.destination || "London");
  const defaultDepartureTime = Array.isArray(params.departure) ? params.departure[0] : (params.departure || "14:45");
  const airline = Array.isArray(params.airline) ? params.airline[0] : (params.airline || "IndiGo");
  const origin = Array.isArray(params.origin) ? params.origin[0] : (params.origin || "Chennai");
  const passenger = Array.isArray(params.passenger) ? params.passenger[0] : (params.passenger || "JANE DOE");
  const date = Array.isArray(params.date) ? params.date[0] : (params.date || "JAN 25, 2025");

  const [gateState, setGateState] = useState<GateState>('loading');
  const [flightStatus, setFlightStatus] = useState<FlightStatus>('ON TIME');
  const [gateStatusType, setGateStatusType] = useState<GateStatusType>('normal');
  const [gateNumber, setGateNumber] = useState<string | null>(null);
  const [prevGateNumber, setPrevGateNumber] = useState<string | null>(null);

  // Mock API logic
  useEffect(() => {
    // 1. Initially loading for 2 seconds
    const timer1 = setTimeout(() => {
      setGateState('gate_announced');
      setGateNumber('22A');
      setFlightStatus('ON TIME');
    }, 2000);

    // 2. After 6 seconds, simulate a gate change
    const timer2 = setTimeout(() => {
      setGateStatusType('gate_changed');
      setPrevGateNumber('22A');
      setGateNumber('34B');
      setFlightStatus('GATE CHANGED');
    }, 6000);

    // 3. After 10 seconds, simulate boarding
    const timer3 = setTimeout(() => {
      setGateStatusType('boarding');
      setFlightStatus('BOARDING');
    }, 10000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleStartNavigation = () => {
    router.push({
      pathname: '/navigation',
      params: {
        flightNumber: defaultFlightNumber,
        destination: defaultDestination,
        departure: defaultDepartureTime,
        status: flightStatus,
        gateNumber: gateNumber || ''
      }
    });
  };

  return (
    <PageLayout hideHeader={true}>
      <GateHeader 
        flightNumber={defaultFlightNumber}
        destination={defaultDestination}
        departureTime={defaultDepartureTime}
        status={flightStatus}
        gateNumber={gateNumber}
      />
      
      <LinearGradient 
        colors={['#FCFAF8', '#EBE6DF']} 
        style={styles.mainContainer}
      >
        <GateMainContent 
          state={gateState}
          gateStatus={gateStatusType}
          gateNumber={gateNumber}
          previousGateNumber={prevGateNumber}
          flightNumber={defaultFlightNumber}
          destination={defaultDestination}
          departureTime={defaultDepartureTime}
          airline={airline}
          origin={origin}
          passenger={passenger}
          date={date}
        />
        
        {gateState === 'gate_announced' && (
          <GateAction onPress={handleStartNavigation} />
        )}
      </LinearGradient>
    </PageLayout>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // Background color handled by LinearGradient
  }
});
