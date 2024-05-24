"use client";
import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { createTweet } from "@/lib/supabase/mutation";
import { useUser } from "../context/UserContext";
import { Avatar } from "@mui/material";
const TweetDialog = () => {
  const [isTweetDialogOpen, setIsTweetDialogOpen] = useState(false);
  const [tweetText, setTweetText] = useState(""); // Initialize with existing text or empty
  const supabase = createClient();
  const { user } = useUser();
  const handleTweet = async () => {
    const { data: user, error: authError } = await supabase.auth.getUser();

    if (!user) {
      toast("Please login to post a tweet.");
      return;
    }

    if (tweetText.trim() === "") {
      toast("Please enter some text for your tweet.");
      return;
    }

    try {
      await createTweet({
        tweetText,
        userId: user.user?.id ?? "default-user",
      });
      setIsTweetDialogOpen(false);
      setTweetText("");
      toast("Tweet posted successfully!");
    } catch (error) {
      toast.error("Failed to post tweet.");
      console.error(error);
    }
  };

  return (
    <Dialog onOpenChange={setIsTweetDialogOpen} open={isTweetDialogOpen}>
      <DialogTrigger asChild>
        <button className="rounded-full btn btn-primary text-lg px-4 py-2 mt-16 w-full text-center hover:bg-opacity-70 transition duration-200 font-bold text-white">
          Tweet
        </button>
      </DialogTrigger>
      <DialogContent className="bg-black border-none text-white sm:max-w-2xl">
        <div className="p-2 flex space-x-4 text-gray-800">
          <div>
            {/* <div className="w-10 h-10 bg-slate-200 rounded-full" /> */}
            <Avatar
            className="transform"
            alt="profile image"
            src="https://pbs.twimg.com/profile_images/1164982831468220417/_NhTE3XA_400x400.jpg"
            sx={{
              width: "4rem",
              height: "4rem",
              border: "4px solid white",
            }}
          />
          </div>
          <div className="flex flex-col w-full ">
            <div className="flex items-center w-full justify-between">
              <div className="flex items-center space-x-1 w-full">
              <div className="font-bold">
                  {user?.fullName }
                </div>
                <div className="text-gray-500">
                  @{user?.username}
                </div>
              </div> 
            </div>
            
          </div>
        </div>
         <div className="flex w-full items-center space-x-2">
          <textarea
            value={tweetText}
            onChange={(e) => setTweetText(e.target.value)}
            className="w-full h-full text-2xl placeholder:text-gray-600 bg-transparent border-b-[0.5px] border-gray-600 p-4 outline-none "
            placeholder="What's happening?"
         />
        </div>
        <div className="w-full justify-between items-center flex">
          <div></div>
          <div className="w-full max-w-[100px]">
            <button
            onClick={handleTweet}
              className="rounded-full btn btn-primary text-lg px-4 py-2 w-full text-center hover:bg-opacity-70 transition duration-200 font-bold"
            >
              Tweet
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TweetDialog;
