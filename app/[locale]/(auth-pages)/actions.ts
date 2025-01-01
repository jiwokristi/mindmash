"use server";

import { createClient } from "@/utils/supabase/server";
import { AuthValues } from "@/utils/hooks/validation.auth";

export async function signUp(payload: AuthValues, locale: string) {
  const supabase = await createClient();

  const res = await supabase.auth.signUp({
    ...payload,
    options: {
      emailRedirectTo: "http://localhost:3000/" + locale,
    },
  });

  return res;
}

export async function signIn(payload: AuthValues) {
  const supabase = await createClient();

  const res = await supabase.auth.signInWithPassword(payload);

  return res;
}
