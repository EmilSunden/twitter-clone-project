import { createSSRClient } from "@/utils/supabase/server";
import { randomUUID } from "crypto";
import ComposeTweetForm from "../client-components/compose-tweet-form";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { tweets } from "@/lib/db/schema";

const ComposeTweet = () => {
  async function submitTweet(formData: FormData) {
    "use server";
    const supabase = createSSRClient();
    const tweet = formData.get("tweet");

    if (!tweet) return;

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) return;

    let err = "";

    const res = await db
      .insert(tweets)
      .values({
        userId: userData.user.id,
        text: tweet.toString(),
        id: randomUUID(),
      })
      .returning()
      .catch((error) => {
        console.log(error);
        err = "something wrong with insert";
      });
    revalidatePath("/");
    return { data: res, err };
  }

  return <ComposeTweetForm serverAction={submitTweet} />;
};

export default ComposeTweet;
