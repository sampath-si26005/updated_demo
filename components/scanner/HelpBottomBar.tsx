import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HelpBottomBar() {
  const router = useRouter();

  return (
    <View style={styles.bottomBar}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Feather name="chevron-left" size={20} color="#111827" />
        <Text style={styles.backButtonText}>Back to scanner</Text>
      </Pressable>
      
      <Text style={styles.trolleyText}>Trolley #14</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    paddingHorizontal: 40,
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  trolleyText: {
    fontSize: 16,
    color: '#4B5563',
  },
});
