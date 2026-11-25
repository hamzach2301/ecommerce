"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/data/products";

export type CartItem = { key:string; name:string; price:number; quantity:number; art:string; colors:[string,string]; details?:string; custom?:boolean; preview?:string };
type CartApi = { items: CartItem[]; addProduct:(product:Product, quantity?:number)=>void; addCustom:(item:Omit<CartItem,"key">)=>void; remove:(key:string)=>void; update:(key:string, quantity:number)=>void; clear:()=>void; count:number; total:number; notify:string|null };
const CartContext = createContext<CartApi | null>(null);
export const useCart = () => { const value = useContext(CartContext); if (!value) throw new Error("Cart unavailable"); return value; };
export function CartProvider({ children }: { children: React.ReactNode }) { const [items,setItems]=useState<CartItem[]>([]); const [ready,setReady]=useState(false); const [notify,setNotify]=useState<string|null>(null);
 useEffect(()=>{ try { setItems(JSON.parse(localStorage.getItem("stickly-cart")||"[]")); } catch {} setReady(true); },[]);
 useEffect(()=>{ if(ready) localStorage.setItem("stickly-cart",JSON.stringify(items)); },[items,ready]);
 const api=useMemo<CartApi>(()=>({items, addProduct:(p,q=1)=>{setItems(old=>{const found=old.find(i=>i.key===p.id);return found?old.map(i=>i.key===p.id?{...i,quantity:i.quantity+q}:i):[...old,{key:p.id,name:p.name,price:p.price,quantity:q,art:p.art,colors:p.colors,details:"ملصق جاهز"}]});setNotify(`تمت إضافة ${p.name} إلى السلة`);setTimeout(()=>setNotify(null),2600)}, addCustom:(item)=>{setItems(old=>[...old,{...item,key:`custom-${Date.now()}-${Math.random().toString(16).slice(2)}`}]);setNotify("تمت إضافة التصميم إلى السلة");setTimeout(()=>setNotify(null),2600)},remove:(key)=>setItems(old=>old.filter(i=>i.key!==key)),update:(key,quantity)=>setItems(old=>quantity<1?old.filter(i=>i.key!==key):old.map(i=>i.key===key?{...i,quantity}:i)),clear:()=>setItems([]),count:items.reduce((n,i)=>n+i.quantity,0),total:items.reduce((n,i)=>n+i.price*i.quantity,0),notify}),[items]);
 return <CartContext.Provider value={api}>{children}{notify&&<div className="toast">{notify}</div>}</CartContext.Provider>;
}
