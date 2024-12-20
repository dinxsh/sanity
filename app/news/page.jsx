import React from "react";
import News from "../../components/News";

const page = async () => {
  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="bg-cover mb-5 bg-center bg-[url(https://im.indiatimes.in/facebook/2019/Oct/mobile_gaming_1570096408.jpg)]  w-5/6 rounded-sm flex flex-col justify-center items-center h-96 py-8 px-4 "></div>
      <News />
    </div>
  );
};

export default page;
