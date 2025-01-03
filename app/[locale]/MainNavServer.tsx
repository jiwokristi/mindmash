import { createClient } from "@/utils/supabase/server";

import { MainNav } from "./MainNav";

export const MainNavServer = async () => {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  return <MainNav isAuthenticated={!data.user} />;
};
