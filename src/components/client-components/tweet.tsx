"use client";
import { BsDot } from "react-icons/bs";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import LikeButton from "./like-button";
import ReplyDialog from "./reply-dialog";
import { useRouter } from "next/navigation";
import { TweetProps } from "types/types";

dayjs.extend(relativeTime);

const Tweet = ({ tweet, likesCount, hasLiked, repliesCount }: TweetProps) => {
  const router = useRouter();
  return (
    <>
      <div className="flex gap-2 items-start p-4 border-b border-gray-700">
        <div>
            <div className="rounded-full h-10 w-10 bg-slate-500"></div>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center w-full justify-between">
            <div className="flex items-center space-x-1 w-full">
              <div
                onClick={() => {
                  router.push(`/loggedin/${tweet.userProfile.username}`);
                }}
                className="font-bold cursor-pointer text-white"
              >
                {tweet.userProfile.fullName ?? ""}
              </div>

              <div
                onClick={() => {
                  router.push(`/loggedin/${tweet.userProfile.username}`);
                }}
                className="text-gray-500 cursor-pointer"
              >
                @{tweet.userProfile.username}
              </div>

              <div className="text-gray-500">
                <BsDot />
              </div>
              <div className="text-gray-500">
                {dayjs(tweet.tweetDetails.createdAt).fromNow()}
              </div>
            </div>
            <div></div>
          </div>
          <div
            onClick={() => {
              router.push(`/loggedin/tweet/${tweet.tweetDetails.id}`);
            }}
            className="text-white text-base w-full cursor-pointer hover:bg-white/5 transition-all"
          >
            {tweet.tweetDetails.text}
          </div>
          {/* <div className="bg-slate-400 aspect-square w-full h-80 rounded-xl mt-2"></div> */}
          <div className="flex items-center justify-start space-x-20 mt-2 w-full">
            <ReplyDialog tweet={tweet} repliesCount={repliesCount} />

            {/* <div className="rounded-full hover:bg-white/10 transition duration-200 cursor-pointer">
              <AiOutlineRetweet />
            </div> */}
            <LikeButton
              tweetId={tweet.tweetDetails.id}
              likesCount={likesCount}
              isUserHasLiked={hasLiked}
            />
            {/* <div className="rounded-full hover:bg-white/10 transition duration-200 cursor-pointer">
              <IoStatsChart />
            </div> */}
            {/* <div className="rounded-full hover:bg-white/10 transition duration-200 cursor-pointer">
              <IoShareOutline /> 
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Tweet;
