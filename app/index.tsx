import React from 'react';
import FeatureBar from '../components/landing_page/FeatureBar';
import MainSection from '../components/landing_page/MainSection';
import PageLayout from '../components/landing_page/PageLayout';

export default function LandingPage() {
  return (
    <PageLayout>
      <MainSection />
      <FeatureBar />
    </PageLayout>
  );
}
