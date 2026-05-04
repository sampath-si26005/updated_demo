export interface Lounge {
  id: string;
  name: string;
  distance: string;
  category: string;
  access: "Free" | "Paid" | "Membership";
  status: "Open" | "Closed" | "Closing Soon";
  amenities: string[];
  imageUrl?: string;
  description?: string;
  location: { x: number; y: number };
}

export const lounges: Lounge[] = [
  {
    id: "l1",
    name: "Royal Silk Lounge",
    distance: "120m",
    category: "First Class",
    access: "Membership",
    status: "Open",
    amenities: ["wifi", "food", "shower", "spa"],
    imageUrl: "https://images.unsplash.com/photo-1517733325601-4919fd501377?q=80&w=2070&auto=format&fit=crop",
    description: "Experience unparalleled luxury with our private suites and signature spa treatments.",
    location: { x: 250, y: 140 }
  },
  {
    id: "l2",
    name: "The Executive Club",
    distance: "200m",
    category: "Business Class",
    access: "Paid",
    status: "Open",
    amenities: ["wifi", "food", "bar"],
    imageUrl: "https://images.unsplash.com/photo-1508243301-3e067ec80521?q=80&w=2070&auto=format&fit=crop",
    description: "The perfect environment for the modern professional to work or unwind.",
    location: { x: 400, y: 220 }
  },
  {
    id: "l3",
    name: "Emirates Lounge",
    distance: "350m",
    category: "First Class",
    access: "Membership",
    status: "Open",
    amenities: ["wifi", "food", "bar", "shower"],
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
    description: "Indulge in fine dining and world-class service before your next journey.",
    location: { x: 500, y: 300 }
  },
  {
    id: "l4",
    name: "Horizon Lounge",
    distance: "450m",
    category: "Premium Economy",
    access: "Free",
    status: "Closing Soon",
    amenities: ["wifi", "snacks", "bar"],
    imageUrl: "https://images.unsplash.com/photo-1582719478237-c26ad0c9a4ad?q=80&w=2070&auto=format&fit=crop",
    description: "A comfortable oasis with panoramic views of the runway.",
    location: { x: 600, y: 100 }
  }
];
