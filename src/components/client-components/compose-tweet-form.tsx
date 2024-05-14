"use client";

import { PostgrestError } from "@supabase/supabase-js";
import { useRef } from "react";
import { toast } from "sonner";

type ComposeTweetFormProps = {
  serverAction: any
};

const ComposeTweetForm = ({ serverAction }: ComposeTweetFormProps) => {
  const resetRef = useRef<HTMLButtonElement>(null)
  const handleSubmitTweet = async (data: any) => {
    try {
      const res = await serverAction(data);
      if (res?.error) {
        return toast.error(res.error.message);
      }

      toast.success("Tweet sent successfully!");
      resetRef.current?.click()
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <form action={handleSubmitTweet} className="flex flex-col w-full h-full">
      <input
        type="text"
        name="tweet"
        className="w-full h-full bg-transparent outline-none border-none border-b-[0.5px] border-gray-600 p-4 placeholder:text-2xl placeholder:text-gray-600"
        placeholder="What's happening?"
      />

      <div className="w-full justify-between items-center flex">
        <div></div>
        <div className="w-full max-w-[100px]">
          <button
            type="submit"
            className="rounded-full  bg-primary text-lg px-4 py-2 w-full text-center hover:bg-opacity-70 transition duration-200 font-bold"
          >
            Tweet
          </button>
          <button 
          className="invisible"
          ref={resetRef}
          type="reset"></button>
        </div>
      </div>
    </form>
  );
};

export default ComposeTweetForm;
