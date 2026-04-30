import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import PageLayout from '../components/landing_page/PageLayout';
import { foodOutlets, FoodOutlet } from '../mock/food';

export default function FoodPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Fast Food', 'Coffee & Snacks', 'Healthy & Fresh', 'Bakery'];

  const filteredOutlets = filter === 'All' 
    ? foodOutlets 
    : foodOutlets.filter(outlet => outlet.category === filter);

  const renderFoodItem = ({ item }: { item: FoodOutlet }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.headerRow}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={[
            styles.statusBadge, 
            item.openStatus === 'Open' ? styles.statusOpen : 
            item.openStatus === 'Closing Soon' ? styles.statusClosing : styles.statusClosed
          ]}>
            <Text style={[
              styles.statusText,
              item.openStatus === 'Open' ? styles.statusTextOpen : 
              item.openStatus === 'Closing Soon' ? styles.statusTextClosing : styles.statusTextClosed
            ]}>{item.openStatus}</Text>
          </View>
        </View>
        
        <Text style={styles.category}>{item.category}</Text>
        
        <View style={styles.footerRow}>
          <View style={styles.infoTag}>
            <Ionicons name="location-outline" size={16} color="#718096" />
            <Text style={styles.infoText}>{item.distance}</Text>
          </View>
          
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={14} color="#D69E2E" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Navigate Here</Text>
          <Ionicons name="navigate-outline" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <PageLayout hideHeader={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#2D3748" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Food & Dining Outlets</Text>
        </View>

        <View style={styles.filterContainer}>
          <FlatList
            horizontal
            data={categories}
            keyExtractor={(item) => item}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={[styles.filterChip, filter === item && styles.activeFilterChip]}
                onPress={() => setFilter(item)}
              >
                <Text style={[styles.filterText, filter === item && styles.activeFilterText]}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.filterList}
          />
        </View>

        <FlatList
          data={filteredOutlets}
          keyExtractor={(item) => item.id}
          renderItem={renderFoodItem}
          contentContainerStyle={styles.listContent}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
        />
      </View>
    </PageLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#EDF2F7',
  },
  backText: {
    marginLeft: 6,
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  filterContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  filterList: {
    paddingHorizontal: 24,
    gap: 12,
  },
  filterChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: '#EDF2F7',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  activeFilterChip: {
    backgroundColor: '#EBF8FF',
    borderColor: '#3182CE',
  },
  filterText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A5568',
  },
  activeFilterText: {
    color: '#2B6CB0',
  },
  listContent: {
    padding: 24,
    gap: 24,
  },
  columnWrapper: {
    gap: 24,
  },
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardContent: {
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2D3748',
    flex: 1,
    marginRight: 12,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusOpen: {
    backgroundColor: '#C6F6D5',
  },
  statusClosing: {
    backgroundColor: '#FEEBC8',
  },
  statusClosed: {
    backgroundColor: '#FED7D7',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  statusTextOpen: {
    color: '#22543D',
  },
  statusTextClosing: {
    color: '#7B341E',
  },
  statusTextClosed: {
    color: '#822727',
  },
  category: {
    fontSize: 16,
    color: '#718096',
    marginBottom: 16,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  infoTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDF2F7',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  infoText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '600',
    color: '#4A5568',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEFCBF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#975A16',
  },
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3182CE',
    paddingVertical: 14,
    borderRadius: 10,
    gap: 8,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
