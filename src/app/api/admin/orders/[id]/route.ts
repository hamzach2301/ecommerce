import { NextRequest, NextResponse } from "next/server";
import { currentAdmin } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";
const statuses=["pending","confirmed","processing","shipped","delivered","cancelled"];
export async function PATCH(request:NextRequest,{params}:{params:Promise<{id:string}>}){const user=await currentAdmin();if(!user)return NextResponse.json({error:"غير مصرح"},{status:401});const {id}=await params;const {status}=await request.json();if(!statuses.includes(status))return NextResponse.json({error:"حالة غير صالحة"},{status:400});const client=createAdminClient();if(!client)return NextResponse.json({error:"الخدمة غير مهيأة"},{status:503});const {error}=await client.from("orders").update({status}).eq("id",id);if(error)return NextResponse.json({error:"تعذر تحديث الحالة"},{status:500});return NextResponse.json({ok:true});}
