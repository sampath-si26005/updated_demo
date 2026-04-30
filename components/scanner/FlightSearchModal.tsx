import React from 'react';
import { View, Text, StyleSheet, Modal, FlatList, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface Flight {
  id: string;
  destination: string;
  departure: string;
  airline: string;
  flightNo: string;
}

const flightData: Flight[] = [
  { id: '1', destination: 'Jabalpur', departure: '17:10', airline: 'IndiGo', flightNo: '6E7307' },
  { id: '2', destination: 'Coimbatore', departure: '17:15', airline: 'IndiGo', flightNo: '6E6328' },
  { id: '3', destination: 'Bangalore', departure: '17:20', airline: 'Alliance A', flightNo: '9I518' },
  { id: '4', destination: 'Rajahmundry', departure: '17:20', airline: 'IndiGo', flightNo: '6E7311' },
  { id: '5', destination: 'Goa', departure: '17:25', airline: 'AirAsia In', flightNo: 'I51983' },
  { id: '6', destination: 'Bhubaneshwar', departure: '17:30', airline: 'IndiGo', flightNo: '6E168' },
  { id: '7', destination: 'Delhi', departure: '17:40', airline: 'Vistara', flightNo: 'UK890' },
  { id: '8', destination: 'Delhi', departure: '17:50', airline: 'Air India', flightNo: 'AI4503' },
  { id: '9', destination: 'Vijayawada', departure: '17:55', airline: 'IndiGo', flightNo: '6E7213' },
  { id: '10', destination: 'Chennai Intl', departure: '17:55', airline: 'IndiGo', flightNo: '6E102' },
];

interface FlightSearchModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function FlightSearchModal({ visible, onClose }: FlightSearchModalProps) {
  const router = useRouter();

  const handleSelect = (flight: Flight) => {
    onClose();
    router.push({
      pathname: '/gate',
      params: {
        flightNo: flight.flightNo,
        destination: flight.destination,
        departure: flight.departure
      }
    });
  };
  const renderItem = ({ item, index }: { item: Flight; index: number }) => {
    return (
      <View style={[styles.row, index % 2 !== 0 && styles.rowAlt]}>
        <Text style={[styles.cell, styles.colTimePrimary]}>{item.departure}</Text>
        <Text style={[styles.cell, styles.colDest]}>{item.destination}</Text>
        <Text style={[styles.cell, styles.colTimeAlt]}>{item.departure}</Text>
        <Text style={[styles.cell, styles.colAirline]}>{item.airline}</Text>
        <Text style={[styles.cell, styles.colFlight]}>{item.flightNo}</Text>
        <View style={styles.colAction}>
          <Pressable style={styles.selectBtn} onPress={() => handleSelect(item)}>
            <Text style={styles.selectBtnText}>Select</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>SELECT YOUR FLIGHT</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Feather name="x" size={32} color="#555" />
            </Pressable>
          </View>
          
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.thCell, styles.colTimePrimary]}></Text>
            <Text style={[styles.thCell, styles.colDest]}>Destination</Text>
            <Text style={[styles.thCell, styles.colTimeAlt]}>Departure</Text>
            <Text style={[styles.thCell, styles.colAirline]}>Airline</Text>
            <Text style={[styles.thCell, styles.colFlight]}>Flight#</Text>
            <View style={styles.colAction} />
          </View>
          
          {/* Table List */}
          <FlatList
            data={flightData}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    height: '80%',
    backgroundColor: '#F5F7FA', // matches the screenshot light gray
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#D1D5DB',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6B7280',
    letterSpacing: 1,
  },
  closeButton: {
    padding: 4,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#E5E7EB', // light gray for header
    borderBottomWidth: 1,
    borderBottomColor: '#D1D5DB',
  },
  thCell: {
    color: '#6B7280',
    fontWeight: '600',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF', // odd rows white
  },
  rowAlt: {
    backgroundColor: '#F3F4F6', // even rows light gray
  },
  cell: {
    fontSize: 18,
    color: '#111827',
    fontWeight: '500',
  },
  colTimePrimary: {
    flex: 1,
    color: '#3B82F6', // blue text for first time column based on screenshot
    fontWeight: 'bold',
  },
  colDest: {
    flex: 2,
  },
  colTimeAlt: {
    flex: 1.5,
  },
  colAirline: {
    flex: 2,
  },
  colFlight: {
    flex: 1.5,
    color: '#6B7280',
  },
  colAction: {
    flex: 1.5,
    alignItems: 'flex-end',
  },
  selectBtn: {
    backgroundColor: '#EF4444', // red select button
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  selectBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  listContent: {
    paddingBottom: 20,
  }
});
