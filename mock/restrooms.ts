export type FacilityType = 'male' | 'female' | 'accessible';
export type RestroomStatus = 'available' | 'busy';

export interface Restroom {
  id: string;
  name: string;
  distance: number;
  status: RestroomStatus;
  facilities: FacilityType[];
  location: { x: number; y: number };
}

export const restrooms: Restroom[] = [
  {
    id: "r1",
    name: "Restroom A1",
    distance: 25,
    status: "available",
    facilities: ["male", "female", "accessible"],
    location: { x: 120, y: 80 }
  },
  {
    id: "r2",
    name: "Restroom B2",
    distance: 60,
    status: "busy",
    facilities: ["male", "female"],
    location: { x: 300, y: 200 }
  },
  {
    id: "r3",
    name: "Restroom C1",
    distance: 120,
    status: "available",
    facilities: ["male", "female", "accessible"],
    location: { x: 450, y: 150 }
  },
  {
    id: "r4",
    name: "Family Restroom D",
    distance: 200,
    status: "available",
    facilities: ["accessible"],
    location: { x: 500, y: 300 }
  }
];
