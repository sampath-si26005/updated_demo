import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function ScannerInstructions() {
  return (
    <View style={styles.rightColumn}>
      <View style={styles.infoCard}>
        <View style={[styles.iconCircle, { backgroundColor: '#E8F1FF' }]}>
          <Feather name="layers" size={24} color="#2F6FED" />
        </View>
        <View style={styles.infoCardTextContainer}>
          <Text style={styles.infoCardTitle}>15–25 cm away</Text>
          <Text style={styles.infoCardDesc}>Hold at the right distance for best read</Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <View style={[styles.iconCircle, { backgroundColor: '#E8F5E9' }]}>
          <Feather name="check" size={24} color="#4CAF50" />
        </View>
        <View style={styles.infoCardTextContainer}>
          <Text style={styles.infoCardTitle}>Hold steady</Text>
          <Text style={styles.infoCardDesc}>Keep the pass flat and still while scanning</Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <View style={[styles.iconCircle, { backgroundColor: '#FFEBEE' }]}>
          <Feather name="alert-circle" size={24} color="#F44336" />
        </View>
        <View style={styles.infoCardTextContainer}>
          <Text style={styles.infoCardTitle}>Avoid glare</Text>
          <Text style={styles.infoCardDesc}>Tilt pass slightly to reduce screen reflection</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rightColumn: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  infoCardTextContainer: {
    flex: 1,
  },
  infoCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  infoCardDesc: {
    fontSize: 14,
    color: '#4B5563',
  },
});
