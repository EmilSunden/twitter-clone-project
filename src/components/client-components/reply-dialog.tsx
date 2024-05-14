"use client";
import { BsDot, BsThreeDots, BsChat } from "react-icons/bs";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "../ui/dialog";
import { Profile, Tweets } from "@/lib/db/schema";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client"
import { useTransition } from "react";
import { toast } from "sonner";
import { reply } from "@/lib/supabase/mutation";

dayjs.extend(relativeTime);

type ReplyDialogProps = {
  tweet: {
    userProfile: Profile;
    tweetDetails: Tweets;
  };
  repliesCount: number;
};

const ReplyDialog = ({ tweet, repliesCount }: ReplyDialogProps) => {
    const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false)
    const [replyText, setReplyText] = useState<string>("")
    const [isReplyPending, startTransition] = useTransition();
    const supabase = createClient();
   
  return (
    <Dialog onOpenChange={setIsReplyDialogOpen} open={isReplyDialogOpen}>
      <DialogTrigger>
        <button 
        onClick={() => {
            console.log("reply dialog clicked")
        }}
        className="rounded-full space-x-2 flex items-center hover:bg-white/10 transition duration-200 cursor-pointer p-3"></button>
        <BsChat />
        <span>{repliesCount || 0}</span>
      </DialogTrigger>
      <DialogContent className="bg-black border-none text-white sm:max-w-2xl">
        <div className="border-b-[0.5px] p-2 border-gray-600 flex space-x-4 text-gray-800">
          <div>
            <div className="w-10 h-10 bg-slate-200 rounded-full" />
          </div>
          <div className="flex flex-col w-full ">
            <div className="flex items-center w-full justify-between">
              <div className="flex items-center space-x-1 w-full">
                <div className="font-bold">
                  {tweet.userProfile.fullName ?? ""}
                </div>
                <div className="text-gray-500">
                  @{tweet.userProfile.username}
                </div>
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
            <div className="text-white text-base my-4">
              {tweet.tweetDetails.text}
            </div>
          </div>
        </div>
        <div>
            Replying to @{tweet.userProfile.username}
        </div>
        <div className="flex w-full items-center space-x-2">
            <div>
                <div className="w-10 h-10 bg-slate-200 rounded-full"/>       
            </div>
            <textarea 
            value={replyText}
            onChange={e => setReplyText(e.target.value)}
            className="w-full h-full text-2xl placeholder:text-gray-600 bg-transparent border-b-[0.5px] border-gray-600 p-4 outline-none "/>


        </div>
        <div className="w-full justify-between items-center flex">
        <div></div>
        <div className="w-full max-w-[100px]">
          <button
            onClick={async () => {
                supabase.auth
                  .getUser()
                  .then((res) => {
                    if (res.data && res.data.user) {
                      const user = res.data.user
                      startTransition(() =>
                        {
                            reply({
                                replyText,
                                tweetId: tweet.tweetDetails.id,
                                userId: user.id
                            }).then(() => {
                                setIsReplyDialogOpen(false)
                            }).catch((error) => {
                                console.log(error)
                            })
                        }
                      );
                    } else {
                      toast("please login to reply to a tweet");
                    }
                  })
                  .catch((err) => {
                    toast.error("authentication");
                    console.error(err);
                  });
              }}
            className="rounded-full bg-twitterColor text-lg px-4 py-2 w-full text-center hover:bg-opacity-70 transition duration-200 font-bold"
          >
            Reply
          </button>
          {/* <button 
          className="invisible"
          ref={resetRef}
          type="reset"></button> */}
        </div>
      </div>
      </DialogContent>
    </Dialog>
  );
};
export default ReplyDialog;
