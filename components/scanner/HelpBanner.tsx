import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HelpBanner() {
  return (
    <View style={styles.bannerContainer}>
      <Text style={styles.bannerSubtitle}>Need assistance?</Text>
      <Text style={styles.bannerTitle}>We're here to help</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bannerContainer: {
    backgroundColor: '#1E51C9', // Matching the vivid blue in the screenshot
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerSubtitle: {
    color: '#A5C0F3', // Light blue tint
    fontSize: 18,
    marginBottom: 8,
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
});
