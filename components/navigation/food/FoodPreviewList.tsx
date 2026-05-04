import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { foodOutlets } from '../../../mock/food';

export default function FoodPreviewList() {
  const router = useRouter();
  // Get top 3 or 4 food items for preview
  const previewItems = foodOutlets.slice(0, 4);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Food & Dining</Text>
      </View>
      
      <ScrollView style={styles.listContainer} contentContainerStyle={styles.listContent}>
        {previewItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.foodItem} activeOpacity={0.8}>
            {item.imageUrl && (
              <Image source={{ uri: item.imageUrl }} style={styles.itemImage} resizeMode="cover" />
            )}
            <View style={styles.imageOverlay} />
            
            <View style={styles.itemContentOverlay}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDistance}>{item.distance}</Text>
              </View>
              
              <View style={styles.itemFooterRow}>
                <Text style={styles.itemCategory}>{item.category}</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={12} color="#C9A96E" />
                  <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.viewMoreButton} 
          activeOpacity={0.8}
          onPress={() => router.push('/food')}
        >
          <LinearGradient
            colors={['#1E3A5F', '#0D1F35']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.viewMoreGradient}
          >
            <Text style={styles.viewMoreText}>View More</Text>
            <View style={styles.viewMoreArrowCircle}>
              <Text style={styles.viewMoreArrow}>→</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
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
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 24,
    color: '#0D1F35',
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 20,
  },
  foodItem: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    height: 200,
    backgroundColor: '#000',
  },
  itemImage: {
    width: '100%',
    height: '100%',
    opacity: 0.85,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  itemContentOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  itemName: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 22,
    color: '#FFFFFF',
  },
  itemDistance: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    color: '#E2E8F0',
  },
  itemFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemCategory: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: '#CBD5E0',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    color: '#C9A96E',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  viewMoreButton: {
    borderRadius: 8,
    shadowColor: '#0D1F35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  viewMoreGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    gap: 12,
  },
  viewMoreText: {
    fontFamily: 'Inter_600SemiBold',
    color: '#EDE9E3',
    fontSize: 16,
    letterSpacing: 0.3,
  },
  viewMoreArrowCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(201, 169, 110, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewMoreArrow: {
    color: '#C9A96E',
    fontSize: 12,
  },
});
