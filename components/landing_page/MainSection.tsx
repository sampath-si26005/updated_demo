/**
 * MainSection.tsx — Premium hero. Image left, content right.
 * FUNCTIONALITY UNCHANGED: "Start Now" → router.push('/scanner')
 * Only visual polish applied.
 */
import React, { useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, Pressable, Image, Animated, Easing,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

function useFadeIn(delay = 0) {
  const opacity    = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(16)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity,    { toValue: 1, duration: 800, delay, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 800, delay, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();
  }, []);
  return { opacity, transform: [{ translateY }] };
}

export default function MainSection() {
  const router = useRouter();

  const imgAnim  = useFadeIn(0);
  const txtAnim  = useFadeIn(240);
  const ctaAnim  = useFadeIn(440);

  return (
    <View style={styles.container}>

      {/* ── LEFT: Image ─────────────────────────────────────────── */}
      <Animated.View style={[styles.leftCol, imgAnim]}>
        <View style={styles.imgShadow}>
          <View style={styles.imgClip}>
            <Image
              source={require('../../assets/images/hero_lounge.png')}
              style={styles.img}
            />
          </View>
        </View>
      </Animated.View>

      {/* ── RIGHT: Content ──────────────────────────────────────── */}
      <View style={styles.rightCol}>

        <Animated.View style={txtAnim}>
          {/* Eyebrow Removed */}

          {/* Headline — Playfair Display serif */}
          <Text style={styles.headline}>
            Navigate Your{'\n'}
            <Text style={styles.headlineItalic}>Airport Smarter</Text>
          </Text>

          {/* Body */}
          <Text style={styles.body}>
            Real-time flight updates, premium food,{'\n'}
            luxury shopping &amp; seamless navigation.
          </Text>
        </Animated.View>

        {/* ── CTA: "Start Now" — SAME functionality as original ── */}
        <Animated.View style={ctaAnim}>
          <Pressable
            style={({ pressed }) => [
              styles.ctaWrap,
              pressed && styles.ctaPressed,
            ]}
            onPress={() => router.push('/scanner')}
          >
            <LinearGradient
              colors={['#1E3A5F', '#0D1F35']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.ctaGradient}
            >
              <Text style={styles.ctaText}>Start Now</Text>
              <View style={styles.ctaArrowCircle}>
                <Text style={styles.ctaArrow}>→</Text>
              </View>
            </LinearGradient>
          </Pressable>
        </Animated.View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F4F1EC',
    paddingHorizontal: 40,
    paddingTop: 36,
    paddingBottom: 28,
    gap: 44,
  },

  /* Left */
  leftCol: {
    flex: 55,
    paddingTop: 20,
  },
  imgShadow: {
    flex: 1,
    borderRadius: 10,
    shadowColor: '#2C1F0E',
    shadowOffset: { width: 4, height: 20 },
    shadowOpacity: 0.15,
    shadowRadius: 36,
    elevation: 12,
    backgroundColor: '#F4F1EC',
  },
  imgClip: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  /* Right */
  rightCol: {
    flex: 45,
    justifyContent: 'center',
    paddingLeft: 12,
    paddingBottom: 16,
  },

  /* Headline */
  headline: {
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#0D1F35',
    fontSize: 54,
    lineHeight: 60,
    marginBottom: 20,
  },
  headlineItalic: {
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#0D1F35',
    fontStyle: 'italic',
  },

  /* Body */
  body: {
    fontFamily: 'Inter_400Regular',
    color: '#5C6370',
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 40,
  },

  /* CTA — refined navy (same onPress functionality) */
  ctaWrap: {
    alignSelf: 'flex-start',
    borderRadius: 8,
    shadowColor: '#0D1F35',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 8,
  },
  ctaPressed: {
    transform: [{ translateY: -2 }],
    shadowOpacity: 0.35,
  },
  ctaGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 16,
    paddingHorizontal: 36,
    borderRadius: 8,
  },
  ctaText: {
    fontFamily: 'Inter_600SemiBold',
    color: '#EDE9E3',
    fontSize: 17,
    letterSpacing: 0.3,
  },
  ctaArrowCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(201, 169, 110, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaArrow: {
    color: '#C9A96E',
    fontSize: 14,
  },
});
