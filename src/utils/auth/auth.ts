// // utils/auth.js
import { createSSRClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function getUser() {
  const supabase = createSSRClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/signedout");
  }
  return data.user;
}
