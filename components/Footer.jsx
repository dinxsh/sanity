"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { FaDiscord, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const socialLinks = [
  {
    title: "instagram",
    icon: FaInstagram,
    link: "https://instagram.com/sanitygaming_global",
  },
  {
    title: "discord",
    icon: FaDiscord,
    link: "https://discord.gg/AB2vCdyw",
  },
  {
    title: "youtube",
    icon: FaYoutube,
    link: "https://youtube.com/@sanityesports_global",
  },
  {
    title: "linkedin",
    icon: FaLinkedin,
    link: "https://www.linkedin.com/company/sanity-esports/",
  },
];

export default function Footer() {
  return (
    <div className="grid grid-cols-1 px-[5%] mt-10 pt-10 md:px-[10%] lg:px-[20%] shadow-sm border-t transition-all">
      <div className="flex flex-col md:flex-row gap-20 justify-between transition-all">
        {/* main sec */}
        <div className="flex flex-col">
          {/* logo */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="https://sanityesports.live/sanity_esports_logo.jpeg"
                alt="logo"
                height={40}
                width={40}
                className="rounded-xl"
              />
              <h1 className="text-2xl font-semibold mt-1">Sanity Gaming</h1>
            </Link>
          </div>

          {/* desc */}
          <div className="mt-5 max-w-sm leading-relaxed font-medium text-gray-600 dark:text-gray-400">
            <p>
              Sanity Gaming covers every single aspect of esports community.
              Which a gamer desires we aim to connect organizers with players.
              Host official sanity tournaments and many more
            </p>
          </div>

          {/* social links */}
          <div className="flex gap-4 mt-10 ml-2">
            {socialLinks.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                target="_blank"
                className="hover:scale-110 transition-all"
              >
                {/* <item.icon /> */}
                <item.icon size={24} className="text-gray-500" />
              </Link>
            ))}
          </div>
        </div>

        {/* Important links */}
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-semibold">Important Links</h1>
          <div className="flex flex-col gap-4 font-medium text-gray-600 dark:text-gray-400">
            <Link href="https://discord.com/invite/AB2vCdyw">
              Join Community
            </Link>
            <Link href="/contact"> Contact</Link>
          </div>
        </div>
      </div>

      <div className="border-t mt-20 py-10 text-sm text-center text-gray-600 dark:text-gray-400">
        Built and maintained by Sanity Gaming - © 2024
      </div>
    </div>
  );
}
