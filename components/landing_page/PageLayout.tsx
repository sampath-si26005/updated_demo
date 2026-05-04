/**
 * PageLayout.tsx — Warm off-white shell.
 */
import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import Header from './Header';

interface PageLayoutProps {
  children: React.ReactNode;
  hideHeader?: boolean;
}

export default function PageLayout({ children, hideHeader = false }: PageLayoutProps) {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#0D1F35" />
      {!hideHeader && <Header />}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F4F1EC',
  },
});
