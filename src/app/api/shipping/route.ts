import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  const wilaya = request.nextUrl.searchParams.get("wilaya");
  if (!wilaya) return NextResponse.json({ error: "wilaya_required" }, { status: 400 });
  const client = createAdminClient();
  if (!client) return NextResponse.json({ configured: false }, { status: 503 });
  const { data, error } = await client.from("delivery_fees").select("fee_dzd").eq("wilaya_code", wilaya).maybeSingle();
  if (error) return NextResponse.json({ configured: false }, { status: 500 });
  return NextResponse.json(data ? { configured: true, fee: data.fee_dzd } : { configured: false });
}
