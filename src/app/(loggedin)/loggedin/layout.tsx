import LeftSidebar from "@/components/left-sidebar";
import RightSection from "@/components/right-section";
import { UserProvider } from "@/components/context/UserContext";
import { Grid } from "@mui/material";

export default function LoggedInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <UserProvider>
        <div className="flex-[4_4_0] mr-auto border-r  ">
          <div className="flex w-full">
            <div
              className={
                "flex justify-end flex-1 p-3 transition duration-300 cursor-pointer sticky top-0  "
              }
            >
              <LeftSidebar />
            </div>
            <div className="flex  p-3 transition duration-300 cursor-pointer relative border-r-[0.5px] border-l-[0.5px] border-gray-600">
              {children}
            </div>
            <div className="flex justify-start  flex-1 p-3 transition duration-300 cursor-pointer relative">
              <RightSection />
            </div>
          </div>
        </div>
      </UserProvider>
    </>
  );
}
