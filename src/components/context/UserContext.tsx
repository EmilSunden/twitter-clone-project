"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { createClient } from "@/utils/supabase/client";
import { UserContextType, UserProfile } from "types/types";
import { useRouter } from "next/navigation";

interface UserProviderProps {
  children: ReactNode; // This defines that UserProvider expects children
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: userData, error } = await supabase.auth.getUser();
        if (error) throw error;

        if (userData) {
          const userProfile: UserProfile = {
            id: userData.user.id,
            username: userData.user.user_metadata.username,
            fullName: userData.user.user_metadata.full_name,
            avatarUrl: userData.user.user_metadata.avatar_url,
          };
          setUser(userProfile);
        } else {
          router.push("/");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        router.push("/");
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
