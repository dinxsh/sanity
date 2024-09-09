import Link from "next/link";

export default function Contact() {
  return (
    <div className="flex items-center justify-center h-screen gap-10 max-md:flex-col max-md:mt-32">
      <div className="flex flex-col gap-4 w-[400px] bg-accent text-secondary p-8 rounded-lg">
        <span>
          <h1 className="text-4xl font-semibold">Contact Us</h1>
          <p className="text-sm">
            We are always looking for ways to improve our products and services.
            Contact us and let us know how we can help you.
          </p>
        </span>

        <span>
          <p>CONTACT</p>
          <Link href={"mailto:contact@sanityesports.live"} className="text-sm hover:underline transition-all">
            contact@sanityesports.live
          </Link>
        </span>
        <span>
          <p>PHONE</p>
          <p className="text-sm">+1 (800) 123 XX21</p>
        </span>
        <span>
          <p>SUPPORT</p>
          <Link href={"mailto:support@sanityesports.live"} className="text-sm hover:underline transition-all">
            support@sanityesports.live
          </Link>
        </span>
      </div>

      <form action="" className="flex flex-col gap-4 w-[400px]">
        <h1 className="text-4xl font-semibold">SEND YOUR THOUGHTS</h1>
        <input className="w-full p-2 rounded-md bg-transparent border border-[lightgray] outline-none text-secondary" type="text" placeholder="Name" />
        <input className="w-full p-2 rounded-md bg-transparent border border-[lightgray] outline-none text-secondary" type="email" placeholder="Email" />
        <textarea className="w-full p-2 rounded-md bg-transparent border border-[lightgray] outline-none text-secondary" placeholder="Message" />
        <button type="submit" className="w-full text-sm p-2 rounded-md bg-[#111] text-white hover:bg-secondary hover:text-primary transition-all">Send</button>
      </form>
    </div>
  );
}
