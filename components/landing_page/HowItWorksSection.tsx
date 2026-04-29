/**
 * HowItWorksSection.tsx
 * 
 * This component renders a step-by-step guide explaining how to use
 * the smart trolley. It likely includes an image carousel or a list
 * of instructional steps for the user.
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HowItWorksSection() {
  return (
    <View style={styles.container}>
      {/* Top Content */}
      <View style={styles.headerContainer}>
        <Text style={styles.label}>HOW IT WORKS</Text>
        <Text style={styles.headline}>Three steps to navigate with confidence</Text>
      </View>

      {/* Steps Section */}
      <View style={styles.stepsWrapper}>
        {/* The connecting horizontal line */}
        <View style={styles.connectingLine} />

        {/* Step 1 */}
        <View style={styles.stepColumn}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>1</Text>
          </View>
          <Text style={styles.stepTitle}>Pick up a trolley</Text>
          <Text style={styles.stepDescription}>
            Find any Smart Trolley at the baggage belt or terminal entrance. The screen activates automatically.
          </Text>
        </View>

        {/* Step 2 */}
        <View style={styles.stepColumn}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>2</Text>
          </View>
          <Text style={styles.stepTitle}>Tap 'Start Now'</Text>
          <Text style={styles.stepDescription}>
            Enter your flight number or browse the interactive terminal map to find exactly where you need to go.
          </Text>
        </View>

        {/* Step 3 */}
        <View style={styles.stepColumn}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
          <Text style={styles.stepTitle}>Follow your map</Text>
          <Text style={styles.stepDescription}>
            Live directions guide you to your gate. Flight alerts keep you informed every step of the way.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1, 
    backgroundColor: '#ffffff', // Clean white background
    paddingVertical: 60,
    paddingHorizontal: 40,
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  label: {
    color: '#2F6FED', // Vibrant Blue
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 20,
  },
  headline: {
    color: '#0A1F44', // Dark blue text
    fontSize: 46,
    fontWeight: 'bold',
  },
  stepsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    position: 'relative',
    marginTop: 20,
  },
  connectingLine: {
    position: 'absolute',
    top: 25, 
    left: '16%', 
    right: '16%',
    height: 2,
    backgroundColor: '#E2E8F0', // Light gray structural border
    zIndex: 0,
  },
  stepColumn: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 1, 
  },
  badge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E8F1FF', // Light blue background for badge
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 2,
    borderColor: '#2F6FED', // Solid blue outline
  },
  badgeText: {
    color: '#2F6FED', // Blue text
    fontSize: 24,
    fontWeight: 'bold',
  },
  stepTitle: {
    color: '#0A1F44', // Dark blue
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  stepDescription: {
    color: '#4B5563', // Standard gray for readability
    fontSize: 20,
    lineHeight: 30,
    textAlign: 'center',
  },
});
