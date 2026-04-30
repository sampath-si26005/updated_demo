export interface FoodOutlet {
  id: string;
  name: string;
  category: string;
  distance: string;
  rating: number;
  openStatus: 'Open' | 'Closing Soon' | 'Closed';
  imageUrl?: string;
}

export const foodOutlets: FoodOutlet[] = [
  { id: '1', name: 'KFC', category: 'Fast Food', distance: '80m', rating: 4.2, openStatus: 'Open' },
  { id: '2', name: 'Subway', category: 'Healthy & Fresh', distance: '100m', rating: 4.5, openStatus: 'Open' },
  { id: '3', name: 'Starbucks', category: 'Coffee & Snacks', distance: '120m', rating: 4.6, openStatus: 'Open' },
  { id: '4', name: 'Pizza Hut', category: 'Fast Food', distance: '150m', rating: 4.0, openStatus: 'Closing Soon' },
  { id: '5', name: 'McDonald\'s', category: 'Fast Food', distance: '200m', rating: 4.3, openStatus: 'Open' },
  { id: '6', name: 'Costa Coffee', category: 'Coffee & Snacks', distance: '250m', rating: 4.1, openStatus: 'Closed' },
  { id: '7', name: 'Burger King', category: 'Fast Food', distance: '300m', rating: 4.0, openStatus: 'Open' },
  { id: '8', name: 'Dunkin\' Donuts', category: 'Bakery', distance: '350m', rating: 4.4, openStatus: 'Open' },
];
