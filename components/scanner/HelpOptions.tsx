import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function HelpOptions() {
  return (
    <View style={styles.optionsContainer}>
      <Pressable style={styles.card}>
        <View style={[styles.iconBox, { backgroundColor: '#FCE8E8' }]}>
          <Feather name="user" size={32} color="#EF4444" />
        </View>
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>Call staff</Text>
          <Text style={styles.cardSubtitle}>A staff member will come to your trolley</Text>
        </View>
        <Feather name="chevron-right" size={24} color="#6B7280" />
      </Pressable>

      <Pressable style={styles.card}>
        <View style={[styles.iconBox, { backgroundColor: '#E8F1FF' }]}>
          <Feather name="search" size={32} color="#1E51C9" />
        </View>
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>Find my flight</Text>
          <Text style={styles.cardSubtitle}>Search using PNR or flight number</Text>
        </View>
        <Feather name="chevron-right" size={24} color="#6B7280" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  optionsContainer: {
    paddingHorizontal: 40,
    paddingVertical: 30,
    flex: 1,
    backgroundColor: '#F9FAFB', // very light gray background like in screenshot
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 24,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 18,
    color: '#4B5563',
  },
});
