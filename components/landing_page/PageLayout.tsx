import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import Header from './Header';

interface PageLayoutProps {
  children: React.ReactNode;
  hideHeader?: boolean;
}

export default function PageLayout({ children, hideHeader = false }: PageLayoutProps) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B2A4A" />
      {!hideHeader && <Header />}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
