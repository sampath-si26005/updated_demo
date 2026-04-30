export interface Shop {
  id: string;
  name: string;
  distance: string;
  category: string;
}

export const nearbyShops: Shop[] = [
  { id: '1', name: 'Cafe Coffee Day', distance: '20m', category: 'Coffee' },
  { id: '2', name: 'Duty Free Shop', distance: '50m', category: 'Shopping' },
  { id: '3', name: 'WHSmith', distance: '65m', category: 'Books & Convenience' },
  { id: '4', name: 'KFC', distance: '80m', category: 'Food' },
  { id: '5', name: 'Subway', distance: '100m', category: 'Food' },
  { id: '6', name: 'Starbucks', distance: '120m', category: 'Coffee' },
];
