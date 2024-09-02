import { cubicBezier, motion } from "framer-motion";
import Image from "next/image";

export default function Features() {
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
  return (
    <section className="w-full flex flex-col items-center justify-center py-40 border-x-[1px]">
      <motion.h1
        variants={initialVar}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="relative text-[100px] font-semibold mb-20"
      >
        Freatures We Provide
      </motion.h1>
      <div className="w-[50%] grid grid-cols-2 gap-4">
        <div className="border-[1px] h-[250px] p-8 flex flex-col justify-between leading-tight">
          <Image
            src={"/assets/ui/create.svg"}
            height={40}
            width={40}
            alt="Create"
          />
          <motion.h1
            variants={initialVar}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-[30px] font-semibold"
          >
            Seamless Tournament Creation
          </motion.h1>
          <motion.p
            variants={initialVar}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-[15px] font-medium"
          >
            Easily create and manage your own tournaments with our intuitive
            platform.
          </motion.p>
        </div>

        <div className="border-[1px] h-[250px] p-8 flex flex-col justify-between leading-tight">
          <Image
            src={"/assets/ui/join.svg"}
            height={40}
            width={40}
            alt="Create"
          />
          <motion.h1
            variants={initialVar}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-[30px] font-semibold"
          >
            Join Exciting Tournaments
          </motion.h1>
          <motion.p
            variants={initialVar}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-[15px] font-medium"
          >
            Browse and join ongoing tournaments across various games.
          </motion.p>
        </div>

        <div className="border-[1px] h-[250px] p-8 flex flex-col justify-between leading-tight">
          <Image
            src={"/assets/ui/community.svg"}
            height={40}
            width={40}
            alt="Create"
          />
          <motion.h1
            variants={initialVar}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-[30px] font-semibold"
          >
            Community and Social Features
          </motion.h1>
          <motion.p
            variants={initialVar}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-[15px] font-medium"
          >
            Connect with fellow gamers through our integrated social features.
          </motion.p>
        </div>

        <div className="border-[1px] h-[250px] p-8 flex flex-col justify-between leading-tight">
          <Image
            src={"/assets/ui/rewards.svg"}
            height={40}
            width={40}
            alt="Create"
          />
          <motion.h1
            variants={initialVar}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-[30px] font-semibold"
          >
            Exclusive Rewards and Prizes
          </motion.h1>
          <motion.p
            variants={initialVar}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-[15px] font-medium"
          >
            Compete for exclusive rewards and prizes in our tournaments.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
