'use client'
import { createClient } from "@/utils/supabase/client"
import { useTransition } from "react";
import { toast } from "sonner";
import { likeTweet, unlikeTweet } from "@/lib/supabase/mutation";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { cn } from "@/lib/utils";

type LikeButtonProps = {
    tweetId: string,
    likesCount: number | null
    isUserHasLiked: boolean
}

const LikeButton = ({tweetId, likesCount, isUserHasLiked}: LikeButtonProps) => {
    const supabase = createClient();
    const [isLikePending, startTransition] = useTransition();
   
    return (
        <button
        disabled={isLikePending}
        onClick={async () => {
          supabase.auth
            .getUser()
            .then((res) => {
              if (res.data && res.data.user) {
                const user = res.data.user
                startTransition(() =>
                isUserHasLiked 
                ? unlikeTweet({
                    tweetId,
                    userId: user.id,
                })
                : likeTweet({
                    tweetId,
                    userId: user.id,
                  })
                );
              } else {
                toast("please login to like a tweet");
              }
            })
            .catch((err) => {
              toast.error("authentication");
              console.error(err);
            });
        }}
        className="rounded-full space-x-2 flex items-center hover:bg-white/10 transition duration-200 cursor-pointer p-2"
      >
       {
        isUserHasLiked ? <AiFillHeart className="w-5 h-5 text-red-600"/> : <AiOutlineHeart 
        className={cn("w-5 h-5")}
        />
       }
        <span>{likesCount ?? 0}</span>
      </button>
    )
}
export default LikeButton;