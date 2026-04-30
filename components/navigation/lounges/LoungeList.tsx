import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Platform, Alert } from 'react-native';
import { lounges, Lounge } from '../../../mock/lounges';
import LoungeCard from './LoungeCard';

export default function LoungeList() {
  const [selectedLoungeId, setSelectedLoungeId] = useState<string | null>(null);

  // Sort lounges by distance (nearest first)
  const sortedLounges = [...lounges].sort((a, b) => a.distance - b.distance);

  const handleLoungePress = (lounge: Lounge) => {
    setSelectedLoungeId(lounge.id);
    
    const message = `Route set to ${lounge.name}`;
    if (Platform.OS === 'web') {
      window.alert(message);
    } else {
      Alert.alert("Navigation Started", message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Lounges</Text>
      </View>
      
      <ScrollView style={styles.listContainer} contentContainerStyle={styles.listContent}>
        {sortedLounges.map((lounge) => (
          <LoungeCard
            key={lounge.id}
            lounge={lounge}
            isSelected={selectedLoungeId === lounge.id}
            onPress={() => handleLoungePress(lounge)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },
});
