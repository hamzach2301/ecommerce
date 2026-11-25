import "server-only";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function currentAdmin() {
  const client = await createServerSupabaseClient();
  const admin = createAdminClient();
  if (!client || !admin) return null;
  const { data: { user } } = await client.auth.getUser();
  if (!user) return null;
  const { data } = await admin.from("admin_users").select("user_id").eq("user_id", user.id).maybeSingle();
  return data ? user : null;
}
export async function requireAdmin() { const user=await currentAdmin(); if (!user) redirect("/admin/login"); return user; }
