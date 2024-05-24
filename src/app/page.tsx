// /app/signedout/page.tsx
import { BsTwitterX } from "react-icons/bs";
import { FC } from "react";
import Link from "next/link";
import XSvg from "@/components/svgs/X";

const Page: FC = () => {
  return (
    <div className="max-w-screen-xl mx-auto flex h-screen px-10">
      <div className="flex-1 hidden lg:flex items-center  justify-center">
        <XSvg className=" lg:w-2/3 fill-white" />
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <form className="lg:w-2/3  mx-auto md:mx-20 flex gap-4 flex-col">
          <h1 className="text-4xl font-extrabold text-white">Join today.</h1>
        </form>
        <div className="flex flex-col lg:w-2/3 gap-2 mt-4">
          <p className="text-white text-lg">{"Don't"} have an account?</p>
          <Link href="/signup">
            <button className="btn rounded-full btn-primary text-white btn-outline w-full">
              Sign up
            </button>
          </Link>
        </div>

        <div className="flex flex-col lg:w-2/3 gap-2 mt-4">
          <p className="text-white text-lg">Already signed up?</p>
          <Link href="/login">
            <button className="btn rounded-full btn-primary text-white btn-outline w-full">
              Log in
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
