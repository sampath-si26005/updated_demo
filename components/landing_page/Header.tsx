/**
 * Header.tsx — Premium dark navy header with gold accent line + live clock.
 * Functionality unchanged: displays airport name + live time.
 */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';

export default function Header() {
  const [timeStr, setTimeStr] = useState('');

  const router = useRouter();
  const pathname = usePathname();
  const isInitialScreen = pathname === '/' || pathname === '/index';

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
        
        <View style={styles.rightSection}>
          <Text style={styles.clock}>{timeStr}</Text>
          {!isInitialScreen && (
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
              <View style={styles.backArrowCircle}>
                <Ionicons name="arrow-back" size={16} color="#C9A96E" />
              </View>
            </TouchableOpacity>
          )}
        </View>
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
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  backBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrowCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(201, 169, 110, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
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
