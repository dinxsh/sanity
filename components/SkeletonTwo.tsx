"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const SkeletonTwo = () => {
  const images1 = [
    "https://media.battlexo.com/games/3/image/53a41947-e0a3-453f-9e96-ccd27fb71f67.webp",
    "https://media.battlexo.com/games/4/image/c21f2b45-d008-47c9-ad9b-93efae7b6971.webp",
    // other images...
  ];

  const images2 = [
    "https://media.battlexo.com/games/8/image/40607378-7b44-41d0-8126-3e426ebc08da.webp",
    "https://media.battlexo.com/games/1/image/99df8dff-2ef8-4938-b568-d8b185908c4f.webp",
    // other images...
  ];

  const [rotationValues, setRotationValues] = useState([]);

  useEffect(() => {
    // Generate random rotation values on the client
    const rotations = Array(images1.length + images2.length)
      .fill(0)
      .map(() => Math.random() * 20 - 10);
    setRotationValues(rotations);
  }, []);

  const imageVariants = {
    whileHover: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
    whileTap: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
  };

  return (
    <div className="relative flex flex-col items-center p-8 gap-10 h-full overflow-hidden">
      {/* Images Group 1 */}
      <div className="flex flex-row -ml-20">
        {images1.map((image, idx) => (
          <motion.div
            key={`images-first-${idx}`}
            variants={imageVariants}
            whileHover="whileHover"
            whileTap="whileTap"
            style={{
              rotate: rotationValues[idx] || 0,
            }}
            className="rounded-xl -mr-4 mt-4 p-1 bg-white border border-neutral-100 flex-shrink-0 overflow-hidden"
          >
            <Image
              src={image}
              alt=""
              width="500"
              height="500"
              className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
              draggable="false"
            />
          </motion.div>
        ))}
      </div>
      {/* Images Group 2 */}
      <div className="flex flex-row">
        {images2.map((image, idx) => (
          <motion.div
            key={`images-second-${idx}`}
            variants={imageVariants}
            whileHover="whileHover"
            whileTap="whileTap"
            style={{
              rotate: rotationValues[images1.length + idx] || 0,
            }}
            className="rounded-xl -mr-4 p-1 bg-white border border-neutral-100 flex-shrink-0 overflow-hidden"
          >
            <Image
              src={image}
              alt=""
              width="500"
              height="500"
              className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
              draggable="false"
            />
          </motion.div>
        ))}
      </div>
      {/* Gradients */}
      <div className="absolute left-0 z-[100] inset-y-0 w-20 bg-gradient-to-r from-black to-transparent h-full pointer-events-none" />
      <div className="absolute right-0 z-[100] inset-y-0 w-20 bg-gradient-to-l from-black to-transparent h-full pointer-events-none" />
    </div>
  );
};
