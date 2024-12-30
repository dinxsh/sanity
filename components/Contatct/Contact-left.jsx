import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import { socialLinks } from "../Footer";

export default function ContactLeftComp({ className }) {
  return (
    <div className={cn(className, "relative ")}>
      <Image
        width={500}
        height={500}
        src={"/contact.jpg"}
        alt="Contact-img"
        className="z-[-1] absolute h-full w-full "
      />
      <div className="p-4 md:p-8 xl:p-12 flex flex-col justify-end gap-6 h-full">
        <div className="flex gap-2 items-center">
          <Image
            width={1000}
            height={1000}
            src={"/assets/logo.jpg"}
            alt="Contact-img"
            className="w-8 md:w-12 rounded-full"
          />
          <p className="font-bold text-black text-3xl md:text-4xl lg:text-5xl">
            Sanity Gaming
          </p>
        </div>
        <p className="text-gray-500 md:w-3/4">
          The Go-To Esports Platform at the intersection of esports and mental
          well-being
        </p>

        <div className="flex gap-4">
          {socialLinks.map((e, i) => {
            return (
              <Link href={e.link} key={i} aria-label={`${e.title}-social`}>
                <e.icon className="invert size-6" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
