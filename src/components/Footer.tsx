'use client'

import { motion, cubicBezier } from "framer-motion";

export default function Footer () {
    const initialVar = {
        initial: {
          clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
          top: "100px",
        },
        animate: {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          top: "0px",
          transition: {
            ease: cubicBezier(0, 0.55, 0.45, 1),
            duration: 0.75,
          },
        },
      };
    return(
        <div className="w-full h-auto bg-accent">
        <motion.h1
          variants={initialVar}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="relative text-[70px] font-semibold"
        >
          Sanity Gaming
        </motion.h1>
        </div>
    )
}