import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HelpDesk } from '../../../mock/helpdesks';

interface HelpDeskCardProps {
  helpdesk: HelpDesk;
  isSelected?: boolean;
  onPress?: () => void;
}

export default function HelpDeskCard({ helpdesk, isSelected, onPress }: HelpDeskCardProps) {
  return (
    <TouchableOpacity 
      style={[styles.card, isSelected && styles.cardSelected]} 
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={styles.headerRow}>
        <Text style={styles.name}>{helpdesk.name}</Text>
        <Text style={styles.distance}>{helpdesk.distance}m</Text>
      </View>

      <View style={styles.detailsRow}>
        <View style={styles.badgeContainer}>
          <View style={[
            styles.statusBadge,
            helpdesk.status === 'open' ? styles.statusOpen : styles.statusClosed
          ]}>
            <Text style={[
              styles.statusText,
              helpdesk.status === 'open' ? styles.textOpen : styles.textClosed
            ]}>
              {helpdesk.status.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.servicesContainer}>
        {helpdesk.services.map((service, index) => (
          <View key={index} style={styles.serviceChip}>
            <Ionicons 
              name={
                service.includes('flight') ? 'airplane' : 
                service.includes('lost') ? 'search' : 
                service.includes('wheelchair') ? 'medical' : 'information-circle'
              } 
              size={12} 
              color="#4A5568" 
            />
            <Text style={styles.serviceText}>
              {service.charAt(0).toUpperCase() + service.slice(1)}
            </Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardSelected: {
    borderColor: '#3182CE',
    backgroundColor: '#EBF8FF',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3748',
    flex: 1,
    marginRight: 8,
  },
  distance: {
    fontSize: 14,
    color: '#718096',
    fontWeight: '600',
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  badgeContainer: {
    flexDirection: 'row',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusOpen: {
    backgroundColor: '#C6F6D5',
  },
  statusClosed: {
    backgroundColor: '#FED7D7',
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  textOpen: {
    color: '#22543D',
  },
  textClosed: {
    color: '#822727',
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  serviceChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  serviceText: {
    fontSize: 10,
    color: '#4A5568',
    fontWeight: '500',
  },
});
