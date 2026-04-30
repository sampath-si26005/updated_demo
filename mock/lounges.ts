export interface Lounge {
  id: string;
  name: string;
  distance: number;
  access: "free" | "paid" | "membership";
  status: "open" | "closed";
  amenities: string[];
  location: { x: number; y: number };
}

export const lounges: Lounge[] = [
  {
    id: "l1",
    name: "Plaza Premium Lounge",
    distance: 120,
    access: "paid",
    status: "open",
    amenities: ["wifi", "food", "shower"],
    location: { x: 250, y: 140 }
  },
  {
    id: "l2",
    name: "VIP Executive Lounge",
    distance: 200,
    access: "membership",
    status: "closed",
    amenities: ["wifi", "food"],
    location: { x: 400, y: 220 }
  },
  {
    id: "l3",
    name: "Air India Maharaja Lounge",
    distance: 350,
    access: "membership",
    status: "open",
    amenities: ["wifi", "food", "bar", "shower"],
    location: { x: 500, y: 300 }
  },
  {
    id: "l4",
    name: "Comfort Lounge",
    distance: 450,
    access: "free",
    status: "open",
    amenities: ["wifi", "snacks"],
    location: { x: 600, y: 100 }
  }
];
