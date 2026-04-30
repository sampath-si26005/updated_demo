import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Shop } from '@/mock/shops';

interface ShopItemProps {
  shop: Shop;
  isSelected: boolean;
  onPress: () => void;
}

export default function ShopItem({ shop, isSelected, onPress }: ShopItemProps) {
  return (
    <TouchableOpacity 
      style={[styles.container, isSelected && styles.selectedContainer]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.infoContainer}>
        <Text style={[styles.nameText, isSelected && styles.selectedText]}>{shop.name}</Text>
        <Text style={[styles.categoryText, isSelected && styles.selectedText]}>{shop.category}</Text>
      </View>
      <View style={styles.distanceContainer}>
        <Text style={[styles.distanceText, isSelected && styles.selectedText]}>{shop.distance}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginVertical: 6,
    borderRadius: 16, // lg/xl rounded corners
    borderWidth: 1,
    borderColor: '#F0F2F5', // lighter border
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06, // Soft shadow
    shadowRadius: 10,
    elevation: 3,
  },
  selectedContainer: {
    borderColor: '#5E81AC',
    backgroundColor: '#F5F7FA',
    borderWidth: 2,
    shadowOpacity: 0.1,
  },
  infoContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 18,
    fontWeight: '700', // Bold place name
    color: '#1A202C', // Very dark for high contrast
    marginBottom: 4,
  },
  categoryText: {
    fontSize: 14,
    color: '#718096', // Lighter text for category
    fontWeight: '500',
  },
  distanceContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: 16,
  },
  distanceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3182CE', // Blue color but slightly lighter than place name
  },
  selectedText: {
    color: '#1A202C',
  },
});
