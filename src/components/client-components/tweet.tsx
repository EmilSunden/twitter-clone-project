"use client";
import { AiOutlineRetweet } from "react-icons/ai";
import { BsDot, BsThreeDots } from "react-icons/bs";
import { IoStatsChart, IoShareOutline } from "react-icons/io5";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import LikeButton from "./like-button";
import { Tweets, Profile } from "@/lib/db/schema";
import ReplyDialog from "./reply-dialog";
import { useRouter } from "next/navigation";
dayjs.extend(relativeTime);

type TweetProps = {
  tweet: {
    userProfile: Profile;
    tweetDetails: Tweets;
  };
  currentUserId?: string;
  likesCount: number;
  hasLiked: boolean;
  repliesCount: number;
};

const Tweet = ({ tweet, likesCount, hasLiked, repliesCount }: TweetProps) => {
  const router = useRouter();
  return (
    <>
      <div
        key={tweet.tweetDetails.id}
        className="border-b-[0.5px] p-2 border-gray-600 flex space-x-4 w-full"
      >
        <div>
          <div className="w-10 h-10 bg-slate-200 rounded-full" />
        </div>

        <div className="flex flex-col w-full ">
          <div className="flex items-center w-full justify-between">
            <div className="flex items-center space-x-1 w-full">
              <div className="font-bold">
                {tweet.userProfile.fullName ?? ""}
              </div>
              <div 
              onClick={() => {
                router.push(`/${tweet.userProfile.username}`)
              }}
              className="text-gray-500 cursor-pointer">@{tweet.userProfile.username}</div>
              <div className="text-gray-500">
                <BsDot />
              </div>
              <div className="text-gray-500">
                {dayjs(tweet.tweetDetails.createdAt).fromNow()}
              </div>
            </div>
            <div>
              <BsThreeDots />
            </div>
          </div>
          <div
            onClick={() => {
              router.push(`/tweet/${tweet.tweetDetails.id}`);
            }}
            className="text-white text-base hover:bg-white/5 transition-all"
          >
            {tweet.tweetDetails.text}
          </div>

          <div className="bg-slate-400 aspect-square w-full h-80 rounded-xl mt-2">
            {/* MEDIA */}
          </div>

          <div className="flex justify-start items-center space-x-20 mt-2 w-full">
            <ReplyDialog tweet={tweet} repliesCount={repliesCount}/>

            <div className="rounded-full hover:bg-white/10 transition duration-200 cursor-pointer p-2">
              <AiOutlineRetweet />
            </div>

            <LikeButton
              tweetId={tweet.tweetDetails.id}
              likesCount={likesCount}
              isUserHasLiked={hasLiked}
            />

            <div className="rounded-full hover:bg-white/10 transition duration-200 cursor-pointer p-2">
              <IoStatsChart />
            </div>

            <div className="rounded-full hover:bg-white/10 transition duration-200 cursor-pointer p-2">
              <IoShareOutline />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tweet;
