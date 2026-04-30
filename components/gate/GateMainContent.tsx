import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

export type GateState = 'loading' | 'no_gate' | 'gate_announced';
export type GateStatusType = 'normal' | 'boarding' | 'gate_changed';

interface GateMainContentProps {
  state: GateState;
  gateStatus?: GateStatusType;
  gateNumber?: string | null;
  previousGateNumber?: string | null;
}

export default function GateMainContent({ 
  state, 
  gateStatus = 'normal',
  gateNumber,
  previousGateNumber 
}: GateMainContentProps) {

  if (state === 'loading') {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#3182CE" />
        <Text style={styles.loadingText}>Fetching gate details...</Text>
      </View>
    );
  }

  if (state === 'no_gate' || !gateNumber) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.messageText}>Gate not announced yet</Text>
        <Text style={styles.subText}>Please check back later or listen for announcements.</Text>
      </View>
    );
  }

  // state === 'gate_announced'
  let message = "Your gate is announced";
  let subText = "You will be notified when you can board the plane.";
  
  if (gateStatus === 'boarding') {
    message = "Boarding Now";
    subText = "Please proceed to your gate immediately.";
  }

  return (
    <View style={styles.centerContainer}>
      {gateStatus === 'gate_changed' && previousGateNumber && (
        <View style={styles.alertBanner}>
          <Text style={styles.alertText}>
            Attention: Gate changed from {previousGateNumber} to {gateNumber}
          </Text>
        </View>
      )}

      <Text style={styles.messageText}>{message}</Text>
      <View style={styles.gateBox}>
        <Text style={styles.gateLabel}>GATE</Text>
        <Text style={styles.gateNumber}>{gateNumber}</Text>
      </View>
      <Text style={styles.subText}>{subText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 24,
    color: '#4A5568',
    fontWeight: '500',
  },
  messageText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 40,
    textAlign: 'center',
  },
  gateBox: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 60,
    paddingVertical: 40,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    marginBottom: 40,
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  gateLabel: {
    fontSize: 24,
    color: '#718096',
    fontWeight: 'bold',
    letterSpacing: 4,
    marginBottom: 10,
  },
  gateNumber: {
    fontSize: 120,
    fontWeight: '900',
    color: '#1A202C',
    lineHeight: 130,
  },
  subText: {
    fontSize: 28,
    color: '#4A5568',
    textAlign: 'center',
    maxWidth: '80%',
    lineHeight: 40,
  },
  alertBanner: {
    backgroundColor: '#E53E3E',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 40,
    shadowColor: '#E53E3E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  alertText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  }
});
