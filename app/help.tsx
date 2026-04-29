import React from 'react';
import { StyleSheet } from 'react-native';
import PageLayout from '../components/landing_page/PageLayout';
import HelpBanner from '../components/scanner/HelpBanner';
import HelpBottomBar from '../components/scanner/HelpBottomBar';
import HelpOptions from '../components/scanner/HelpOptions';

export default function HelpScreen() {
  return (
    <PageLayout>
      <HelpBanner />
      <HelpOptions />
      <HelpBottomBar />
    </PageLayout>
  );
}

const styles = StyleSheet.create({});
