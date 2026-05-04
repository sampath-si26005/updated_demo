/**
 * AboutSection.tsx
 *
 * Split layout matching HowItWorksSection:
 *   LEFT  (67%) — About content (premium-styled)
 *   RIGHT (33%) — Promotion cards from promotions.ts
 */
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { promotions } from '../../mock/promotions';

const BG       = '#F4F1EC';
const WHITE    = '#FFFFFF';
const NAVY     = '#0D1F35';
const CHARCOAL = '#111111';
const MUTED    = '#5C6370';
const GOLD     = '#B8922A';
const RULE     = '#E3DDD5';

export default function AboutSection() {
  return (
    <View style={styles.root}>

      {/* ═══════════════════════════════════════════════════════
          LEFT: About content (67%)
      ═══════════════════════════════════════════════════════ */}
      <View style={styles.aboutPanel}>

        <View style={styles.aboutHeader}>
          <Text style={styles.sectionLabel}>ABOUT</Text>
          <Text style={styles.sectionHeadline}>
            Enhancing Your{'\n'}Airport Experience
          </Text>
          <View style={styles.headlineRule} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.bodyContent}
        >
          <Text style={styles.paragraph}>
            Welcome to the new era of travel at Chennai International Airport.
            Our Smart Trolley system is a state-of-the-art innovation designed
            to make your journey smoother, faster, and completely stress-free.
          </Text>

          <Text style={styles.paragraph}>
            Powered by real-time indoor positioning and integrated directly with
            global flight data networks, this system offers personalized
            turn-by-turn navigation directly to your boarding gate.
          </Text>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statBig}>100%</Text>
              <View style={styles.statRule} />
              <Text style={styles.statLabel}>Free to Use</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statCard}>
              <Text style={styles.statBig}>24/7</Text>
              <View style={styles.statRule} />
              <Text style={styles.statLabel}>Live Support</Text>
            </View>
          </View>

          <Text style={styles.footerNote}>
            A joint initiative to bring smart terminal capabilities directly to your fingertips.
          </Text>
        </ScrollView>

      </View>

      {/* Vertical separator */}
      <View style={styles.vertSep} />

      {/* ═══════════════════════════════════════════════════════
          RIGHT: Promotions panel (33%) — same as HowItWorks
      ═══════════════════════════════════════════════════════ */}
      <View style={styles.promoPanel}>
        <View style={styles.goldTop} />

        <View style={styles.promoInner}>
          <View style={styles.panelHeader}>
            <View style={styles.labelRow}>
              <View style={styles.labelDot} />
              <Text style={styles.labelText}>TODAY'S OFFERS</Text>
            </View>
            <Text style={styles.panelTitle}>
              Curated{'\n'}
              <Text style={styles.panelTitleAccent}>for you.</Text>
            </Text>
            <View style={styles.titleRule} />
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
                  <Text style={styles.cardTitle} numberOfLines={2}>
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

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: WHITE,
  },

  // ── About panel (LEFT 67%) ──────────────────────────────────────────────
  aboutPanel: {
    flex: 67,
    backgroundColor: WHITE,
    paddingVertical: 48,
    paddingHorizontal: 52,
    justifyContent: 'center',
  },
  aboutHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  sectionLabel: {
    fontFamily: 'Inter_600SemiBold',
    color: GOLD,
    fontSize: 10,
    letterSpacing: 3.5,
    marginBottom: 16,
  },
  sectionHeadline: {
    fontFamily: 'PlayfairDisplay_700Bold',
    color: NAVY,
    fontSize: 36,
    lineHeight: 44,
    textAlign: 'center',
    marginBottom: 20,
  },
  headlineRule: {
    width: 40,
    height: 1.5,
    backgroundColor: GOLD,
    opacity: 0.5,
  },
  bodyContent: {
    alignItems: 'center',
    paddingBottom: 16,
  },
  paragraph: {
    fontFamily: 'Inter_400Regular',
    color: MUTED,
    fontSize: 15,
    lineHeight: 26,
    textAlign: 'center',
    marginBottom: 20,
    maxWidth: 560,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    marginBottom: 36,
  },
  statCard: {
    alignItems: 'center',
    paddingHorizontal: 48,
    paddingVertical: 20,
  },
  statBig: {
    fontFamily: 'PlayfairDisplay_700Bold',
    color: NAVY,
    fontSize: 44,
    lineHeight: 50,
    marginBottom: 10,
  },
  statRule: {
    width: 24,
    height: 1.5,
    backgroundColor: GOLD,
    opacity: 0.5,
    marginBottom: 10,
  },
  statLabel: {
    fontFamily: 'Inter_600SemiBold',
    color: MUTED,
    fontSize: 13,
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    height: 60,
    backgroundColor: RULE,
  },
  footerNote: {
    fontFamily: 'Inter_400Regular',
    color: 'rgba(92, 99, 112, 0.55)',
    fontSize: 13,
    fontStyle: 'italic',
    textAlign: 'center',
    maxWidth: 460,
    lineHeight: 20,
  },

  // ── Separator ──────────────────────────────────────────────────────────
  vertSep: {
    width: 1,
    backgroundColor: RULE,
    marginVertical: 40,
  },

  // ── Promo panel (RIGHT 33%) — identical to HowItWorks ──────────────────
  promoPanel: {
    width: '33%',
    backgroundColor: BG,
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
  panelHeader: {
    marginBottom: 20,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  labelDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: GOLD,
  },
  labelText: {
    fontFamily: 'Inter_600SemiBold',
    color: GOLD,
    fontSize: 9,
    letterSpacing: 3.5,
  },
  panelTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    color: CHARCOAL,
    fontSize: 30,
    lineHeight: 36,
    marginBottom: 16,
  },
  panelTitleAccent: {
    fontFamily: 'PlayfairDisplay_700Bold',
    color: GOLD,
    fontStyle: 'italic',
  },
  titleRule: {
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
    backgroundColor: WHITE,
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
  },
  cardSubtitle: {
    fontFamily: 'Inter_400Regular',
    color: GOLD,
    fontSize: 10,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  cardTitle: {
    fontFamily: 'Inter_600SemiBold',
    color: CHARCOAL,
    fontSize: 13,
    lineHeight: 19,
  },
});
