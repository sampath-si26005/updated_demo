import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Platform, Alert, TouchableOpacity } from 'react-native';
import { nearbyShops, Shop } from '@/mock/shops';
import ShopItem from './ShopItem';

export default function ShopList() {
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'nearby' | 'deals'>('nearby');

  const handleShopPress = (shop: Shop) => {
    setSelectedShopId(shop.id);
    
    // Show feedback as requested
    const message = `Stop added for ${shop.name}`;
    if (Platform.OS === 'web') {
      window.alert(message);
    } else {
      Alert.alert("Stop Added", message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Tabs Header */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'nearby' && styles.activeTab]}
          onPress={() => setActiveTab('nearby')}
        >
          <Text style={[styles.tabText, activeTab === 'nearby' && styles.activeTabText]}>Nearby</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'deals' && styles.activeTab]}
          onPress={() => setActiveTab('deals')}
        >
          <Text style={[styles.tabText, activeTab === 'deals' && styles.activeTabText]}>Deals</Text>
        </TouchableOpacity>
      </View>
      
      {/* List content */}
      <ScrollView style={styles.listContainer} contentContainerStyle={styles.listContent}>
        {activeTab === 'nearby' ? (
          nearbyShops.slice(0, 5).map((shop) => (
            <ShopItem
              key={shop.id}
              shop={shop}
              isSelected={selectedShopId === shop.id}
              onPress={() => handleShopPress(shop)}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No deals available right now.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // White background as requested
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#E2E8F0',
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderColor: 'transparent',
  },
  activeTab: {
    borderColor: '#3182CE',
  },
  tabText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#A0AEC0', // inactive tab text color
  },
  activeTabText: {
    color: '#2B6CB0', // active tab text color
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },
  emptyState: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#718096',
  }
});
