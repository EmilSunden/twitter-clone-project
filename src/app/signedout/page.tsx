// /app/signedout/page.tsx
import { BsTwitterX } from "react-icons/bs";
import { FC } from "react";
import Link from "next/link";


const SignedOutPage: FC = () => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="flex flex-row items-start justify-center w-full max-w-4xl p-6">
        {/* Left Div - Contains the logo */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-2/4">
            {" "}
            {/* Adjust the width as needed */}
            <BsTwitterX className="w-full h-auto text-neutral" />
          </div>
        </div>

        {/* Right Div - Contains Headings and Buttons */}
        <div className="flex-1 flex flex-col items-start space-y-4">
          <h1 className="text-4xl font-bold mb-4">Happening right now</h1>
          <h2 className="text-2xl font-bold">Join today.</h2>
          <div className="flex flex-col space-y-2">
            <Link href="/signup">
              <p className="px-14 py-1 bg-primary text-white rounded-full hover:bg-blue-600 transition-colors text-sm font-medium">
                Create Account
              </p>
            </Link>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="mt-4 mb-2">Already signed up?</p>
            <Link href="/login">
              <p className="px-10 py-1 text-primary rounded-full hover:bg-gray-800 transition-colors text-sm font-medium bg-opacity-0 border border-white/40 ">
                Log in
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignedOutPage;
