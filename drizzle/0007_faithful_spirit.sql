ALTER TABLE "tweets" DROP CONSTRAINT "tweets_reply_id_replies_id_fk";
--> statement-breakpoint
ALTER TABLE "tweets_replies" DROP CONSTRAINT "tweets_reply_id_replies_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tweets" ADD CONSTRAINT "tweets_reply_id_tweets_id_fk" FOREIGN KEY ("reply_id") REFERENCES "public"."tweets"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tweets_replies" ADD CONSTRAINT "tweets_reply_id_tweets_id_fk" FOREIGN KEY ("reply_id") REFERENCES "public"."tweets"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
