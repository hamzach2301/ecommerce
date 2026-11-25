export type ProductCategory = "Cute" | "Nature" | "Animals" | "Food" | "Quotes" | "Minimal" | "Aesthetic" | "Funny" | "Seasonal";

export type Product = {
  id: string; name: string; description: string; price: number; category: ProductCategory;
  art: string; colors: [string, string]; popularity: number; isNew?: boolean;
};

export const products: Product[] = [
  { id: "sunny-daisy", name: "Sunny Daisy", description: "طبعة نباتية بتكوين هادئ.", price: 480, category: "Nature", art: "01", colors: ["#C9B88E", "#F5F1E8"], popularity: 92, isNew: true },
  { id: "mushroom-friend", name: "Mushroom Friend", description: "تكوين مستوحى من الغابة.", price: 520, category: "Cute", art: "02", colors: ["#B8775F", "#F3E4DD"], popularity: 89 },
  { id: "cozy-coffee", name: "Cozy Coffee", description: "تصميم يومي بطابع دافئ.", price: 480, category: "Food", art: "03", colors: ["#8C6A55", "#F0E8DE"], popularity: 84 },
  { id: "happy-pup", name: "Happy Pup", description: "طبعة شخصية لدفتر أو جهازك.", price: 550, category: "Animals", art: "04", colors: ["#B98D5C", "#F4E9D8"], popularity: 97, isNew: true },
  { id: "berry-sweet", name: "Berry Sweet", description: "ألوان مركزة وتفاصيل دقيقة.", price: 480, category: "Food", art: "05", colors: ["#A85658", "#F5E3E1"], popularity: 86 },
  { id: "wildflower", name: "Wildflower", description: "طبعة مستوحاة من المطبوعات النباتية.", price: 520, category: "Nature", art: "06", colors: ["#A27B86", "#F0E8E8"], popularity: 77 },
  { id: "smile-more", name: "Smile More", description: "عبارة مختصرة بتصميم طباعي.", price: 440, category: "Quotes", art: "07", colors: ["#C49A35", "#F8F0D5"], popularity: 94 },
  { id: "tiny-frog", name: "Tiny Frog", description: "تفصيل بصري مخصص للمساحات الصغيرة.", price: 550, category: "Animals", art: "08", colors: ["#6E806B", "#E7EEE4"], popularity: 90 },
  { id: "peachy", name: "Peachy Mood", description: "لوحة لون هادئة بطابع تحريري.", price: 480, category: "Aesthetic", art: "09", colors: ["#B87962", "#F5E4DB"], popularity: 81 },
  { id: "planet-pal", name: "Planet Pal", description: "تصميم تجريدي بطبقات متوازنة.", price: 550, category: "Funny", art: "10", colors: ["#7083A0", "#E7ECF4"], popularity: 79 },
  { id: "checkered-heart", name: "Checkered Heart", description: "نمط هندسي بسيط بوضوح عالٍ.", price: 440, category: "Minimal", art: "11", colors: ["#8C5556", "#F4E6E5"], popularity: 75 },
  { id: "winter-cocoa", name: "Winter Cocoa", description: "تدرج موسمي متزن ومناسب للهدايا.", price: 520, category: "Seasonal", art: "12", colors: ["#6A7D8A", "#E8EFF1"], popularity: 71 },
];

export const categories = ["All Stickers", "Cute", "Nature", "Animals", "Food", "Quotes", "Minimal", "Aesthetic", "Funny", "Seasonal"] as const;
