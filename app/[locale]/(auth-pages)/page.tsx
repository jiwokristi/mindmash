import { createClient } from "@/utils/supabase/server";

import { AuthForms } from "./AuthForms";

export default async function Home() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  const isAuthenticated = !error && !!data?.user;

  return (
    <main id="Home" className="relative h-screen px-32">
      <AuthForms isAuthenticated={isAuthenticated} />
    </main>
  );
}
