import { BiExit } from "react-icons/bi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { LogoutButton } from "./LogoutButton";
import { FaUser } from "react-icons/fa";

const UserButton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <FaUser className="text-white w-6 h-6 cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-black text-white border border-gray-800 rounded-md shadow-lg p-2 min-w-[12rem] mt-2 hidden lg:block">
        <DropdownMenuLabel className="text-gray-400 text-sm font-semibold">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="border-t border-gray-700 my-2" />
        <DropdownMenuItem className="flex items-center p-2 hover:bg-gray-800 rounded-md cursor-pointer">
          <LogoutButton>
            <BiExit className="text-red-400 w-5 h-5 mr-2" />
            <span>Logout</span>
          </LogoutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
