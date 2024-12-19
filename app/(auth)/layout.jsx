import Image from "next/image";

export default function AuthLayout({ children }) {
  return (
    <div className="flex border h-[90vh] -mt-8 w-[98%] mx-auto rounded-2xl bg-zinc-400/10 border-zinc-200/20 backdrop-blur-lg backdrop-saturate-200">
      <div className="w-1/2 relative p-2 flex items-center justify-center max-md:hidden">
        <Image
          src={`/assets/grad1.svg`}
          alt=""
          width={1024}
          height={1024}
          className="h-[97%] w-[98%] -z-10  object-cover object-left-bottom  opacity-95 rounded-2xl inset-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute"
        />
        <h2 className="text-7xl m-5 font-bold pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-white/90 via-white/70 to-zinc-800 bg-clip-text leading-none text-transparent max-sm:text-3xl max-sm:text-center p-2 text-center">
          Sanity Gaming
        </h2>
      </div>
      <div className="w-1/2 max-md:w-full relative p-2 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
