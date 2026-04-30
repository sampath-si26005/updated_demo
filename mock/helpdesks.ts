export interface HelpDesk {
  id: string;
  name: string;
  distance: number;
  status: "open" | "closed";
  services: string[];
  location: { x: number; y: number };
}

export const helpdesks: HelpDesk[] = [
  {
    id: "h1",
    name: "Information Desk A",
    distance: 40,
    status: "open",
    services: ["flight info", "assistance"],
    location: { x: 180, y: 90 }
  },
  {
    id: "h2",
    name: "Lost & Found Desk",
    distance: 90,
    status: "closed",
    services: ["lost & found"],
    location: { x: 350, y: 200 }
  },
  {
    id: "h3",
    name: "Special Assistance",
    distance: 150,
    status: "open",
    services: ["wheelchair", "priority"],
    location: { x: 500, y: 250 }
  },
  {
    id: "h4",
    name: "Transit Help Desk",
    distance: 210,
    status: "open",
    services: ["flight info", "transit info"],
    location: { x: 600, y: 120 }
  }
];
