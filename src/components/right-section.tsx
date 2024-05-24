import React from "react";

const RightSection = () => {
  const data = {
		profileImg: "/avatars/boy1.png",
	};
  return (
    <div className="hidden lg:block my-4 mx-2">
      <div className="bg-[#16181C] p-4 rounded-md sticky top-2">
        <p className="font-bold">Who to follow</p>
        <div className="flex flex-col gap-4">
          {/* item */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className='flex items-center justify-between gap-4'>
              <div className="flex gap-2 items-center">
                <div className="avatar">
                  <div className="w-8 rounded-full">
                    <img src={data.profileImg || "/avatar-placeholder.png"}/>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold tracking-tight truncate w-28">
                    {/* {user.fullName} */}
                    Recommended user
                  </span>
                  <span className="text-sm text-slate-500">
                    @Recommended user
                  </span>
                </div>
              </div>
              <div>
                <button className="btn bg-white text-black hover:bg-white hover:opacity-90 rounded-full btn-sm">
                  Follow
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSection;
