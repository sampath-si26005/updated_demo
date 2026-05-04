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
    <View style={styles.wrapper}>
      {/* Top gold accent rule matching FeatureBar */}
      <View style={styles.topRule} />
      
      <View style={styles.container}>
        {navItems.map((item) => {
          const isActive = activeId === item.id;
          
          // Use #4B5563 (Dark Gray) for much better contrast and premium readability
          let iconColor = isActive ? '#FFFFFF' : '#4B5563'; 
          let bgColor = isActive ? '#0D1F35' : 'transparent'; // Premium Navy for active pill

          if (item.id === 'exit') {
            iconColor = isActive ? '#FFFFFF' : '#EF4444'; // Use solid red for exit even when inactive for clarity
            bgColor = isActive ? '#8E2828' : 'transparent';
          }
          return (
            <TouchableOpacity 
              key={item.id} 
              style={[styles.navItem, { backgroundColor: bgColor }]} 
              activeOpacity={0.6}
              onPress={() => onNavPress && onNavPress(item.id)}
            >
              {item.type === 'ionicons' ? (
                <Ionicons name={item.icon as any} size={24} color={iconColor} />
              ) : (
                <MaterialIcons name={item.icon as any} size={24} color={iconColor} />
              )}
              <Text style={[
                styles.navLabel, 
                isActive && styles.activeNavLabel,
                !isActive && { color: iconColor }
              ]}>{item.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EAE6DF',
    shadowColor: '#1A1A1A',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 12,
  },
  topRule: {
    height: 2,
    backgroundColor: '#C9A96E',
    opacity: 0.4,
  },
  container: {
    height: 86,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 8,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 16, // Pill shape
    minWidth: 70,
  },
  navLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12, // Increased for better legibility
    marginTop: 4,
    letterSpacing: 0.2,
  },
  activeNavLabel: {
    color: '#FFFFFF', // Selected text color inside navy pill
  },
});
