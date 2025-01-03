import { cn } from "../../@/lib/utils";
import Image from "next/image";
import createGlobe from "cobe";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { IconBrandDiscordFilled } from "@tabler/icons-react";
import { SkeletonTwo } from "../SkeletonTwo";

export default function FeaturesSectionGrid() {
  const features = [
    {
      title: "Create Tournaments Effortlessly",
      description:
        "Organize and manage your own esports tournaments with ease using our intuitive interface.",
      skeleton: <SkeletonOne />,
      className: "col-span-1 lg:col-span-4 border-b lg:border-r",
    },
    {
      title: "Most Games Included",
      description:
        "Join tournaments and play across a wide range of popular games.",
      skeleton: <SkeletonTwo />,
      className: "border-b col-span-1 lg:col-span-2",
    },
    {
      title: "Join Our Discord Community",
      description:
        "Connect with fellow gamers, stay updated and participate in exclusive events by joining our Discord community.",
      skeleton: <SkeletonThree />,
      className: "col-span-1 lg:col-span-3 lg:border-r ",
    },
    {
      title: "Global Esports Community",
      description:
        "Connect and compete with players from around the world on our global platform.",
      skeleton: <SkeletonFour />,
      className: "col-span-1 lg:col-span-3 border-b lg:border-none relative",
    },
  ];

  return (
    <div className="relative z-20 pt-5 pb-5 lg:py-20 max-w-6xl mx-auto">
      <div className="px-8">
        <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-white">
          Unlike any other Esports platform
        </h4>

        <p className="text-sm lg:text-base  max-w-2xl  my-4 mx-auto text-neutral-500 text-center font-normal">
          Sanity Gaming covers every single aspect of esports community. Which a
          gamer desires we aim to connect organizers with players.
        </p>
      </div>

      <div className="relative ">
        <div className="grid grid-cols-1 lg:grid-cols-6 mt-12 border rounded-md">
          {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
              <FeatureTitle className="text-white">
                {feature.title}
              </FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className=" h-full w-full ">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </div>
  );
}

const FeatureCard = ({ children, className }) => {
  return (
    <div className={cn(`p-4 sm:p-8 relative overflow-hidden`, className)}>
      {children}
    </div>
  );
};

const FeatureTitle = ({ children }) => {
  return (
    <p className=" max-w-5xl mx-auto text-left tracking-tight text-black text-xl md:text-2xl md:leading-snug">
      {children}
    </p>
  );
};

const FeatureDescription = ({ children }) => {
  return (
    <p
      className={cn(
        "text-sm md:text-base  max-w-4xl text-left mx-auto",
        "text-neutral-500 text-center font-normal",
        "text-left max-w-sm mx-0 md:text-sm my-2",
      )}
    >
      {children}
    </p>
  );
};

export const SkeletonOne = () => {
  return (
    <div className="relative flex py-8 px-2 gap-10 h-full">
      <div className="w-full   p-5  mx-auto shadow-2xl group h-full">
        <div className="flex  relative flex-1 w-full flex-col space-y-2  ">
          {/* TODO */}
          <Image
            src="/hero.jpg"
            alt="header"
            width={1000}
            height={1000}
            className="full rounded-sm "
            draggable="false"
          />
          <div className="absolute bottom-0 z-40 inset-x-0 h-1/2 bg-gradient-to-t from-black via-black/80 to-transparent w-full pointer-events-none " />
          <div className="absolute top-0 z-40 inset-x-0 h-60 bg-gradient-to-b from-black via-transparent to-transparent w-full pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export const SkeletonThree = () => {
  const [showLogo, setShowLogo] = useState(false);

  return (
    <Link
      href="https://discord.com/invite/AB2vCdyw"
      target="__blank"
      className="relative flex gap-10  h-full group/image border-b"
      aria-label="discord-btn"
    >
      <div className="w-full  mx-auto bg-transparent group h-full">
        <div
          className="flex flex-1 w-full h-full flex-col space-y-2 relative"
          onMouseEnter={() => setShowLogo(true)}
          onMouseLeave={() => setShowLogo(false)}
        >
          {/* TODO */}
          {showLogo ? (
            <IconBrandDiscordFilled className="h-20 w-20 mx-auto top-1/4 absolute z-10 inset-0 text-white" />
          ) : (
            ""
          )}
          <Image
            src="/discord-bg.png"
            alt="header"
            width={800}
            height={800}
            className="mt-2 object-cover object-center rounded-sm blur-none group-hover/image:blur-md transition-all duration-200"
            draggable="false"
          />
        </div>
      </div>
    </Link>
  );
};

// export const SkeletonTwo = () => {
//   const images1 = [
//     "https://media.battlexo.com/games/3/image/53a41947-e0a3-453f-9e96-ccd27fb71f67.webp",
//     "https://media.battlexo.com/games/4/image/c21f2b45-d008-47c9-ad9b-93efae7b6971.webp",
//     "https://media.battlexo.com/games/5/image/b166cbe8-b1ef-4bea-82bb-b1879d0e7a1e.webp",
//     "https://media.battlexo.com/games/25/image/1eed4e70-1fdf-4d9f-847b-44b7909e8eb7.webp",
//     "https://media.battlexo.com/games/20/image/0b631109-dcfd-4490-be35-3cc404d2b492.webp",
//   ];

//   const images2 = [
//     "https://media.battlexo.com/games/8/image/40607378-7b44-41d0-8126-3e426ebc08da.webp",
//     "https://media.battlexo.com/games/1/image/99df8dff-2ef8-4938-b568-d8b185908c4f.webp",
//     "https://media.battlexo.com/games/10/image/04bc59e1-ebee-41d7-bcf7-e9a387bf95e7.webp",
//     "https://media.battlexo.com/games/14/image/24aa86db-9dd5-4cd1-9eb5-ac2dee76add7.webp",
//     "https://media.battlexo.com/games/13/image/e46b91e6-4867-4f05-9007-b9331cfd3ba0.webp",
//   ];

//   const imageVariants = {
//     whileHover: {
//       scale: 1.1,
//       rotate: 0,
//       zIndex: 100,
//     },
//     whileTap: {
//       scale: 1.1,
//       rotate: 0,
//       zIndex: 100,
//     },
//   };
//   return (
//     <div className="relative flex flex-col items-center p-8 gap-10 h-full overflow-hidden">
//       {/* TODO */}
//       <div className="flex flex-row -ml-20">
//         {images1.map((image, idx) => (
//           <motion.div
//             variants={imageVariants}
//             key={"images-first" + idx}
//             style={{
//               rotate: Math.random() * 20 - 10,
//             }}
//             whileHover="whileHover"
//             whileTap="whileTap"
//             className="rounded-xl -mr-4 mt-4 p-1 bg-white border border-neutral-100 flex-shrink-0 overflow-hidden"
//           >
//             <Image
//               src={image}
//               alt=""
//               width="500"
//               height="500"
//               className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
//               draggable="false"
//             />
//           </motion.div>
//         ))}
//       </div>
//       <div className="flex flex-row">
//         {images2.map((image, idx) => (
//           <motion.div
//             key={"images-second" + idx}
//             style={{
//               rotate: Math.random() * 20 - 10,
//             }}
//             variants={imageVariants}
//             whileHover="whileHover"
//             whileTap="whileTap"
//             className="rounded-xl -mr-4 p-1 bg-white border border-neutral-100 flex-shrink-0 overflow-hidden"
//           >
//             <Image
//               src={image}
//               alt=""
//               width="500"
//               height="500"
//               className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
//               draggable="false"
//             />
//           </motion.div>
//         ))}
//       </div>
//       <div className="absolute left-0 z-[100] inset-y-0 w-20 bg-gradient-to-r from-black  to-transparent  h-full pointer-events-none" />
//       <div className="absolute right-0 z-[100] inset-y-0 w-20 bg-gradient-to-l from-black  to-transparent h-full pointer-events-none" />
//     </div>
//   );
// };

export const SkeletonFour = () => {
  return (
    <div className="h-60 md:h-60  flex flex-col items-center absolute w-full right-0 bg-transparent mt-10">
      {/* <Globe className="absolute -right-10 md:-right-20 -bottom-80 md:-bottom-72" /> */}
      <Image
        src="/assets/globe.png"
        alt=""
        width={500}
        height={500}
        className="w-full "
      />
    </div>
  );
};

// export const Globe = ({ className }) => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     let phi = 0;

//     if (!canvasRef.current) return;

//     const globe = createGlobe(canvasRef.current, {
//       devicePixelRatio: 2,
//       width: 600 * 2,
//       height: 600 * 2,
//       phi: 1,
//       theta: 0,
//       dark: 1,
//       diffuse: 1.2,
//       mapSamples: 16000,
//       mapBrightness: 2,
//       baseColor: [0.3, 0.3, 0.3],
//       markerColor: [0.1, 0.8, 1],
//       glowColor: [1, 1, 1],
//       markers: [
//         // longitude latitude
//         { location: [37.7595, -122.4367], size: 0.1 },
//         { location: [40.7128, -74.006], size: 0.1 },
//       ],
//       onRender: (state) => {
//         // Called on every animation frame.
//         // `state` will be an empty object, return updated params.
//         state.phi = phi;
//         phi += 0.002;
//       },
//     });

//     return () => {
//       globe.destroy();
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
//       className={className}
//     />
//   );
// };
