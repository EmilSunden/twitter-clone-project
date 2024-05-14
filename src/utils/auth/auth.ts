// // utils/auth.js
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function getUser() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/signedout");
  }
  return data.user;
}
