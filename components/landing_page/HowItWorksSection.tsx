/**
 * HowItWorksSection.tsx
 *
 * Split layout:
 *   LEFT  (~67%) — 3-step "How it works" content
 *   RIGHT (~33%) — Promotion cards from promotions.ts
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

export default function HowItWorksSection() {
  return (
    <View style={styles.root}>

      {/* ═══════════════════════════════════════════════════════
          LEFT: 3-step "How it works" (original content)
      ═══════════════════════════════════════════════════════ */}
      <View style={styles.stepsPanel}>

        <View style={styles.stepsHeader}>
          <Text style={styles.sectionLabel}>HOW IT WORKS</Text>
          <Text style={styles.sectionHeadline}>
            Three steps to navigate{'\n'}with confidence
          </Text>
        </View>

        <View style={styles.stepsRow}>
          {/* Connecting hairline */}
          <View style={styles.connectLine} />

          {[
            {
              n: '1',
              title: 'Pick up a trolley',
              desc: 'Find any Smart Trolley at the baggage belt or terminal entrance. The screen activates automatically.',
            },
            {
              n: '2',
              title: "Tap 'Start Now'",
              desc: 'Enter your flight number or browse the interactive terminal map to find exactly where you need to go.',
            },
            {
              n: '3',
              title: 'Follow your map',
              desc: 'Live directions guide you to your gate. Flight alerts keep you informed every step of the way.',
            },
          ].map((step) => (
            <View key={step.n} style={styles.stepCol}>
              <View style={styles.badge}>
                <Text style={styles.badgeNum}>{step.n}</Text>
              </View>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepDesc}>{step.desc}</Text>
            </View>
          ))}
        </View>

      </View>

      {/* Vertical separator */}
      <View style={styles.vertSep} />

      {/* ═══════════════════════════════════════════════════════
          RIGHT: Promotions panel
      ═══════════════════════════════════════════════════════ */}
      <View style={styles.promoPanel}>
        {/* Gold top accent */}
        <View style={styles.goldTop} />

        <View style={styles.promoInner}>
          {/* Panel header */}
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

          {/* Promotion cards */}
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

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({

  root: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: WHITE,
  },

  // ── Steps panel (LEFT, 67%) ─────────────────────────────────────────────
  stepsPanel: {
    flex: 67,
    backgroundColor: WHITE,
    paddingVertical: 48,
    paddingHorizontal: 44,
    justifyContent: 'center',
  },
  stepsHeader: {
    marginBottom: 52,
    alignItems: 'center',
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
  },
  stepsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    position: 'relative',
  },
  connectLine: {
    position: 'absolute',
    top: 24,
    left: '16%',
    right: '16%',
    height: 1,
    backgroundColor: RULE,
    zIndex: 0,
  },
  stepCol: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
    zIndex: 1,
  },
  badge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: NAVY,
    backgroundColor: WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  badgeNum: {
    fontFamily: 'PlayfairDisplay_700Bold',
    color: NAVY,
    fontSize: 20,
    lineHeight: 24,
  },
  stepTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    color: NAVY,
    fontSize: 20,
    marginBottom: 12,
    textAlign: 'center',
  },
  stepDesc: {
    fontFamily: 'Inter_400Regular',
    color: MUTED,
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
  },

  // ── Separator ──────────────────────────────────────────────────────────
  vertSep: {
    width: 1,
    backgroundColor: RULE,
    marginVertical: 40,
  },

  // ── Promo panel (RIGHT, 33%) ────────────────────────────────────────────
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
