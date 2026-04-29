import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function ScannerBanner() {
  return (
    <View style={styles.bannerContainer}>
      <View style={styles.bannerTextContainer}>
        <Text style={styles.bannerSubtitle}>Get your flight information</Text>
        <Text style={styles.bannerTitle}>Scan your boarding pass here</Text>
      </View>
      <View style={styles.bannerIconContainer}>
        <View style={styles.boardingPassIconBox}>
          <MaterialIcons name="flight" size={32} color="#2F6FED" />
          <Text style={styles.boardingPassIconText}>BOARDING</Text>
        </View>
        <MaterialIcons name="arrow-forward" size={24} color="#FFFFFF" style={styles.arrowIcon} />
        <View style={styles.scannerIconBox}>
          <MaterialIcons name="qr-code-scanner" size={48} color="#2F6FED" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bannerContainer: {
    backgroundColor: '#2F6FED',
    paddingVertical: 30,
    paddingHorizontal: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bannerTextContainer: {
    flex: 1,
  },
  bannerSubtitle: {
    color: '#D0DFFC',
    fontSize: 18,
    marginBottom: 8,
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  bannerIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boardingPassIconBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 90,
  },
  boardingPassIconText: {
    color: '#2F6FED',
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 4,
  },
  arrowIcon: {
    marginHorizontal: 20,
  },
  scannerIconBox: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderStyle: 'dashed',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 90,
  },
});
