import { createClient } from "@/utils/supabase/server";

export default async function PlayPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  console.log("data, error -----> PlayPage", data, error);

  return (
    <main id="PlayPage" className="relative h-screen px-32">
      PlayPage
    </main>
  );
}
