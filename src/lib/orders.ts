import { products } from "@/data/products";

export type CheckoutCartItem = { key:string; quantity:number; custom?:boolean; name?:string; details?:string };
export function calculateOrderItems(items: CheckoutCartItem[]) {
  if (!Array.isArray(items) || !items.length || items.length > 40) throw new Error("السلة غير صالحة.");
  return items.map(item => {
    if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 1000) throw new Error("كمية غير صالحة.");
    const product = products.find(p => p.id === item.key);
    if (product) return { product_key:product.id, name:product.name, description:product.description, unit_price:product.price, quantity:item.quantity, product_snapshot:product };
    if (!item.custom || !item.name) throw new Error("منتج غير معروف.");
    const base = item.name.includes("بطاقة") ? 2800 : item.name.includes("بوستر") ? 2400 : 1100;
    return { product_key:item.key, name:item.name.slice(0,120), description:item.details?.slice(0,250) ?? "تصميم مخصص", unit_price:base, quantity:item.quantity, product_snapshot:{custom:true, details:item.details ?? null} };
  });
}
