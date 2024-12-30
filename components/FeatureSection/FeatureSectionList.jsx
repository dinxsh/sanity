import { cn } from "../../@/lib/utils";
import {
  IconAward,
  IconBuildingCommunity,
  IconPencilPlus,
  IconTournament,
} from "@tabler/icons-react";

export default function FeaturesSectionList() {
  const features = [
    {
      title: "Seamless Tournament Creation",
      description:
        "Easily create and manage your own tournaments with our intuitive platform.",
      icon: <IconPencilPlus />,
    },
    {
      title: "Join Exciting Tournaments",
      description: "Browse and join ongoing tournaments across various games.",
      icon: <IconTournament />,
    },
    {
      title: "Community and Social Features",
      description:
        "Connect with fellow gamers through our integrated social features.",
      icon: <IconBuildingCommunity />,
    },

    {
      title: "Exclusive Rewards and Prizes",
      description:
        "Compete for exclusive rewards and prizes in our tournaments.",
      icon: <IconAward />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-6xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({ title, description, icon, index }) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group",
        (index === 0 || index === 4) && "lg:border-l",
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-white">{icon}</div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 group-hover:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover:scale-105 transition-all duration-200 inline-block text-neutral-200 group-hover:text-black">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-700 max-w-xs relative z-10 px-10 group-hover:scale-105 transition-all duration-200">
        {description}
      </p>
    </div>
  );
};
