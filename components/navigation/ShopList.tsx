import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Platform, Alert } from 'react-native';
import { nearbyShops, Shop } from '@/mock/shops';
import ShopItem from './ShopItem';

export default function ShopList() {
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);

  const handleShopPress = (shop: Shop) => {
    setSelectedShopId(shop.id);
    
    const message = `Navigating to ${shop.name}`;
    if (Platform.OS === 'web') {
      window.alert(message);
    } else {
      Alert.alert("Curated Dining", message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Curated Dining</Text>
        <Text style={styles.headerSubtitle}>Exceptional culinary experiences</Text>
      </View>
      <ScrollView 
        style={styles.listContainer} 
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {nearbyShops.map((shop) => (
          <ShopItem
            key={shop.id}
            shop={shop}
            isSelected={selectedShopId === shop.id}
            onPress={() => handleShopPress(shop)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F5F2', // Warm off-white
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 32,
  },
  headerTitle: {
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    fontSize: 32,
    color: '#1A1A1A',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
    fontSize: 15,
    color: '#718096',
    letterSpacing: 0.5,
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 80,
  },
});
