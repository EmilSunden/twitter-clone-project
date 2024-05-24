import Tweet from "@/components/client-components/tweet";
import { getTweets } from "@/lib/supabase/queries";
import { createSSRClient } from "@/utils/supabase/server";
import React from "react";
import { Avatar } from "@mui/material";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const UserProfilePage = async ({
  params,
}: {
  params: { username: string };
}) => {
  const supabase = createSSRClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();

  const getUserTweets = await getTweets({
    currentUserID: userData.user?.id,
    profileUsername: params.username,
  });
  return (
    <div>
      <section className="flex w-full sticky top-0 bg-opacity-95 z-50 bg-background/10 backdrop-blur-sm">
        <h1 className="text-xl text-white py-5 font-bold opacity-95 ml-5">
          {params.username || "Profile"}
        </h1>
      </section>
      <section>
        <img
          className="w-[100%] h-[15rem] object-cover"
          src="https://cdn.pixabay.com/photo/2021/02/08/19/55/cocker-5996316_1280.jpg"
          alt=""
        />
      </section>

      <section className="pl-6 ">
        <div className="flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            className="transform -translate-y-24"
            alt="profile image"
            src="https://pbs.twimg.com/profile_images/1164982831468220417/_NhTE3XA_400x400.jpg"
            sx={{
              width: "10rem",
              height: "10rem",
              border: "4px solid white",
            }}
          />
        </div>

        <div>
          <div className="flex items-center">
            <h1 className="font-bold text-lg text-white">{params.username}</h1>
          </div>
          <h1 className="text-gray-500">@{params.username}</h1>
        </div>

        <div className="mt-2 space-y-3">
          <p className="text-white">Hello, I'm {params.username}</p>
          <div className="py-1 flex space-x-5">
            <div className="flex items-center text-gray-500">
              <BusinessCenterIcon />
              <p>Education</p>
            </div>
            <div className="flex items-center text-gray-500">
              <LocationOnIcon />
              <p>Sweden</p>
            </div>
            <div className="flex items-center text-gray-500">
              <CalendarMonthIcon />
              <p>{userData.user?.created_at}</p>
            </div>
          </div>
        </div>
      </section>

      <section className=" ">
        <div className="text-xs text-gray-400">
          {getUserTweets?.length || 0} Tweets
        </div>
      </section>
      <section className=""></section>
      <section>
        <div>
          {getUserTweets &&
            getUserTweets.map(
              ({ likes, tweet, profile, hasLiked, replies }) => {
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
              }
            )}
        </div>
      </section>
    </div>
  );
};

export default UserProfilePage;
