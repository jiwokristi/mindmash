import { createClient } from "@/utils/supabase/server";

import { SignIn } from "./SignIn";

export default async function SignInPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  console.log("data, error -----> SignInPage", data, error);

  return (
    <main id="SignInPage" className="relative h-screen px-32">
      <SignIn />
    </main>
  );
}
