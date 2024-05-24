"use server";
import { createSSRClient } from "@/utils/supabase/server";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { db } from "../db";
import { likes, profiles, replies, tweets, tweetsReplies } from "../db/schema";
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
  const supabase = createSSRClient();

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
  if (replyText === "") return;
  await db.insert(tweets).values({
    text: replyText,
    userId,
    isReply: true,
    replyId: tweetId,
  });

  revalidatePath(`/tweet/[id]`);
};

export const saveNewAvatar = async ({
  publicUrl,
  profileId,
}: {
  publicUrl: string;
  profileId: string;
}) => {
  await db.update(profiles).set({
    avatarUrl: publicUrl,
  });
};

export const createTweet = async ({
  // tweetId,
  userId,
  tweetText,
}: {
  // tweetId: string;
  userId: string;
  tweetText: string;
}) => {
  if (tweetText === "") return;
  await db.insert(tweets).values({
    // id: tweetId,
    userId,
    text: tweetText,
  });
  revalidatePath(`/`);
};
