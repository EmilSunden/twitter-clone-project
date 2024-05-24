import React from "react";
import ComposeTweet from "./server-components/compose-tweet";
import { getTweets } from "@/lib/supabase/queries";
import Tweet from "./client-components/tweet";
import { createSSRClient } from "@/utils/supabase/server";
import { Avatar } from "@mui/material";

const MainComponent = async () => {
  const supabase = createSSRClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  const res = await getTweets({
    currentUserID: userData.user?.id,
  });

  return (
    <main className="flex w-full h-full min-h-screen flex-col md:w-full ">
      <h1 className="text-xl font-bold my-4 p-6 sticky top-0 text-white bg-background/10 backdrop-blur-sm z-50" >
        Home
      </h1>
      <div className="border-t-[0.5px] border-b-[0.5px] border-gray-600 relative flex items-stretch space-x-2 py-6 px-4">
      <div className="flex justify-between items-center sticky bottom-0">
            <Avatar
              className=""
              alt="profile image"
              src="https://pbs.twimg.com/profile_images/1164982831468220417/_NhTE3XA_400x400.jpg"
              sx={{
                width: "3rem",
                height: "3rem",
                border: "2px solid white",
              }}
            />
          </div>
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
