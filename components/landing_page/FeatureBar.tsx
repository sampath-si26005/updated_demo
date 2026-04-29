/**
 * FeatureBar.tsx
 * 
 * This component displays a horizontal bar or row of quick feature 
 * shortcuts (like Shops, Dining, Gates). It provides users with 
 * 1-tap access to primary map categories.
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HowItWorksSection from './HowItWorksSection';
import AboutSection from './AboutSection';
import WhySmartTrolley from './WhySmartTrolley';

const features = [
  { icon: 'help-circle-outline', text: 'How it works', id: 'how' },
  { icon: 'information-circle-outline', text: 'About', id: 'about' },
  { icon: 'grid-outline', text: 'Features', id: 'why' }, // Rewired 'Real-time updates' to show the new component
  { icon: 'headset-outline', text: '24/7 assistance', id: null },
];

export default function FeatureBar() {
  const [activeModal, setActiveModal] = useState<'how' | 'about' | 'why' | null>(null);

  return (
    <>
      <View style={styles.container}>
        {features.map((item, index) => {
          const isButton = item.id !== null;
          const ContainerComponent = isButton ? Pressable : View;
          
          return (
            <ContainerComponent 
              key={index} 
              style={[styles.featureItem, isButton && styles.interactiveItem]}
              // @ts-ignore
              onPress={isButton ? () => setActiveModal(item.id as any) : undefined}
            >
              <Ionicons name={item.icon as any} size={32} color="#2F6FED" />
              <Text style={styles.featureText}>{item.text}</Text>
            </ContainerComponent>
          );
        })}
      </View>

      <Modal
        animationType="slide"
        visible={activeModal !== null}
        onRequestClose={() => setActiveModal(null)}
      >
        <View style={styles.modalFullScreen}>
          {activeModal === 'how' && <HowItWorksSection />}
          {activeModal === 'about' && <AboutSection />}
          {activeModal === 'why' && <WhySmartTrolley />}

          {/* Floating close button */}
          <Pressable 
            style={styles.closeFloat} 
            onPress={() => setActiveModal(null)}
          >
            <Ionicons name="close-circle" size={56} color="#2F6FED" />
          </Pressable>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 100,
    backgroundColor: '#F5F9FF', 
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0', 
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  interactiveItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(47, 111, 237, 0.1)', 
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(47, 111, 237, 0.2)',
  },
  featureText: {
    color: '#0A1F44', 
    fontSize: 20,
    fontWeight: '600',
  },
  modalFullScreen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  closeFloat: {
    position: 'absolute',
    top: 40,
    right: 40,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
});
