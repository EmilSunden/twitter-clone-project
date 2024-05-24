export type UserProfile = {
    id: string;
    username: string;
    fullName: string;
    avatarUrl?: string;
  };
  
  // Define the context type, including possible states (user can be null if not logged in)
  export type UserContextType = {
    user: UserProfile | null;
    setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  };


  export type ReplyDialogProps = {
    tweet: {
      userProfile: Profile;
      tweetDetails: Tweets;
    };
    repliesCount: number;
  };
  

  export type ComposeTweetFormProps = {
    serverAction: any;
  };

  export type LikeButtonProps = {
    tweetId: string;
    likesCount: number | null;
    isUserHasLiked: boolean;
  };

export type TweetProps = {
  tweet: {
    userProfile: Profile;
    tweetDetails: Tweets;
  };
  currentUserId?: string;
  likesCount: number;
  hasLiked: boolean;
  repliesCount: number;
};