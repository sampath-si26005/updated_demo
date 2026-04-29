import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface ScannerBottomBarProps {
  onOpenSearch: () => void;
}

export default function ScannerBottomBar({ onOpenSearch }: ScannerBottomBarProps) {
  const router = useRouter();

  return (
    <View style={styles.bottomBar}>
      <View style={styles.bottomLeft}>
        <Text style={styles.troubleText}>Trouble scanning?</Text>
        <Pressable style={styles.actionButton} onPress={onOpenSearch}>
          <Feather name="search" size={20} color="#333" />
          <Text style={styles.actionButtonText}>Find your flight here</Text>
        </Pressable>
      </View>
      
      <View style={styles.bottomRight}>
        <Pressable style={styles.actionButton} onPress={() => router.push('/help')}>
          <Feather name="help-circle" size={20} color="#333" />
          <Text style={styles.actionButtonText}>Help</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  troubleText: {
    fontSize: 16,
    color: '#4B5563',
    marginRight: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  actionButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  bottomRight: {
    flexDirection: 'row',
  }
});


