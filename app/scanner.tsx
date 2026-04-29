import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import PageLayout from '../components/landing_page/PageLayout';
import FlightSearchModal from '../components/scanner/FlightSearchModal';
import ScannerBanner from '../components/scanner/ScannerBanner';
import ScannerBottomBar from '../components/scanner/ScannerBottomBar';
import ScannerFrame from '../components/scanner/ScannerFrame';
import ScannerInstructions from '../components/scanner/ScannerInstructions';

export default function ScannerScreen() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <PageLayout>
      <ScannerBanner />

      {/* Main Content Area */}
      <View style={styles.mainContent}>
        <ScannerFrame />
        <ScannerInstructions />
      </View>

      <ScannerBottomBar onOpenSearch={() => setIsSearchOpen(true)} />

      <FlightSearchModal
        visible={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </PageLayout>
  );
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F5F7FA', // Light greyish background
    padding: 40,
  },
});

