import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Restroom, FacilityType } from '@/mock/restrooms';

interface RestroomCardProps {
  restroom: Restroom;
  isSelected?: boolean;
  onPress: () => void;
}

export default function RestroomCard({ restroom, isSelected, onPress }: RestroomCardProps) {
  const getFacilityIcon = (facility: FacilityType) => {
    switch (facility) {
      case 'male': return 'man-outline';
      case 'female': return 'woman-outline';
      case 'accessible': return 'body-outline';
      default: return 'ellipse-outline';
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.card, isSelected && styles.selectedCard]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.topRow}>
        <Text style={styles.name}>{restroom.name}</Text>
        <Text style={styles.distance}>{restroom.distance}m</Text>
      </View>
      
      <View style={styles.bottomRow}>
        <View style={styles.facilities}>
          {restroom.facilities.map((fac, idx) => (
            <View key={idx} style={styles.iconWrapper}>
              <Ionicons name={getFacilityIcon(fac) as any} size={20} color="#4A5568" />
            </View>
          ))}
        </View>

        <View style={styles.statusWrapper}>
          <View style={[styles.statusDot, restroom.status === 'available' ? styles.dotAvailable : styles.dotBusy]} />
          <Text style={[styles.statusText, restroom.status === 'available' ? styles.textAvailable : styles.textBusy]}>
            {restroom.status === 'available' ? 'Available' : 'Busy'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  selectedCard: {
    borderColor: '#3182CE',
    borderWidth: 2,
    backgroundColor: '#EBF8FF',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D3748',
  },
  distance: {
    fontSize: 16,
    fontWeight: '600',
    color: '#718096',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  facilities: {
    flexDirection: 'row',
  },
  iconWrapper: {
    backgroundColor: '#EDF2F7',
    borderRadius: 8,
    padding: 6,
    marginRight: 8,
  },
  statusWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  dotAvailable: {
    backgroundColor: '#48BB78',
  },
  dotBusy: {
    backgroundColor: '#F56565',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  textAvailable: {
    color: '#48BB78',
  },
  textBusy: {
    color: '#F56565',
  },
});
