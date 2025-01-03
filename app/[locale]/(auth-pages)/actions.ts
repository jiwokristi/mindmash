"use server";

import { createClient } from "@/utils/supabase/server";
import { AuthValues } from "@/utils/hooks/validation.auth";

export async function signUp(payload: AuthValues) {
  const supabase = await createClient();

  const res = await supabase.auth.signUp(payload);

  return res;
}

export async function signIn(payload: AuthValues) {
  const supabase = await createClient();

  const res = await supabase.auth.signInWithPassword(payload);

  return res;
}

export async function signOut() {
  const supabase = await createClient();

  const res = await supabase.auth.signOut();

  return res;
}
