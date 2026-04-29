/**
 * Header.tsx
 * 
 * This component acts as the global top navigation bar.
 * It displays the Airport's branding text and a live, updating clock
 * to keep the user informed of the current time.
 */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header() {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title} numberOfLines={1}>Chennai International Airport</Text>
      <Text style={styles.time}>{timeStr}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: '#0B2A4A',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '600',
    flex: 1, // ensure it shrinks instead of pushing time out if it gets too long
    marginRight: 20,
  },
  time: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 22,
    fontWeight: '500',
  }
});
