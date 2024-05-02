import LeftSidebar from "@/components/LeftSidebar";
import { AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import { BsChat, BsDot, BsThreeDots } from "react-icons/bs";
import { IoShareOutline, IoStatsChart } from "react-icons/io5";

const Home = () => {
  return (
    <div className="w-full h-full flex justify-center items-center relative bg-black">
      <div className="max-w-screen-xl w-full h-full flex relative">
        {/* left sidebar for navigation/header */}
        <LeftSidebar />

        <main className="ml-[275px] flex w-full max-w-[600px] h-full min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-gray-600">
          <h1 className="text-xl font-bold my-4 p-6 backdrop-blur bg-black/10 sticky top-0">
            Home
          </h1>
          <div className="border-t-[0.5px] border-b-[0.5px] border-gray-600 relative flex items-stretch space-x-2 py-6 px-4">
            <div className="w-11 h-11 bg-slate-400 rounded-full flex-none"></div>
            <div className="flex flex-col w-full h-full">
              <input
                type="text"
                className="w-full h-full bg-transparent outline-none border-none border-b-[0.5px] border-gray-600 p-4 placeholder:text-2xl placeholder:text-gray-600"
                placeholder="What's happening?"
              />

              <div className="w-full justify-between items-center flex">
                <div></div>
                <div className="w-full max-w-[100px]">
                  <button className="rounded-full  bg-primary text-lg px-4 py-2 w-full text-center hover:bg-opacity-70 transition duration-200 font-bold">
                    Tweet
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="border-b-[0.5px] p-2 border-gray-600 flex space-x-4"
              >
                <div>
                  <div className="w-10 h-10 bg-slate-200 rounded-full" />
                </div>

                <div className="flex flex-col ">
                  <div className="flex items-center w-full justify-between">
                    <div className="flex items-center space-x-1 w-full">
                      <div className="font-bold">ZemiHD</div>
                      <div className="text-gray-500">@zemihd</div>
                      <div className="text-gray-500">
                        <BsDot />
                      </div>
                      <div className="text-gray-500">1 hour ago</div>
                    </div>
                    <div>
                      <BsThreeDots/>
                    </div>
                  </div>
                  <div className="text-white text-base ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Modi molestias culpa in et impedit delectus, eligendi
                    consectetur rem nostrum accusantium perferendis veniam,
                    dolorem ratione nulla quod vel, assumenda harum debitis.
                  </div>

                  <div className="bg-slate-400 aspect-square w-full h-80 rounded-xl mt-2">
                    {/* MEDIA */}
                  </div>
                  <div className="flex justify-start items-center space-x-20 mt-2 w-full">
                    <div className="rounded-full hover:bg-white/10 transition duration-200 cursor-pointer p-2">
                      <BsChat />
                    </div>
                    <div className="rounded-full hover:bg-white/10 transition duration-200 cursor-pointer p-2">
                      <AiOutlineRetweet />
                    </div>
                    <div className="rounded-full hover:bg-white/10 transition duration-200 cursor-pointer p-2">
                      <AiOutlineHeart />
                    </div>
                    <div className="rounded-full hover:bg-white/10 transition duration-200 cursor-pointer p-2">
                      <IoStatsChart />
                    </div>
                    <div className="rounded-full hover:bg-white/10 transition duration-200 cursor-pointer p-2">
                      <IoShareOutline />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
        {/* <main></main>

        <section></section> */}
      </div>
    </div>
  );
};

export default Home;
