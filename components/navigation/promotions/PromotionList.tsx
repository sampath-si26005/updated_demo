import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { promotions, Promotion } from '../../../mock/promotions';
import PromotionCard from './PromotionCard';

export default function PromotionList() {
  const handlePromoPress = (promo: Promotion) => {
    const message = `Opening offer: ${promo.title}`;
    if (Platform.OS === 'web') {
      window.alert(message);
    } else {
      Alert.alert("Offer Selected", message);
    }
  };

  return (
    <View style={styles.container}>
      {/* List content */}
      <ScrollView style={styles.listContainer} contentContainerStyle={styles.listContent}>
        {promotions.map((promo) => (
          <PromotionCard
            key={promo.id}
            promotion={promo}
            onPress={() => handlePromoPress(promo)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    color: '#A0AEC0',
  },
  activeTabText: {
    color: '#2B6CB0',
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
