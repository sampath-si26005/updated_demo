export interface Shop {
  id: string;
  name: string;
  distance: string;
  location: string;
  category: string;
  description: string;
  timing: string;
  image: string;
}

export const nearbyShops: Shop[] = [
  { 
    id: '1', 
    name: 'Il Mulino', 
    distance: '2 min walk',
    location: 'Terminal 2 · Gate 34',
    category: 'Fine Dining · Italian',
    description: 'Elevated Italian classics with a curated wine list in a refined atmosphere.',
    timing: 'Open until 23:00',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    id: '2', 
    name: 'Caviar House & Prunier', 
    distance: '5 min walk',
    location: 'Terminal 2 · Central Plaza',
    category: 'Seafood Bar',
    description: 'Premium caviar, Balik smoked salmon, and champagne pairings.',
    timing: 'Open until 22:30',
    image: 'https://images.unsplash.com/photo-1579684947550-22e945225d9a?q=80&w=2069&auto=format&fit=crop'
  },
  { 
    id: '3', 
    name: 'The Artisan Bakery', 
    distance: '1 min walk',
    location: 'Terminal 2 · Gate 28',
    category: 'Patisserie · Cafe',
    description: 'Freshly baked viennoiserie, artisanal breads, and specialty coffee.',
    timing: 'Open 24 Hours',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop'
  },
  { 
    id: '4', 
    name: 'Sake no Hana', 
    distance: '8 min walk',
    location: 'Terminal 2 · Gate 42',
    category: 'Japanese · Sushi',
    description: 'Authentic omakase experience and premium robatayaki grill.',
    timing: 'Open until 22:00',
    image: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?q=80&w=2070&auto=format&fit=crop'
  }
];
