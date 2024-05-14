"use server";
import { createClient } from "@/utils/supabase/server";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { db } from "../db";
import { likes, profiles, replies } from "../db/schema";
export const likeTweet = async ({
  tweetId,
  userId,
}: {
  tweetId: string;
  userId: string;
}) => {
  await db
    .insert(likes)
    .values({
      tweetId,
      userId,
    })
    .catch((err) => {
      console.log(err);
    });

  revalidatePath("/");
};

export const unlikeTweet = async ({
  tweetId,
  userId,
}: {
  tweetId: string;
  userId: string;
}) => {
  const supabase = createClient();

  await supabase
    .from("likes")
    .delete()
    .eq("tweet_id", tweetId)
    .eq("user_id", userId);
  revalidatePath("/");
};

export const reply = async ({
  tweetId,
  userId,
  replyText,
}: {
  tweetId: string;
  userId: string;
  replyText: string;
}) => {
    if(replyText === "") return
  await db.insert(replies).values({
    text: replyText,
    userId,
    tweetId,
  });
  revalidatePath(`/tweet/[id]`)
};

export const saveNewAvatar = async ({
  publicUrl,
  profileId,
}: {
  publicUrl: string,
  profileId: string
}) => {
  await db
  .update(profiles)
  .set({
    avatarUrl: publicUrl
  })
}
