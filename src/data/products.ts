export type ProductCategory = "Cute" | "Nature" | "Animals" | "Food" | "Quotes" | "Minimal" | "Aesthetic" | "Funny" | "Seasonal";

export type Product = {
  id: string; name: string; description: string; price: number; category: ProductCategory;
  art: string; colors: [string, string]; popularity: number; isNew?: boolean;
};

export const products: Product[] = [
  { id: "sunny-daisy", name: "Sunny Daisy", description: "A little pocket of sunshine.", price: 480, category: "Nature", art: "🌼", colors: ["#F8D776", "#F7EEE0"], popularity: 92, isNew: true },
  { id: "mushroom-friend", name: "Mushroom Friend", description: "For woodland wanderers.", price: 520, category: "Cute", art: "🍄", colors: ["#F39B8E", "#F9E4D9"], popularity: 89 },
  { id: "cozy-coffee", name: "Cozy Coffee", description: "Freshly brewed good vibes.", price: 480, category: "Food", art: "☕", colors: ["#CFA37F", "#F7E7D4"], popularity: 84 },
  { id: "happy-pup", name: "Happy Pup", description: "A wag in sticker form.", price: 550, category: "Animals", art: "🐶", colors: ["#D9B785", "#F5EEDB"], popularity: 97, isNew: true },
  { id: "berry-sweet", name: "Berry Sweet", description: "Small, sweet, and cheerful.", price: 480, category: "Food", art: "🍓", colors: ["#F4978E", "#FCE9E5"], popularity: 86 },
  { id: "wildflower", name: "Wildflower", description: "Bloom wherever you land.", price: 520, category: "Nature", art: "🌷", colors: ["#E3A8C2", "#F9EAF1"], popularity: 77 },
  { id: "smile-more", name: "Smile More", description: "A sunny reminder for every day.", price: 440, category: "Quotes", art: "☺️", colors: ["#F6D365", "#FFF6C9"], popularity: 94 },
  { id: "tiny-frog", name: "Tiny Frog", description: "Just hopping by to say hi.", price: 550, category: "Animals", art: "🐸", colors: ["#A3B18A", "#EAF0DE"], popularity: 90 },
  { id: "peachy", name: "Peachy Mood", description: "Soft color, sweeter energy.", price: 480, category: "Aesthetic", art: "🍑", colors: ["#F3A27D", "#FBE5D8"], popularity: 81 },
  { id: "planet-pal", name: "Planet Pal", description: "A tiny universe for your notebook.", price: 550, category: "Funny", art: "🪐", colors: ["#AAB6DD", "#E8EAF8"], popularity: 79 },
  { id: "checkered-heart", name: "Checkered Heart", description: "Love, but make it graphic.", price: 440, category: "Minimal", art: "♥", colors: ["#E98B91", "#F9E5E5"], popularity: 75 },
  { id: "winter-cocoa", name: "Winter Cocoa", description: "Extra marshmallows, please.", price: 520, category: "Seasonal", art: "❄️", colors: ["#A8C5D4", "#EAF4F7"], popularity: 71 },
];

export const categories = ["All Stickers", "Cute", "Nature", "Animals", "Food", "Quotes", "Minimal", "Aesthetic", "Funny", "Seasonal"] as const;
