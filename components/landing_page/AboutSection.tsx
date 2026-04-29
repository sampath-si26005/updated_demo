/**
 * AboutSection.tsx
 * 
 * This component contains the information about the Smart Trolley system.
 * It displays descriptive text explaining the purpose of the initiative 
 * and operational details.
 */
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function AboutSection() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.label}>ABOUT</Text>
        <Text style={styles.headline}>Enhancing Your Airport Experience</Text>
      </View>

      <ScrollView contentContainerStyle={styles.contentWrapper} showsVerticalScrollIndicator={false}>
        <Text style={styles.paragraph}>
          Welcome to the new era of travel at Chennai International Airport. Our Smart Trolley system is a state-of-the-art innovation designed to make your journey smoother, faster, and completely stress-free.
        </Text>
        
        <Text style={styles.paragraph}>
          Powered by real-time indoor positioning and integrated directly with global flight data networks, this system offers personalized turn-by-turn navigation directly to your boarding gate. Whether you are searching for premium duty-free shopping, diverse dining options, or simply a place to relax, the interactive map simplifies airport navigation.
        </Text>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statBig}>100%</Text>
            <Text style={styles.statLabel}>Free to Use</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statBig}>24/7</Text>
            <Text style={styles.statLabel}>Live Support</Text>
          </View>
        </View>

        <Text style={styles.footerText}>
          A joint initiative to bring smart terminal capabilities directly to your fingertips.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1, 
    backgroundColor: '#ffffff', 
    paddingVertical: 60,
    paddingHorizontal: 40,
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  label: {
    color: '#2F6FED', 
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 20,
  },
  headline: {
    color: '#0A1F44', 
    fontSize: 46,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contentWrapper: {
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  paragraph: {
    color: '#4B5563',
    fontSize: 22,
    lineHeight: 34,
    textAlign: 'center',
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 60,
    marginTop: 40,
    marginBottom: 40,
  },
  statBox: {
    alignItems: 'center',
    backgroundColor: '#E8F1FF',
    padding: 30,
    borderRadius: 16,
    minWidth: 200,
  },
  statBig: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2F6FED',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 18,
    color: '#0A1F44',
    fontWeight: '600',
  },
  footerText: {
    color: '#9CA3AF',
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
  },
});
