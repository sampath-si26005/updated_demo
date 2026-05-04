export interface ShoppingOutlet {
  id: string;
  name: string;
  category: string;
  distance: string;
  rating: number;
  openStatus: 'Open' | 'Closing Soon' | 'Closed';
  imageUrl?: string;
  description?: string;
}

export const shoppingOutlets: ShoppingOutlet[] = [
  { id: '1', name: 'Duty Free Royale', category: 'Luxury Duty Free', distance: '50m', rating: 4.8, openStatus: 'Open', imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=2080&auto=format&fit=crop', description: 'Curated selection of spirits, tobacco, and world-class fragrances.' },
  { id: '2', name: 'The Watch Gallery', category: 'Timepieces', distance: '65m', rating: 4.9, openStatus: 'Open', imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2099&auto=format&fit=crop', description: 'Exceptional craftsmanship from the world\'s most prestigious watchmakers.' },
  { id: '3', name: 'Hermès Boutique', category: 'Haute Couture', distance: '90m', rating: 4.9, openStatus: 'Open', imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069&auto=format&fit=crop', description: 'Uncompromising quality and timeless Parisian elegance.' },
  { id: '4', name: 'Jo Malone London', category: 'Fragrance', distance: '120m', rating: 4.7, openStatus: 'Open', imageUrl: 'https://images.unsplash.com/photo-1615485240384-552e40019c6e?q=80&w=2070&auto=format&fit=crop', description: 'Bespoke scents and luxury candles for the sophisticated traveler.' },
  { id: '5', name: 'Montblanc', category: 'Writing Instruments', distance: '150m', rating: 4.6, openStatus: 'Open', imageUrl: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=1943&auto=format&fit=crop', description: 'Iconic writing instruments, leather goods, and accessories.' },
  { id: '6', name: 'Tiffany & Co.', category: 'Jewelry', distance: '180m', rating: 4.8, openStatus: 'Closing Soon', imageUrl: 'https://images.unsplash.com/photo-1589128777073-263566ae5e4d?q=80&w=1974&auto=format&fit=crop', description: 'The legendary house of blue boxes and brilliant diamonds.' },
  { id: '7', name: 'Bang & Olufsen', category: 'Acoustics', distance: '200m', rating: 4.8, openStatus: 'Open', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop', description: 'Immersive sound experiences and Danish design excellence.' },
  { id: '8', name: 'L\'Occitane', category: 'Beauty', distance: '250m', rating: 4.5, openStatus: 'Closed', imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=2070&auto=format&fit=crop', description: 'Natural beauty products inspired by the art of living in Provence.' },
];
