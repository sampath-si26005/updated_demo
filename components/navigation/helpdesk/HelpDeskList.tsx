import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Platform, Alert } from 'react-native';
import { helpdesks, HelpDesk } from '../../../mock/helpdesks';
import HelpDeskCard from './HelpDeskCard';

export default function HelpDeskList() {
  const [selectedDeskId, setSelectedDeskId] = useState<string | null>(null);

  // Sort help desks by distance (nearest first)
  const sortedDesks = [...helpdesks].sort((a, b) => a.distance - b.distance);

  const handleDeskPress = (desk: HelpDesk) => {
    setSelectedDeskId(desk.id);
    
    const message = `Route set to ${desk.name}`;
    if (Platform.OS === 'web') {
      window.alert(message);
    } else {
      Alert.alert("Navigation Started", message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Help Desks & Info</Text>
      </View>
      
      <ScrollView style={styles.listContainer} contentContainerStyle={styles.listContent}>
        {sortedDesks.map((desk) => (
          <HelpDeskCard
            key={desk.id}
            helpdesk={desk}
            isSelected={selectedDeskId === desk.id}
            onPress={() => handleDeskPress(desk)}
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
