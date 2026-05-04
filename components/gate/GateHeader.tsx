import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export type FlightStatus = 'ON TIME' | 'DELAYED' | 'BOARDING' | 'GATE CHANGED';

interface GateHeaderProps {
  flightNumber: string;
  destination: string;
  departureTime: string;
  status: FlightStatus;
  gateNumber?: string | null;
}

export default function GateHeader({ flightNumber, destination, departureTime, status, gateNumber }: GateHeaderProps) {
  const router = useRouter();
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
        <View style={styles.flightInfoSection}>
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
      </View>
      
      <View style={styles.rightSection}>
        <Text style={styles.time}>{timeStr}</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
          <View style={styles.backArrowCircle}>
            <Ionicons name="arrow-back" size={20} color="#C9A96E" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100, // Increased by 10%
    backgroundColor: '#0D1F35', // Match premium dark navy header
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    borderBottomWidth: 2,
    borderBottomColor: '#C9A96E', // Match premium gold line
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  backBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrowCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(201, 169, 110, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  flightInfoSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flightNumber: {
    color: '#FFFFFF',
    fontSize: 30,
    fontFamily: 'Inter_700Bold',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  divider: {
    color: 'rgba(255, 255, 255, 0.3)',
    fontSize: 30,
    marginHorizontal: 16,
  },
  destination: {
    color: '#EDE9E3',
    fontSize: 30,
    fontFamily: 'Inter_700Bold',
    fontWeight: 'bold',
  },
  departureTime: {
    color: '#EDE9E3',
    fontSize: 30,
    fontFamily: 'Inter_700Bold',
    fontWeight: 'bold',
  },
  statusBadge: {
    marginLeft: 50,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 1,
  },
  time: {
    color: 'rgba(237, 233, 227, 0.7)',
    fontSize: 30,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 1,
  }
});
