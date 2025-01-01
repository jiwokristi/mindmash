import { createClient } from "@/utils/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  console.log("data, error -----> DashboardPage", data, error);

  return (
    <main id="DashboardPage" className="relative h-screen px-32">
      DashboardPage
    </main>
  );
}
