import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Animated, Platform } from 'react-native';
import { Shop } from '@/mock/shops';

interface ShopItemProps {
  shop: Shop;
  isSelected: boolean;
  onPress: () => void;
}

export default function ShopItem({ shop, isSelected, onPress }: ShopItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.wrapper, { opacity: fadeAnim }]}>
      <TouchableOpacity 
        style={styles.container} 
        onPress={onPress}
        activeOpacity={0.9}
        {...(Platform.OS === 'web' ? {
          onMouseEnter: () => setIsHovered(true),
          onMouseLeave: () => setIsHovered(false),
        } : {})}
      >
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: shop.image }} 
            style={[styles.image, isHovered && Platform.OS === 'web' && { transform: [{ scale: 1.02 }] }]} 
            resizeMode="cover"
          />
          <View style={styles.imageOverlay} />
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.nameText}>{shop.name}</Text>
          <Text style={styles.categoryText}>{shop.category.toUpperCase()}</Text>
          <Text style={styles.descriptionText} numberOfLines={2}>{shop.description}</Text>
          
          <View style={styles.metadataRow}>
            <Text style={styles.metadataText}>{shop.location}</Text>
            <View style={styles.dot} />
            <Text style={styles.metadataText}>{shop.timing}</Text>
          </View>

          <View style={styles.ctaContainer}>
            <Text style={[styles.ctaText, isHovered && styles.ctaTextHovered]}>
              View Menu
            </Text>
            <Text style={[styles.ctaArrow, isHovered && styles.ctaArrowHovered]}>→</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.divider} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 48,
  },
  container: {
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#E2E8F0',
  },
  image: {
    width: '100%',
    height: '100%',
    ...(Platform.OS === 'web' ? {
      transition: 'transform 0.4s ease-out',
    } : {}),
  } as any,
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.02)',
  },
  contentContainer: {
    paddingHorizontal: 4,
  },
  nameText: {
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    fontSize: 28,
    color: '#1A1A1A',
    marginBottom: 4,
  },
  categoryText: {
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
    fontSize: 11,
    letterSpacing: 1.5,
    color: '#718096',
    marginBottom: 12,
    fontWeight: '600',
  },
  descriptionText: {
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
    fontSize: 15,
    color: '#4A5568',
    lineHeight: 22,
    marginBottom: 16,
  },
  metadataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  metadataText: {
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
    fontSize: 13,
    color: '#718096',
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#CBD5E0',
    marginHorizontal: 8,
  },
  ctaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ctaText: {
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
    fontSize: 14,
    color: '#718096',
    fontWeight: '500',
    marginRight: 6,
    ...(Platform.OS === 'web' ? {
      transition: 'color 0.2s ease',
    } : {}),
  } as any,
  ctaTextHovered: {
    color: '#1A1A1A',
  },
  ctaArrow: {
    fontSize: 14,
    color: '#718096',
    ...(Platform.OS === 'web' ? {
      transition: 'transform 0.2s ease, color 0.2s ease',
    } : {}),
  } as any,
  ctaArrowHovered: {
    color: '#1A1A1A',
    transform: [{ translateX: 4 }],
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginTop: 40,
    opacity: 0.5,
  }
});
