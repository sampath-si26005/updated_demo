import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Promotion } from '../../../mock/promotions';

interface PromotionCardProps {
  promotion: Promotion;
  onPress?: () => void;
}

export default function PromotionCard({ promotion, onPress }: PromotionCardProps) {
  return (
    <TouchableOpacity 
      style={styles.card} 
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Image source={promotion.image} style={styles.image} resizeMode="cover" />
      
      {/* Overlay to simulate gradient for readable text */}
      <View style={styles.overlay} />

      {/* Optional Badge */}
      {promotion.tag && (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{promotion.tag.toUpperCase()}</Text>
        </View>
      )}

      {/* Bottom Text Content */}
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>{promotion.title}</Text>
        <View style={styles.footerRow}>
          <Text style={styles.subtitle}>{promotion.subtitle}</Text>
          <View style={styles.ctaContainer}>
            <Text style={styles.ctaText}>View Offer</Text>
            <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    // Elevation for Android
    elevation: 4,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 180,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    top: 60, // Start darkening slightly lower
  },
  badgeContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#E53E3E',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.5)', // Dark at bottom
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#E2E8F0',
    flex: 1,
  },
  ctaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ctaText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
