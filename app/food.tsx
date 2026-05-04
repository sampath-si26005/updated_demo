import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
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
      {item.imageUrl && (
        <Image source={{ uri: item.imageUrl }} style={styles.cardImage} resizeMode="cover" />
      )}
      <View style={styles.imageOverlay} />
      
      <View style={styles.cardContentOverlay}>
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
            <Ionicons name="location-outline" size={16} color="#E2E8F0" />
            <Text style={styles.infoText}>{item.distance}</Text>
          </View>
          
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={14} color="#C9A96E" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
          <LinearGradient
            colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.actionButtonGradient}
          >
            <Text style={styles.actionButtonText}>Navigate Here</Text>
            <View style={styles.actionButtonArrowCircle}>
              <Text style={styles.actionButtonArrow}>→</Text>
            </View>
          </LinearGradient>
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
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 32,
    color: '#0D1F35',
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
    backgroundColor: '#000',
    borderRadius: 20,
    height: 340,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  cardContentOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  name: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 24,
    color: '#FFFFFF',
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
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#CBD5E0',
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
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  infoText: {
    fontFamily: 'Inter_600SemiBold',
    marginLeft: 6,
    fontSize: 14,
    color: '#E2E8F0',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(201, 169, 110, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  ratingText: {
    fontFamily: 'Inter_700Bold',
    marginLeft: 4,
    fontSize: 14,
    color: '#C9A96E',
  },
  actionButton: {
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  actionButtonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  actionButtonText: {
    fontFamily: 'Inter_600SemiBold',
    color: '#FFFFFF',
    fontSize: 15,
    letterSpacing: 0.5,
  },
  actionButtonArrowCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: 'rgba(201, 169, 110, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonArrow: {
    color: '#C9A96E',
    fontSize: 11,
  },
});
