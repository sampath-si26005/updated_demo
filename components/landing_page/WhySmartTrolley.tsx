/**
 * WhySmartTrolley.tsx
 * 
 * This component displays the "Why Smart Trolley" grid section.
 * It highlights the key benefits and features of the smart trolley 
 * (Live Map, Flight Info, Turn-by-Turn, etc.) using a responsive card layout.
 */
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const featuresData = [
  {
    icon: 'map-outline',
    title: 'Live Terminal Map',
    description: 'Instantly locate yourself and your gate on a fully interactive 3D map.',
  },
  {
    icon: 'airplane-outline',
    title: 'Flight Information',
    description: 'Get live updates on boarding times, gate changes, and delays instantly.',
  },
  {
    icon: 'navigate-outline',
    title: 'Turn-by-Turn Directions',
    description: 'Follow clear, visual directions directly to your destination without getting lost.',
  },
  {
    icon: 'flash-outline',
    title: 'Instant & Free',
    description: 'No downloads or logins required. It is 100% free for all Chennai passengers.',
  },
  {
    icon: 'bag-handle-outline',
    title: 'Shops & Dining',
    description: 'Browse nearby duty-free shops, lounges, and gourmet dining options.',
  },
  {
    icon: 'lock-closed-outline',
    title: 'Privacy First',
    description: 'Your flight details are cleared the moment your trolley is returned.',
  },
];

export default function WhySmartTrolley() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.label}>WHY SMART TROLLEY</Text>
        <Text style={styles.headline}>Everything you need to navigate the terminal</Text>
      </View>

      <View style={styles.gridContainer}>
        {featuresData.map((item, index) => (
          <Pressable 
            key={index}
            style={({ pressed }) => [
              styles.card,
              pressed && styles.cardPressed
            ]}
          >
            <View style={styles.iconWrapper}>
              <Ionicons name={item.icon as any} size={32} color="#2F6FED" />
            </View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: '#ffffff', // Clean white theme
    paddingVertical: 50,
    paddingHorizontal: 40,
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  label: {
    color: '#2F6FED', // Vibrant blue
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  headline: {
    color: '#0A1F44', // Dark blue contrast
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 20, 
  },
  card: {
    width: '31%', // Fits 3 columns
    backgroundColor: '#ffffff', // White card
    borderRadius: 20,
    padding: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1, // Softer shadow for white layout
    shadowRadius: 10, 
    borderColor: '#E2E8F0', // Soft bordering
    borderWidth: 1,
    marginBottom: 10,
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
    backgroundColor: '#F5F9FF', // Visual press feedback
  },
  iconWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#E8F1FF', // Light blue background
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#2F6FED', // Outlined properly
  },
  cardTitle: {
    color: '#0A1F44', // Dark blue
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  cardDescription: {
    color: '#4B5563', // Text gray
    fontSize: 18,
    lineHeight: 26,
  },
});
