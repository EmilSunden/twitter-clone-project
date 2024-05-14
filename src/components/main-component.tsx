"use server"
import React from "react";
import ComposeTweet from "./server-components/compose-tweet";
import { getTweets } from "@/lib/supabase/queries";
import Tweet from "./client-components/tweet";
import { createClient } from "@/utils/supabase/server";

const MainComponent = async () => {
  const supabase = createClient();
  const {data: userData, error: userError} = await supabase.auth.getUser();
  const res = await getTweets({
    currentUserID: userData.user?.id
  });
 
  return (
    <main className="flex w-full h-full min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-gray-600">
      <h1 className="text-xl font-bold my-4 p-6 backdrop-blur bg-black/10 sticky top-0">
        Home
      </h1>
      <div className="border-t-[0.5px] border-b-[0.5px] border-gray-600 relative flex items-stretch space-x-2 py-6 px-4">
        <div className="w-11 h-11 bg-slate-400 rounded-full flex-none"></div>
        <ComposeTweet />
      </div>
      <div className="w-full">
        {res &&
          res.map(({ likes, tweet, profile, hasLiked, replies }) => {
            return (
              <Tweet
                key={tweet.id}
                tweet={{
                  tweetDetails: {
                    ...tweet,
                  },
                  userProfile: {
                    ...profile,
                  },
                }}
                likesCount={likes.length}
                currentUserId={userData.user?.id}
                hasLiked={hasLiked}
                repliesCount={replies.length}
              />
            );
          })}
      </div>
    </main>
  );
};

export default MainComponent;
