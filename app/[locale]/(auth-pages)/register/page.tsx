import { createClient } from "@/utils/supabase/server";

import { SignUp } from "./SignUp";

export default async function SignUpPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  console.log("data, error -----> SignUpPage", data, error);

  return (
    <main id="SignUpPage" className="relative h-screen px-32">
      <SignUp />
    </main>
  );
}
