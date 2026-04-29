/**
 * MainSection.tsx
 * 
 * This is the primary landing hero section of the application.
 * It prompts the user to scan their boarding pass to start navigation
 * and features a large, prominent call-to-action button.
 */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { useRouter } from 'expo-router';

const images = [
  'https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=2070&auto=format&fit=crop', // Lounge / Relaxing
  'https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=2070&auto=format&fit=crop', // Shopping / Duty Free
  'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2070&auto=format&fit=crop', // Food / Cafe
];

export default function MainSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = React.useRef(new Animated.Value(1)).current;
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0.1,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }).start();
      });
    }, 6000);
    return () => clearInterval(timer);
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      {/* 60% Width Left Column - Carousel */}
      <View style={styles.leftColumn}>
        <Animated.Image
          source={{ uri: images[currentIndex] }}
          style={[styles.carouselImage, { opacity: fadeAnim }]}
        />
      </View>

      {/* 40% Width Right Column - Content */}
      <View style={styles.rightColumn}>
        <View style={styles.contentWrapper}>
          <Text style={styles.headline}>Take this Smart Trolley for Free</Text>
          <Text style={styles.subtext}>Get real-time flight updates and navigation</Text>
          <Pressable 
            style={({ pressed }) => [styles.button, pressed && { opacity: 0.8 }]}
            onPress={() => router.push('/scanner')}
          >
            <Text style={styles.buttonText}>Start Now</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // Split Layout
  },
  leftColumn: {
    flex: 6, // 60%
    backgroundColor: '#E8F1FF',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  rightColumn: {
    flex: 4, // 40%
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  contentWrapper: {
    alignItems: 'flex-start',
    width: '100%',
  },
  headline: {
    color: '#0A1F44', // Dark blue Chennai airport contrast
    fontSize: 52,
    fontWeight: 'bold',
    marginBottom: 20,
    lineHeight: 60,
  },
  subtext: {
    color: '#4B5563',
    fontSize: 26,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#2F6FED', // Blue CTA
    paddingVertical: 20,
    paddingHorizontal: 54,
    borderRadius: 50,
    elevation: 6,
    shadowColor: '#2F6FED',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: 'bold',
  },
});
