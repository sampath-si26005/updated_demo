import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Lounge } from '../../../mock/lounges';

interface LoungeCardProps {
  lounge: Lounge;
  isSelected?: boolean;
  onPress?: () => void;
}

export default function LoungeCard({ lounge, isSelected, onPress }: LoungeCardProps) {
  return (
    <TouchableOpacity 
      style={[styles.card, isSelected && styles.cardSelected]} 
      activeOpacity={0.8}
      onPress={onPress}
    >
      {lounge.imageUrl && (
        <Image source={{ uri: lounge.imageUrl }} style={styles.itemImage} resizeMode="cover" />
      )}
      <View style={styles.imageOverlay} />
      
      <View style={styles.itemContentOverlay}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemName}>{lounge.name}</Text>
          <Text style={styles.itemDistance}>{lounge.distance}</Text>
        </View>
        
        <View style={styles.itemFooterRow}>
          <Text style={styles.itemCategory}>{lounge.category}</Text>
          <View style={styles.badgeContainer}>
            <View style={[
              styles.statusBadge,
              lounge.status === 'Open' ? styles.statusOpen : 
              lounge.status === 'Closing Soon' ? styles.statusClosing : styles.statusClosed
            ]}>
              <Text style={styles.statusText}>{lounge.status}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    height: 200,
    backgroundColor: '#000',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardSelected: {
    borderColor: '#C9A96E',
  },
  itemImage: {
    width: '100%',
    height: '100%',
    opacity: 0.85,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  itemContentOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  itemName: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 22,
    color: '#FFFFFF',
    flex: 1,
    marginRight: 10,
  },
  itemDistance: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    color: '#E2E8F0',
  },
  itemFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemCategory: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: '#CBD5E0',
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  statusOpen: {
    backgroundColor: 'rgba(72, 187, 120, 0.25)',
  },
  statusClosing: {
    backgroundColor: 'rgba(237, 137, 54, 0.25)',
  },
  statusClosed: {
    backgroundColor: 'rgba(245, 101, 101, 0.25)',
  },
  statusText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 10,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
});
