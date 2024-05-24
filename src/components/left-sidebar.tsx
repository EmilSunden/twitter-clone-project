import React from "react";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { createSSRClient } from "@/utils/supabase/server";
import TweetDialog from "./client-components/tweet-dialog";
import Logout from "./client-components/logout";
import { Avatar } from "@mui/material";
import XSvg from "./svgs/X";

import { MdHomeFilled } from "react-icons/md";

const LeftSidebar = async () => {
  const supabase = createSSRClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  return (
    <div className="md:flex-[2_2_0] w-18 max-w-52">
      <div className="sticky top-0 left-0 h-screen flex flex-col w-20 md:w-full">
        <Link href="/loggedin" className="flex justify-center md:justify-start">
          <XSvg className="px-2 w-12 h-12 rounded-full fill-white hover:bg-stone-900" />
        </Link>
        <ul className="flex flex-col gap-3 mt-4">
          <li className="flex justify-center md:justify-start">
            <Link
              href="/loggedin"
              className="flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
            >
              <MdHomeFilled className="w-8 h-8 fill-white" />
              <span className="text-lg hidden md:block text-white">Home</span>
            </Link>
          </li>

          <li className="flex justify-center md:justify-start">
            <Link
              href={`/loggedin/${userData.user?.user_metadata.username}`}
              className="flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
            >
              <FaUser className="w-6 h-6 fill-white" />
              <span className="text-lg hidden md:block text-white">Profile</span>
            </Link>
          </li>

          <li className="flex justify-center md:justify-start">
            <TweetDialog />
          </li>
        </ul>

        <Link
          href={`/loggedin/${userData.user?.user_metadata.username}`}
          className="mt-auto mb-10 flex gap-2 items-start transition-all duration-300 hover:bg-[#181818] py-2 px-4 rounded-full"
        >
          <div className="avatar hidden md:inline-flex">
            <div className="w-8 rounded-full">
              <Avatar
                className=""
                alt="profile image"
                src="https://pbs.twimg.com/profile_images/1164982831468220417/_NhTE3XA_400x400.jpg"
                sx={{
                  width: "2rem",
                  height: "2rem",
                  border: "2px solid white",
                }}
              />
            </div>
          </div>
          <div className="flex justify-between flex-1">
            <div className="hidden md:block">
              <p className="text-white font-bold text-sm w-20 truncate">
                {userData.user?.user_metadata.full_name}
              </p>
              <p className="text-slate-500 text-sm">
                {userData.user?.user_metadata.username}
              </p>
            </div>

            <div className="w-5 h-5 cursor-pointer">
              <Logout />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LeftSidebar;
