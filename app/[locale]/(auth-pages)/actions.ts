"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { AuthValues } from "@/utils/validations/auth";

export async function signup(payload: AuthValues) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp(payload);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signin(payload: AuthValues) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword(payload);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
