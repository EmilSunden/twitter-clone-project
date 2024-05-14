import MainComponent from "@/components/main-component";
import { getUser } from "@/utils/auth/auth";
import { redirect } from "next/navigation";


const Home = async () => {
  const user = await getUser();
 
  if(!user) {
    redirect('/signedout');
    return null
  }
  
  return (
      <MainComponent />  
  );
};

export default Home;
