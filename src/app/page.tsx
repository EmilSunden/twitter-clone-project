import { BiHomeCircle } from "react-icons/bi";
import { BsBell, BsThreeDots, BsTwitter, BsTwitterX } from "react-icons/bs";
import { HiOutlineHashtag } from "react-icons/hi";
import { FaRegEnvelope } from "react-icons/fa";
import { BsBookmark } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import Link from "next/link";
const NAVIGATION_ITEMS = [
  {
    title: "Twitter",
    icon: BsTwitterX,
  },
  {
    title: "Home",
    icon: BiHomeCircle,
  },
  {
    title: "Explore",
    icon: HiOutlineHashtag,
  },
  {
    title: "Notifications",
    icon: BsBell,
  },
  {
    title: "Messages",
    icon: FaRegEnvelope,
  },
  {
    title: "Bookmarks",
    icon: BsBookmark,
  },
  {
    title: "Profile",
    icon: BiUser,
  },
];
const Home = () => {
  return (
    <div className="w-full h-full flex justify-center items-center relative bg-black">
      <div className="max-w-screen-xl w-full h-full flex relative">
        {/* left sidebar for navigation/header */}
        <section className="fixed w-[275px] flex flex-col h-screen items-stretch">
          <div className="flex flex-col space-y-4 items-stretch mt-4 h-full">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                className="hover:bg-white/10 text-2xl transition duration-200 rounded-3xl py-2 px-6 flex items-center justify-start w-fit space-x-4"
                href={`/${item.title.toLowerCase()}`}
                key={item.title}
              >
                <div>
                  <item.icon />
                </div>
                {item.title !== "Twitter" && (
                  <div className="">{item.title}</div>
                )}
              </Link>
            ))}
            <button className="rounded-full m-4 bg-primary p-4 text-2xl text-center hover:bg-opacity-70 transition duration-200">
              Tweet
            </button>
          </div>
          <button className="flex items-center space-x-2 rounded-full m-4 bg-transparent p-4 text-center hover:bg-white/10 transition duration-200 w-full justify-between">
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-slate-400 w-10 h-10 "></div>
              <div className="text-left text-sm">
                <div className="font-semibold">ZemiHD</div>
                <div className="">@zemihd</div>
              </div>
            </div>

            <div>
              <BsThreeDots />
            </div>
          </button>
        </section>

        {/* <main></main>

        <section></section> */}
      </div>
    </div>
  );
};

export default Home;
