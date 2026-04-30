import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { restrooms, Restroom } from '@/mock/restrooms';
import RestroomCard from './RestroomCard';

export default function RestroomList() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Sort restrooms by distance
  const sortedRestrooms = useMemo(() => {
    return [...restrooms].sort((a, b) => a.distance - b.distance);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Restrooms</Text>
      </View>
      
      <ScrollView style={styles.listContainer} contentContainerStyle={styles.listContent}>
        {sortedRestrooms.map((restroom) => (
          <RestroomCard
            key={restroom.id}
            restroom={restroom}
            isSelected={selectedId === restroom.id}
            onPress={() => setSelectedId(restroom.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Clean background for the sidebar
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
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
