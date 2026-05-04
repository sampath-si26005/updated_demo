/**
 * FeatureBar.tsx — Premium bottom bar.
 * FUNCTIONALITY UNCHANGED:
 *   - "How it works" → opens HowItWorksSection modal
 *   - "About" → opens AboutSection modal
 *   - "Features" → opens WhySmartTrolley modal
 *   - "24/7 assistance" → non-interactive (display only)
 * Only visual style elevated.
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HowItWorksSection from './HowItWorksSection';
import AboutSection from './AboutSection';
import WhySmartTrolley from './WhySmartTrolley';

const features = [
  { icon: 'help-circle-outline' as const,        text: 'How it works',   id: 'how'   },
  { icon: 'information-circle-outline' as const,  text: 'About',          id: 'about' },
  { icon: 'grid-outline' as const,               text: 'Features',       id: 'why'   },
  { icon: 'headset-outline' as const,            text: '24/7 assistance', id: null    },
];

export default function FeatureBar() {
  const [activeModal, setActiveModal] = useState<'how' | 'about' | 'why' | null>(null);

  return (
    <>
      <View style={styles.container}>
        {/* Top gold accent rule */}
        <View style={styles.topRule} />

        <View style={styles.row}>
          {features.map((item, index) => {
            const isClickable = item.id !== null;
            const isLast = index === features.length - 1;

            return (
              <React.Fragment key={index}>
                <Pressable
                  style={({ pressed }) => [
                    styles.item,
                    isClickable && pressed && styles.itemPressed,
                  ]}
                  onPress={isClickable ? () => setActiveModal(item.id as any) : undefined}
                >
                  <View style={styles.iconWrap}>
                    <Ionicons
                      name={item.icon}
                      size={22}
                      color={isClickable ? '#0D1F35' : '#9CA3AF'}
                    />
                  </View>
                  <Text style={[styles.label, !isClickable && styles.labelMuted]}>
                    {item.text}
                  </Text>
                </Pressable>

                {/* Vertical separator */}
                {!isLast && <View style={styles.sep} />}
              </React.Fragment>
            );
          })}
        </View>
      </View>

      {/* ── Modals (unchanged functionality) ─────────────────── */}
      <Modal
        animationType="slide"
        visible={activeModal !== null}
        onRequestClose={() => setActiveModal(null)}
      >
        <View style={styles.modalScreen}>
          {activeModal === 'how'   && <HowItWorksSection />}
          {activeModal === 'about' && <AboutSection />}
          {activeModal === 'why'   && <WhySmartTrolley />}

          <Pressable style={styles.closeBtn} onPress={() => setActiveModal(null)}>
            <Ionicons name="close-circle" size={52} color="#0D1F35" />
          </Pressable>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EAE6DF',
    shadowColor: '#1A1A1A',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 12,
  },
  topRule: {
    height: 2,
    backgroundColor: '#C9A96E',
    opacity: 0.4,
  },
  row: {
    height: 86,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    height: '100%',
    paddingHorizontal: 8,
  },
  itemPressed: {
    opacity: 0.55,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#F4F1EC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: 'Inter_600SemiBold',
    color: '#0D1F35',
    fontSize: 15,
    letterSpacing: 0.1,
  },
  labelMuted: {
    color: '#9CA3AF',
  },
  sep: {
    width: 1,
    height: 30,
    backgroundColor: '#E5E0D8',
  },

  /* Modal */
  modalScreen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  closeBtn: {
    position: 'absolute',
    top: 36,
    right: 36,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
});
