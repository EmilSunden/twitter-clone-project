ALTER TABLE "replies" ALTER COLUMN "reply_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "tweets" ALTER COLUMN "reply_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "tweets_replies" ALTER COLUMN "reply_id" DROP NOT NULL;