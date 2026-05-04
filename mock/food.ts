export interface FoodOutlet {
  id: string;
  name: string;
  category: string;
  distance: string;
  rating: number;
  openStatus: 'Open' | 'Closing Soon' | 'Closed';
  imageUrl?: string;
  description?: string;
}

export const foodOutlets: FoodOutlet[] = [
  { id: '1', name: 'Il Mulino', category: 'Fine Dining', distance: '80m', rating: 4.8, openStatus: 'Open', imageUrl: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2070&auto=format&fit=crop', description: 'Elevated Italian classics with a curated wine list in a refined atmosphere.' },
  { id: '2', name: 'The Artisan Bakery', category: 'Healthy & Fresh', distance: '100m', rating: 4.5, openStatus: 'Open', imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop', description: 'Freshly baked viennoiserie, artisanal breads, and specialty coffee.' },
  { id: '3', name: 'Caviar House & Prunier', category: 'Seafood Bar', distance: '120m', rating: 4.6, openStatus: 'Open', imageUrl: 'https://images.unsplash.com/photo-1579684947550-22e945225d9a?q=80&w=2069&auto=format&fit=crop', description: 'Premium caviar, Balik smoked salmon, and champagne pairings.' },
  { id: '4', name: 'Sake no Hana', category: 'Japanese', distance: '150m', rating: 4.9, openStatus: 'Closing Soon', imageUrl: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?q=80&w=2070&auto=format&fit=crop', description: 'Authentic omakase experience and premium robatayaki grill.' },
  { id: '5', name: 'Wolfgang Puck', category: 'Fine Dining', distance: '200m', rating: 4.7, openStatus: 'Open', imageUrl: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop', description: 'Modern American cuisine from the legendary celebrity chef.' },
  { id: '6', name: 'Kohi Coffee', category: 'Coffee & Snacks', distance: '250m', rating: 4.8, openStatus: 'Closed', imageUrl: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop', description: 'Specialty pour-over coffee and delicate Japanese pastries.' },
  { id: '7', name: 'Balthazar', category: 'Bakery', distance: '300m', rating: 4.5, openStatus: 'Open', imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop', description: 'Iconic French brasserie favorites and artisan breads.' },
  { id: '8', name: 'Le Pain Quotidien', category: 'Bakery', distance: '350m', rating: 4.4, openStatus: 'Open', imageUrl: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?q=80&w=2000&auto=format&fit=crop', description: 'Organic bakery and cafe serving simple, wholesome food.' },
];
