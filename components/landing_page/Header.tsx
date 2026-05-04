/**
 * Header.tsx — Premium dark navy header with gold accent line + live clock.
 * Functionality unchanged: displays airport name + live time.
 */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header() {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <View style={styles.wrap}>
      {/* Top gold rule — luxury detail */}
      <View style={styles.goldLine} />
      <View style={styles.bar}>
        <View style={styles.brandRow}>
          <View style={styles.dot} />
          <Text style={styles.brand}>Chennai International Airport</Text>
        </View>
        <Text style={styles.clock}>{timeStr}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#0D1F35',
  },
  goldLine: {
    height: 2,
    backgroundColor: '#C9A96E',
    opacity: 0.8,
  },
  bar: {
    height: 70, // Increased by ~10% from 64
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#C9A96E',
  },
  brand: {
    fontFamily: 'Inter_600SemiBold',
    color: '#EDE9E3',
    fontSize: 16,
    letterSpacing: 0.3,
  },
  clock: {
    fontFamily: 'Inter_600SemiBold',
    color: 'rgba(237, 233, 227, 0.7)',
    fontSize: 20,
    letterSpacing: 1,
  },
});
