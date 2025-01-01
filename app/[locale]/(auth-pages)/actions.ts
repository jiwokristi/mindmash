"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { AuthValues } from "@/utils/hooks/validation.auth";

export async function signUp(payload: AuthValues, locale: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp(payload);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/" + locale, "layout");
}

export async function signIn(payload: AuthValues, locale: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword(payload);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/" + locale, "layout");
  redirect(`/${locale}`);
}
