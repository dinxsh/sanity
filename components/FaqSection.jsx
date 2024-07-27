"use client";

import React, { useRef, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { motion } from "framer-motion";

export default function FaqSection() {
  return (
    <motion.div
      className="mt-20 lg:mt-40 px-10 mx-auto max-w-5xl flex flex-col items-center"
      viewport={{ once: true }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: "easIn", duration: 0.5, delay: 0.6 }}
    >
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl lg:text-5xl font-medium tracking-tight transition-all">
          Frequently Asked Questions
        </h1>
        <h6 className="mt-5 text-sm">
          Need help with something? Here are some of the most common questions
          we get.
        </h6>
      </div>

      <div className="mt-10 max-w-2xl mx-auto">
        {faqsList.map((item, idx) => (
          <FaqsCard idx={idx} faqsList={item} />
        ))}
      </div>
    </motion.div>
  );
}

const FaqsCard = (props) => {
  const answerElRef = useRef();
  const [state, setState] = useState(false);
  const [answerH, setAnswerH] = useState("0px");
  const { faqsList, idx } = props;

  const handleOpenAnswer = () => {
    const answerElH = answerElRef.current.childNodes[0].offsetHeight;
    setState(!state);
    setAnswerH(`${answerElH + 20}px`);
  };

  return (
    <div
      className="space-y-3 mt-5 overflow-hidden border-b"
      key={idx}
      onClick={handleOpenAnswer}
    >
      <h4 className="cursor-pointer pb-5 flex items-center justify-between text-lg font-medium transition-all duration-500">
        {faqsList.title}
        {state ? <FaMinus /> : <FaPlus />}
      </h4>
      <div
        ref={answerElRef}
        className="duration-500"
        style={state ? { height: answerH } : { height: "0px" }}
      >
        <div>
          <p className="text-gray-500">{faqsList.content}</p>
        </div>
      </div>
    </div>
  );
};

const faqsList = [
  {
    title: "What is Sanity Gaming",
    content:
      "Sanity Gaming is an emerging esports platform that focuses on delivering high-quality content, community engagement, and inclusive experiences for gamers and esports enthusiasts. Our mission is to foster a positive and mentally healthy gaming environment.",
  },
  {
    title: "What services does Sanity Gaming offer",
    content:
      "We provide a range of services, including esports highlights, gaming insights, community updates, game reviews, and live tournament coverage. Our goal is to connect gamers, enthusiasts, and organizers in a vibrant community.",
  },
  {
    title: "How is Sanity Gaming different from other esports platforms",
    content:
      "Sanity Gaming distinguishes itself by prioritizing inclusivity and mental well-being within the gaming community. We aim to create a space where every gamer feels welcome, regardless of their skill level.",
  },
  {
    title: "Is Sanity Gaming limited to a specific region or audience",
    content:
      "While we're an Indian-based company, our vision extends globally. We're dedicated to making a positive impact on the global esports community and welcome enthusiasts from around the world.",
  },
];
