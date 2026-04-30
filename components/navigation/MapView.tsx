import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RouteCard from './RouteCard';
import { useRouter } from 'expo-router';

export default function MapView() {
  const router = useRouter();

  // Create an array to map over for grid blocks
  const gridBlocks = Array.from({ length: 15 });

  const handleCancelRoute = () => {
    // Navigate back to the gate screen or home
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  return (
    <View style={styles.container}>
      {/* Grid-style blocks to simulate map layout */}
      <View style={styles.gridContainer}>
        {gridBlocks.map((_, index) => (
          <View key={index} style={styles.gridBlock} />
        ))}
      </View>

      {/* Dark Route Line - SVG or View borders. We use View to keep it simple & robust. */}
      {/* Vertical part */}
      <View style={[styles.routePath, styles.routeVertical1]} />
      {/* Horizontal part */}
      <View style={[styles.routePath, styles.routeHorizontal]} />
      {/* Final Vertical part */}
      <View style={[styles.routePath, styles.routeVertical2]} />

      {/* User Location with Directional Arrow */}
      <View style={[styles.marker, styles.userMarker]}>
        <Ionicons name="navigate" size={24} color="#FFFFFF" style={styles.arrowIcon} />
      </View>
      
      {/* Destination / Gate Location */}
      <View style={[styles.marker, styles.destinationMarker]}>
        <View style={styles.destinationDot} />
      </View>

      {/* Floating Route Card */}
      <RouteCard time="12 minutes" gateNumber="31" onCancel={handleCancelRoute} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC', // Background behind blocks
    position: 'relative',
    overflow: 'hidden',
  },
  gridContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  gridBlock: {
    width: '30%',
    height: '18%',
    backgroundColor: '#E2E8F0', // Light grey blocks
    borderRadius: 8,
    marginBottom: '2%',
  },
  // Route paths
  routePath: {
    position: 'absolute',
    backgroundColor: '#1A202C', // Dark line
    borderRadius: 4,
  },
  routeVertical1: {
    left: '20%',
    bottom: '25%',
    width: 6,
    height: '35%',
  },
  routeHorizontal: {
    left: '20%',
    bottom: '60%',
    height: 6,
    width: '50%',
  },
  routeVertical2: {
    left: '70%',
    bottom: '30%',
    width: 6,
    height: '30%',
  },
  // Markers
  marker: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  userMarker: {
    left: '20%',
    bottom: '25%',
    transform: [{ translateX: -19 }, { translateY: 19 }], // Center it on the path
    width: 44,
    height: 44,
    backgroundColor: '#3182CE', // Blue marker
    borderRadius: 22,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  arrowIcon: {
    transform: [{ rotate: '0deg' }, { translateY: -2 }, { translateX: 2 }], // Point up
  },
  destinationMarker: {
    left: '70%',
    bottom: '30%',
    transform: [{ translateX: -9 }, { translateY: 9 }],
    width: 24,
    height: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 4,
    borderColor: '#1A202C',
  },
  destinationDot: {
    width: 8,
    height: 8,
    backgroundColor: '#1A202C',
    borderRadius: 4,
  },
});
