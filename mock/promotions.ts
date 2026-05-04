export interface Promotion {
  id: string;
  title: string;
  subtitle: string;
  image: any;
  tag?: string;
}

export const promotions: Promotion[] = [
  {
    id: "p1",
    title: "Flat 20% Off on Duty Free",
    subtitle: "Perfumes & Cosmetics",
    image: require("../assets/images/promotions/dutyfree.png"),
    tag: "20% OFF"
  },
  {
    id: "p2",
    title: "Buy 1 Get 1 Coffee",
    subtitle: "Cafe Coffee Day",
    image: require("../assets/images/promotions/coffee.png"),
    tag: "Limited Time"
  },
  {
    id: "p3",
    title: "Luxury Sunglasses Sale",
    subtitle: "Sunglass Hut",
    image: require("../assets/images/promotions/sunglasses.png")
  }
];
