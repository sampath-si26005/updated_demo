export interface ShoppingOutlet {
  id: string;
  name: string;
  category: string;
  distance: string;
  rating: number;
  openStatus: 'Open' | 'Closing Soon' | 'Closed';
}

export const shoppingOutlets: ShoppingOutlet[] = [
  { id: '1', name: 'Duty Free Express', category: 'Duty Free', distance: '50m', rating: 4.8, openStatus: 'Open' },
  { id: '2', name: 'WHSmith', category: 'Books & Convenience', distance: '65m', rating: 4.2, openStatus: 'Open' },
  { id: '3', name: 'Relay', category: 'Books & Convenience', distance: '90m', rating: 4.1, openStatus: 'Open' },
  { id: '4', name: 'MAC Cosmetics', category: 'Beauty & Fashion', distance: '120m', rating: 4.5, openStatus: 'Open' },
  { id: '5', name: 'Hugo Boss', category: 'Apparel', distance: '150m', rating: 4.6, openStatus: 'Open' },
  { id: '6', name: 'Swarovski', category: 'Jewelry', distance: '180m', rating: 4.7, openStatus: 'Closing Soon' },
  { id: '7', name: 'Electronics Hub', category: 'Electronics', distance: '200m', rating: 4.3, openStatus: 'Open' },
  { id: '8', name: 'Local Souvenirs', category: 'Gifts', distance: '250m', rating: 4.0, openStatus: 'Closed' },
];
