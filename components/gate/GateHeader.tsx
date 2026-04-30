import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export type FlightStatus = 'ON TIME' | 'DELAYED' | 'BOARDING' | 'GATE CHANGED';

interface GateHeaderProps {
  flightNumber: string;
  destination: string;
  departureTime: string;
  status: FlightStatus;
  gateNumber?: string | null;
}

export default function GateHeader({ flightNumber, destination, departureTime, status, gateNumber }: GateHeaderProps) {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const getStatusColor = () => {
    switch (status) {
      case 'DELAYED': return '#E53E3E'; // Red
      case 'BOARDING': return '#38A169'; // Green
      case 'GATE CHANGED': return '#DD6B20'; // Orange
      case 'ON TIME':
      default: return '#3182CE'; // Blue
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Text style={styles.flightNumber}>{flightNumber}</Text>
        <Text style={styles.divider}>|</Text>
        <Text style={styles.destination}>To {destination}</Text>
        <Text style={styles.divider}>|</Text>
        <Text style={styles.departureTime}>Dep: {departureTime}</Text>
        {gateNumber && (
          <>
            <Text style={styles.divider}>|</Text>
            <Text style={styles.departureTime}>Gate: {gateNumber}</Text>
          </>
        )}
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </View>
      <Text style={styles.time}>{timeStr}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: '#0B2A4A',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flightNumber: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '700',
  },
  divider: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 26,
    marginHorizontal: 15,
  },
  destination: {
    color: '#E2E8F0',
    fontSize: 24,
    fontWeight: '600',
  },
  departureTime: {
    color: '#E2E8F0',
    fontSize: 22,
    fontWeight: '500',
  },
  statusBadge: {
    marginLeft: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  time: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '600',
  }
});
