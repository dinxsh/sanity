import { Check, Inbox, Megaphone, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../@/components/ui/avatar";
import { Separator } from "../@/components/ui/separator";

import demoData from "../lib/notification-demo.json";
export default function NotificationBar() {
  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <div>
            <Inbox />
          </div>
        </PopoverTrigger>
        <PopoverContent className="duration-500 mt-4 border border-neutral-700 shadow-none rounded-md bg-black w-screen sm:w-fit sm:mx-12  ">
          <div>
            <p className="font-bold ">Notifications</p>

            <Separator className="bg-neutral-600 mt-4 " />
            <div className="flex flex-col gap-4  mt-6">
              {demoData.map((e) => {
                return (
                  <div
                    key={e.id}
                    className={`${e.marked_as_read ? "opacity-50" : null} flex justify-between items-center`}
                  >
                    <div className="flex gap-2 w-fit h-fit ">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>

                      <div>
                        <div className="flex gap-2 items-start">
                          <p className="font-bold">{e.title}</p>
                        </div>
                        <p className="text-gray-300">{e.message}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(e.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className=" w-fit flex gap-2">
                      <Check className="text-green-700 cursor-pointer" />
                      <X className="text-red-600 cursor-pointer" />
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
