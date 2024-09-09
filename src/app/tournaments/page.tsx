"use client";

import { cubicBezier, motion } from "framer-motion";

export default function Tournament() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <span className="">
        <motion.h1
          initial={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          transition={{
            duration: 0.35,
            eaes: cubicBezier(0.65, 0, 0.35, 1),
          }}
          className="text-[100px] font-medium tracking-tight max-sm:hidden"
        >
          COMING SOON
        </motion.h1>
        <motion.h1
          initial={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          className="text-[100px] font-medium tracking-tight max-md:text-[70px] max-md:text-center text-transparent"
          style={{
            WebkitTextStrokeWidth: "1.5px",
            WebkitTextStrokeColor: "#d00000",
          }}
        >
          COMING SOON
        </motion.h1>
        <motion.h1
          initial={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            position: "absolute",
            top: "60%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          transition={{
            duration: 0.35,
            eaes: cubicBezier(0.65, 0, 0.35, 1),
          }}
          className="text-[100px] font-medium tracking-tight max-sm:hidden"
        >
          COMING SOON
        </motion.h1>
      </span>

      <motion.p
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
          eaes: cubicBezier(0.65, 0, 0.35, 1),
        }}
        className="z-10 text-white text-center text-[20px] bg-primary"
      >
        THIS FEATURE IS COMING SOON STAY TUNED
      </motion.p>
    </div>
  );
}
