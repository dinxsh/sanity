"use client";

import { useRouter } from "next/navigation";
import { logout } from "../actions/logout";

export const LogoutButton = ({ children }) => {
  const router = useRouter();
  const onClick = () => {
    logout();
    router.push("/sign-in");
  };
  return (
    <div
      onClick={onClick}
      className="cursor-pointer font-sans font-bold text-red-400 flex items-center"
    >
      {children}
    </div>
  );
};
