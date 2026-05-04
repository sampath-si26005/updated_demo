import { Slot } from 'expo-router';
import React from 'react';
import { useFonts, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { PlayfairDisplay_700Bold, PlayfairDisplay_400Regular } from '@expo-google-fonts/playfair-display';
import { View, ActivityIndicator } from 'react-native';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Inter_400Regular,
    Inter_600SemiBold,
    PlayfairDisplay_700Bold,
    PlayfairDisplay_400Regular,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#080D1A' }}>
        <ActivityIndicator size="large" color="#C9A96E" />
      </View>
    );
  }

  return <Slot />;
}
