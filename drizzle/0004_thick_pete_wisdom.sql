ALTER TABLE "tweets" ALTER COLUMN "reply_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tweets_replies" ALTER COLUMN "reply_id" SET NOT NULL;