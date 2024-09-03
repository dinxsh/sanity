import { AnimatePresence, cubicBezier, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
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

export default function FAQ() {
  return (
    <section className="w-full flex flex-col items-center justify-center pt-40 ">
      <motion.h1
        variants={initialVar}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="relative text-[100px] font-semibold"
      >
        Frequently Asked Questions
      </motion.h1>
      <motion.p
        variants={initialVar}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="relative text-[20px] font-medium"
      >
        Need help with something? Here are some of the most common questions we
        get.
      </motion.p>

      <div className="w-[60%] mt-20">
        <FAQElement
          question={"What is Sanity Gaming ?"}
          answer={
            "Sanity Gaming is an emerging esports platform that focuses on delivering high-quality content, community engagement, and inclusive experiences for gamers and esports enthusiasts. Our mission is to foster a positive and mentally healthy gaming environment."
          }
        />
        <FAQElement
          question={"What services does Sanity Gaming offer ?"}
          answer={
            "We provide a range of services, including esports highlights, gaming insights, community updates, game reviews, and live tournament coverage. Our goal is to connect gamers, enthusiasts, and organizers in a vibrant community."
          }
        />
        <FAQElement
          question={
            "How is Sanity Gaming different from other esports platforms ?"
          }
          answer={
            "Sanity Gaming distinguishes itself by prioritizing inclusivity and mental well-being within the gaming community. We aim to create a space where every gamer feels welcome, regardless of their skill level."
          }
        />
        <FAQElement
          question={
            "Is Sanity Gaming limited to a specific region or audience ?"
          }
          answer={
            "While we're an Indian-based company, our vision extends globally. We're dedicated to making a positive impact on the global esports community and welcome enthusiasts from around the world."
          }
        />
      </div>
    </section>
  );
}

// FAQs Elements

interface props {
  question: String;
  answer: String;
}

const FAQElement = ({ question, answer }: props) => {
  const [expand, setExpand] = useState(false);
  const [rotate, setRotate] = useState("rotate-0");

  const handleExpand = () => {
    if (expand) {
      setExpand(false);
      setRotate("rotate-0");
    } else {
      setExpand(true);
      setRotate("rotate-45");
    }
  };
  return (
    <div className="py-5 border-b-[1px]">
      <div className="w-full flex justify-between items-center">
        <motion.h1
          variants={initialVar}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-3xl font-semibold"
        >
          {question}
        </motion.h1>

        <button onClick={handleExpand}>
          <Image
            src={"/assets/menu.svg"}
            height={20}
            width={20}
            alt="Expand"
            className={`${rotate} transition-all`}
          />
        </button>
      </div>

      <AnimatePresence>
        {expand && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            // exit={{ opacity: 0 }}
            className="mt-5"
          >
            <p className="text-[17px] font-medium">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
