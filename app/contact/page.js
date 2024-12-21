"use client";

import ContactLeftComp from "../../components/Contatct/Contact-left";
import ContactRightComp from "../../components/Contatct/Contact-right";

export default function ContactPage() {
  return (
    <div className=" w-11/12 mx-auto border border-neutral-700 rounded-sm flex flex-row justify-evenly md:max-w-7xl">
      <ContactLeftComp className={"hidden sm:block md:w-1/2"} />
      <ContactRightComp className={"w-full md:w-1/2"} />
    </div>
  );
}
