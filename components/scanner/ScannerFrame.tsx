import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function ScannerFrame() {
  return (
    <View style={styles.leftColumn}>
      <Text style={styles.instructionText}>Position QR code in frame</Text>
      <View style={styles.scannerFrame}>
        <View style={styles.scannerCornerTopLeft} />
        <View style={styles.scannerCornerTopRight} />
        <View style={styles.scannerCornerBottomLeft} />
        <View style={styles.scannerCornerBottomRight} />
        <View style={styles.scannerRedLine} />
        <MaterialIcons name="grid-on" size={80} color="#D0DFFC" style={styles.gridPlaceholder} />
        <Text style={styles.scanAreaText}>SCAN AREA</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  leftColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 20,
  },
  instructionText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 30,
  },
  scannerFrame: {
    width: 320,
    height: 320,
    backgroundColor: '#E8F1FF',
    borderRadius: 16,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scannerCornerTopLeft: {
    position: 'absolute',
    top: 0, left: 0, width: 40, height: 40,
    borderTopWidth: 4, borderLeftWidth: 4, borderColor: '#2F6FED',
    borderTopLeftRadius: 16,
  },
  scannerCornerTopRight: {
    position: 'absolute',
    top: 0, right: 0, width: 40, height: 40,
    borderTopWidth: 4, borderRightWidth: 4, borderColor: '#2F6FED',
    borderTopRightRadius: 16,
  },
  scannerCornerBottomLeft: {
    position: 'absolute',
    bottom: 0, left: 0, width: 40, height: 40,
    borderBottomWidth: 4, borderLeftWidth: 4, borderColor: '#2F6FED',
    borderBottomLeftRadius: 16,
  },
  scannerCornerBottomRight: {
    position: 'absolute',
    bottom: 0, right: 0, width: 40, height: 40,
    borderBottomWidth: 4, borderRightWidth: 4, borderColor: '#2F6FED',
    borderBottomRightRadius: 16,
  },
  scannerRedLine: {
    position: 'absolute',
    top: '30%',
    left: '10%',
    right: '10%',
    height: 2,
    backgroundColor: '#EF4444',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  gridPlaceholder: {
    opacity: 0.5,
  },
  scanAreaText: {
    position: 'absolute',
    bottom: 30,
    color: '#809CD1',
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});
