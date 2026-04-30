import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

interface BottomNavProps {
  onNavPress?: (id: string) => void;
  activeId?: string;
}

export default function BottomNav({ onNavPress, activeId }: BottomNavProps) {
  const navItems = [
    { id: 'search', icon: 'search', label: 'Search', type: 'ionicons' },
    { id: 'games', icon: 'game-controller-outline', label: 'Mini-Games', type: 'ionicons' },
    { id: 'restrooms', icon: 'wc', label: 'Restrooms', type: 'material' },
    { id: 'food', icon: 'restaurant-outline', label: 'Food', type: 'ionicons' },
    { id: 'shopping', icon: 'cart-outline', label: 'Shopping', type: 'ionicons' },
    { id: 'help', icon: 'help-circle-outline', label: 'Helpdesk', type: 'ionicons' },
    { id: 'lounges', icon: 'cafe-outline', label: 'Lounges', type: 'ionicons' },
    { id: 'exit', icon: 'exit-outline', label: 'Exit', type: 'ionicons' },
  ];

  return (
    <View style={styles.container}>
      {navItems.map((item) => {
        const isActive = activeId === item.id;
        // Make the exit button stand out slightly by not treating it like normal active tabs,
        // or just use a distinct color.
        let color = isActive ? '#FFFFFF' : '#A0AEC0';
        if (item.id === 'exit') {
          color = '#FC8181'; // Reddish color for exit
        }
        return (
          <TouchableOpacity 
            key={item.id} 
            style={[styles.navItem, isActive && styles.activeNavItem]} 
            activeOpacity={0.7}
            onPress={() => onNavPress && onNavPress(item.id)}
          >
            {item.type === 'ionicons' ? (
              <Ionicons name={item.icon as any} size={28} color={color} />
            ) : (
              <MaterialIcons name={item.icon as any} size={28} color={color} />
            )}
            <Text style={[
              styles.navLabel, 
              isActive && styles.activeNavLabel,
              item.id === 'exit' && { color: '#FC8181' }
            ]}>{item.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 90,
    backgroundColor: '#0B2A4A', // Same as top header
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10, // Accounts for bottom safe area slightly
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  navLabel: {
    color: '#E2E8F0',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 6,
  },
});
