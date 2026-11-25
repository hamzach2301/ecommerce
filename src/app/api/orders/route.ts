import { NextRequest, NextResponse } from "next/server";
import { calculateOrderItems } from "@/lib/orders";
import { normalizeAlgerianPhone, wilayas } from "@/lib/algeria";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  const client = createAdminClient();
  if (!client) return NextResponse.json({ error: "لم يتم إعداد قاعدة البيانات بعد." }, { status: 503 });
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim().replace(/\s+/g, " ");
    const phone = normalizeAlgerianPhone(String(body.phone ?? ""));
    const wilayaCode = String(body.wilayaCode ?? "");
    const commune = String(body.commune ?? "").trim();
    const address = String(body.address ?? "").trim();
    const instructions = String(body.instructions ?? "").trim();
    const idempotencyKey = String(body.idempotencyKey ?? "");
    if (!name || name.length > 100 || !phone || !wilayas.some(w=>w.code===wilayaCode) || !commune || commune.length>100 || !address || address.length>250 || !/^[a-zA-Z0-9_-]{16,128}$/.test(idempotencyKey)) return NextResponse.json({ error: "يرجى التحقق من بيانات الطلب." }, { status: 400 });
    const items = calculateOrderItems(body.items);
    const subtotal = items.reduce((sum,item)=>sum+item.unit_price*item.quantity,0);
    const { data: feeRow, error: feeError } = await client.from("delivery_fees").select("fee_dzd").eq("wilaya_code",wilayaCode).maybeSingle();
    if (feeError) throw feeError;
    if (!feeRow) return NextResponse.json({ error: "سعر التوصيل لهذه الولاية غير متاح حالياً." }, { status: 422 });
    const wilaya = wilayas.find(w=>w.code===wilayaCode)!;
    const reference = `STK-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2,6).toUpperCase()}`;
    const total = subtotal + Number(feeRow.fee_dzd);
    const { data: order, error } = await client.rpc("create_order_with_items", { p_order:{ reference, idempotency_key:idempotencyKey, customer_name:name, phone_normalized:phone, wilaya_code:wilaya.code, wilaya_name:wilaya.name, commune, address, instructions, subtotal, delivery_fee:Number(feeRow.fee_dzd), total }, p_items:items }).single();
    if (error) {
      if (error.code === "23505") { const { data: existing }=await client.from("orders").select("reference,subtotal,delivery_fee,total,created_at").eq("idempotency_key",idempotencyKey).maybeSingle(); if(existing) return NextResponse.json({ order:existing }); }
      throw error;
    }
    return NextResponse.json({ order });
  } catch (error) { console.error("Order creation failed", error); return NextResponse.json({ error: "تعذر إنشاء الطلب. حاول مرة أخرى." }, { status: 500 }); }
}
