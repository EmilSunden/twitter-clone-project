import Tweet from "@/components/client-components/tweet";
import { getTweets } from "@/lib/supabase/queries";
import { createSSRClient } from "@/utils/supabase/server";

const TweetPage = async ({ params }: { params: { id: string } }) => {
  const supabase = createSSRClient();
  const { data: userData, error } = await supabase.auth.getUser();
  const tweet = await getTweets({
    currentUserID: userData.user?.id,
    getSingleTweetId: params.id,
  });
  const repliesRes = await getTweets({
    currentUserID: userData.user?.id,
    orderBy: true,
    replyId: tweet![0].tweet.id,
  });

  return (
    <main className="flex w-full h-full min-h-screen flex-col">
      {tweet ? (
        <Tweet
          hasLiked={Boolean(tweet[0].hasLiked)}
          likesCount={tweet[0].likes.length ?? 0}
          tweet={{
            tweetDetails: tweet[0].tweet,
            userProfile: tweet[0].profile,
          }}
          currentUserId={userData.user?.id}
          repliesCount={tweet[0].replies.length}
        />
      ) : (
        <div>no tweet found</div>
      )}
      {repliesRes &&
        repliesRes.map(({ hasLiked, likes, profile, replies, tweet }) => {
          return (
            <Tweet
              key={tweet.id}
              hasLiked={hasLiked}
              likesCount={likes.length}
              tweet={{
                tweetDetails: tweet,
                userProfile: profile,
              }}
              repliesCount={replies.length}
              currentUserId={userData.user?.id}
            />
          );
        })}
    </main>
  );
};

export default TweetPage;
