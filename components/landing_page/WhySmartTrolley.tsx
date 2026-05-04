/**
 * WhySmartTrolley.tsx — "Features" section
 *
 * Split layout matching HowItWorks & About:
 *   LEFT  (67%) — Premium scrollable feature cards grid
 *   RIGHT (33%) — Promotion cards from promotions.ts
 *
 * Light theme, luxury editorial, rich scrollable experience.
 */
import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, Image, Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { promotions } from '../../mock/promotions';

// ── Palette ──────────────────────────────────────────────────────────────────
const BG       = '#F4F1EC';
const WHITE    = '#FFFFFF';
const NAVY     = '#0D1F35';
const CHARCOAL = '#111111';
const MUTED    = '#5C6370';
const GOLD     = '#B8922A';
const RULE     = '#E3DDD5';

// ── Feature data ─────────────────────────────────────────────────────────────
const featuresData = [
  {
    icon: 'map-outline' as const,
    title: 'Live Terminal Map',
    description: 'Instantly locate yourself and your gate on a fully interactive 3D map.',
  },
  {
    icon: 'airplane-outline' as const,
    title: 'Flight Information',
    description: 'Get live updates on boarding times, gate changes, and delays instantly.',
  },
  {
    icon: 'navigate-outline' as const,
    title: 'Turn-by-Turn Directions',
    description: 'Follow clear, visual directions directly to your destination without getting lost.',
  },
  {
    icon: 'flash-outline' as const,
    title: 'Instant & Free',
    description: 'No downloads or logins required. 100% free for all Chennai passengers.',
  },
  {
    icon: 'bag-handle-outline' as const,
    title: 'Shops & Dining',
    description: 'Browse nearby duty-free shops, lounges, and gourmet dining options.',
  },
  {
    icon: 'lock-closed-outline' as const,
    title: 'Privacy First',
    description: 'Your flight details are cleared the moment your trolley is returned.',
  },
];

export default function WhySmartTrolley() {
  return (
    <View style={styles.root}>

      {/* ══════════════════════════════════════════════════════════
          LEFT: Features grid — scrollable (67%)
      ══════════════════════════════════════════════════════════ */}
      <View style={styles.featuresPanel}>

        {/* Sticky header */}
        <View style={styles.featuresHeader}>
          <View style={styles.labelRow}>
            <View style={styles.labelDot} />
            <Text style={styles.sectionLabel}>FEATURES</Text>
          </View>
          <Text style={styles.sectionHeadline}>
            Everything you need to{'\n'}
            <Text style={styles.headlineAccent}>navigate the terminal</Text>
          </Text>
          <View style={styles.headlineRule} />
        </View>

        {/* Scrollable cards grid */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.grid}
        >
          {featuresData.map((item, index) => (
            <Pressable
              key={index}
              style={({ pressed }) => [
                styles.card,
                pressed && styles.cardPressed,
              ]}
            >
              {/* Icon */}
              <View style={styles.iconWrap}>
                <Ionicons name={item.icon} size={22} color={GOLD} />
              </View>

              {/* Text */}
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDesc}>{item.description}</Text>

              {/* Bottom gold rule on hover feel */}
              <View style={styles.cardAccentLine} />
            </Pressable>
          ))}
        </ScrollView>

      </View>

      {/* Vertical separator */}
      <View style={styles.vertSep} />

      {/* ══════════════════════════════════════════════════════════
          RIGHT: Promotions panel (33%) — same as other sections
      ══════════════════════════════════════════════════════════ */}
      <View style={styles.promoPanel}>
        <View style={styles.goldTop} />

        <View style={styles.promoInner}>
          <View style={styles.promoHeader}>
            <View style={styles.promoLabelRow}>
              <View style={styles.promoDot} />
              <Text style={styles.promoLabel}>TODAY'S OFFERS</Text>
            </View>
            <Text style={styles.promoTitle}>
              Curated{'\n'}
              <Text style={styles.promoTitleAccent}>for you.</Text>
            </Text>
            <View style={styles.promoRule} />
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.cardsContainer}
          >
            {promotions.map((promo) => (
              <View key={promo.id} style={styles.promoCard}>
                <View style={styles.cardImgWrap}>
                  <Image source={promo.image} style={styles.cardImg} />
                  {promo.tag && (
                    <View style={styles.tagBadge}>
                      <Text style={styles.tagText}>{promo.tag}</Text>
                    </View>
                  )}
                </View>
                <View style={styles.cardBody}>
                  <Text style={styles.cardSubtitle}>{promo.subtitle}</Text>
                  <Text style={styles.cardName} numberOfLines={2}>
                    {promo.title}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>

    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({

  root: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: WHITE,
  },

  // ── Features panel ─────────────────────────────────────────────────────
  featuresPanel: {
    flex: 67,
    backgroundColor: BG,
    paddingTop: 40,
    paddingHorizontal: 36,
    paddingBottom: 20,
  },

  featuresHeader: {
    marginBottom: 28,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  labelDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: GOLD,
  },
  sectionLabel: {
    fontFamily: 'Inter_600SemiBold',
    color: GOLD,
    fontSize: 10,
    letterSpacing: 4,
  },
  sectionHeadline: {
    fontFamily: 'PlayfairDisplay_700Bold',
    color: NAVY,
    fontSize: 34,
    lineHeight: 42,
    marginBottom: 18,
  },
  headlineAccent: {
    fontFamily: 'PlayfairDisplay_700Bold',
    color: NAVY,
    fontStyle: 'italic',
  },
  headlineRule: {
    width: 40,
    height: 1.5,
    backgroundColor: GOLD,
    opacity: 0.45,
  },

  // Scrollable grid — 3 columns via flexWrap
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    paddingBottom: 20,
  },
  card: {
    width: '30.5%',
    backgroundColor: WHITE,
    borderRadius: 6,
    padding: 24,
    borderWidth: 1,
    borderColor: RULE,
    // Soft shadow
    shadowColor: '#2C1F0E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 3,
    position: 'relative',
    overflow: 'hidden',
  },
  cardPressed: {
    transform: [{ scale: 0.985 }],
    backgroundColor: '#FDFBF8',
    shadowOpacity: 0.1,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 6,
    backgroundColor: BG,
    borderWidth: 1,
    borderColor: RULE,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  cardTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    color: NAVY,
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 10,
  },
  cardDesc: {
    fontFamily: 'Inter_400Regular',
    color: MUTED,
    fontSize: 13,
    lineHeight: 21,
    marginBottom: 16,
  },
  // Thin gold rule at card bottom — subtle luxury detail
  cardAccentLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: GOLD,
    opacity: 0.15,
  },

  // ── Separator ──────────────────────────────────────────────────────────
  vertSep: {
    width: 1,
    backgroundColor: RULE,
    marginVertical: 40,
  },

  // ── Promo panel (RIGHT 33%) ─────────────────────────────────────────────
  promoPanel: {
    width: '33%',
    backgroundColor: WHITE,
    shadowColor: '#8C7B6B',
    shadowOffset: { width: -4, height: 0 },
    shadowOpacity: 0.07,
    shadowRadius: 16,
    elevation: 4,
  },
  goldTop: {
    height: 2,
    backgroundColor: GOLD,
    opacity: 0.55,
  },
  promoInner: {
    flex: 1,
    paddingTop: 28,
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  promoHeader: {
    marginBottom: 20,
  },
  promoLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  promoDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: GOLD,
  },
  promoLabel: {
    fontFamily: 'Inter_600SemiBold',
    color: GOLD,
    fontSize: 9,
    letterSpacing: 3.5,
  },
  promoTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    color: CHARCOAL,
    fontSize: 30,
    lineHeight: 36,
    marginBottom: 16,
  },
  promoTitleAccent: {
    fontFamily: 'PlayfairDisplay_700Bold',
    color: GOLD,
    fontStyle: 'italic',
  },
  promoRule: {
    width: 32,
    height: 1.5,
    backgroundColor: RULE,
  },
  cardsContainer: {
    paddingTop: 16,
    paddingBottom: 8,
    gap: 12,
  },
  promoCard: {
    backgroundColor: BG,
    borderRadius: 6,
    overflow: 'hidden',
    shadowColor: '#2C1F0E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 3,
  },
  cardImgWrap: {
    width: '100%',
    height: 110,
    position: 'relative',
  },
  cardImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  tagBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: NAVY,
    paddingVertical: 3,
    paddingHorizontal: 9,
    borderRadius: 3,
  },
  tagText: {
    fontFamily: 'Inter_600SemiBold',
    color: '#EDE9E3',
    fontSize: 9,
    letterSpacing: 1.2,
  },
  cardBody: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: WHITE,
  },
  cardSubtitle: {
    fontFamily: 'Inter_400Regular',
    color: GOLD,
    fontSize: 10,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  cardName: {
    fontFamily: 'Inter_600SemiBold',
    color: CHARCOAL,
    fontSize: 13,
    lineHeight: 19,
  },
});
