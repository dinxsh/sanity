import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../@/components/ui/avatar";
import { Separator } from "../@/components/ui/separator";

import demoData from "../lib/notification-demo.json";
import { FaBell } from "react-icons/fa";
export default function NotificationBar() {
  return (
    <div className="relative">
      <Popover>
        <PopoverTrigger
          aria-label="notification-trigger"
          className="flex justify-center"
        >
          <FaBell className="size-6" />
        </PopoverTrigger>
        <PopoverContent className="duration-500 mt-5 border border-neutral-700 shadow-none rounded-md bg-black w-[400px] h-[330px] overflow-auto ">
          <div>
            <p className="font-bold text-xl">Notifications</p>
            <Separator className="bg-neutral-600 mt-4" />
            <div className="flex flex-col gap-4  mt-6">
              {demoData.map((e) => {
                return (
                  <div
                    key={e.id}
                    className={`${e.marked_as_read ? "opacity-50" : null}`}
                  >
                    <div className="flex gap-2">
                      <Avatar>
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          className="rounded-md"
                        />
                        <AvatarFallback className="px-2 py-1 rounded-full font-semibold bg-white text-black">
                          CN
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <div className="flex items-start">
                          <p className="font-semibold">{e.title}</p>
                        </div>
                        <p className="text-gray-300 text-sm">{e.message}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(e.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
