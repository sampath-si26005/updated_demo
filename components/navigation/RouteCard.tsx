import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

interface RouteCardProps {
  time: string;
  gateNumber: string;
  onCancel: () => void;
}

export default function RouteCard({ time, gateNumber, onCancel }: RouteCardProps) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.mainSection}>
        <View style={styles.leftContent}>
          <FontAwesome5 name="walking" size={32} color="#E2E8F0" style={styles.walkIcon} />
          <View>
            <Text style={styles.arrivingText}>Arriving in</Text>
            <Text style={styles.timeText}>{time}</Text>
          </View>
        </View>
        
        <View style={styles.gateSection}>
          <Text style={styles.gateLabel}>Gate</Text>
          <Text style={styles.gateNumber}>{gateNumber}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.bottomStrip} activeOpacity={0.8} onPress={onCancel}>
        <View style={styles.cancelIconContainer}>
          <Ionicons name="close" size={20} color="#FFF" />
        </View>
        <Text style={styles.cancelText}>CANCEL THIS ROUTE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    width: 380, // wide enough to look good on tablet
    backgroundColor: '#1E1E1E', // Base for shadow
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
  mainSection: {
    backgroundColor: '#2F855A', // Green background
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walkIcon: {
    marginRight: 16,
  },
  arrivingText: {
    color: '#E2E8F0',
    fontSize: 16,
    fontWeight: '500',
  },
  timeText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
    marginTop: 2,
  },
  gateSection: {
    alignItems: 'flex-end',
    borderLeftWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    paddingLeft: 24,
  },
  gateLabel: {
    color: '#E2E8F0',
    fontSize: 14,
    fontWeight: '500',
  },
  gateNumber: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '800',
    lineHeight: 40,
  },
  bottomStrip: {
    backgroundColor: '#1A202C', // Black strip
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  cancelIconContainer: {
    backgroundColor: '#E53E3E', // Red background for icon
    borderRadius: 6,
    padding: 2,
    marginRight: 12,
  },
  cancelText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
});
