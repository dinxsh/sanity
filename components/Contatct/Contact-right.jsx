"use form";

import cn from "classnames";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { Button } from "../../@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../@/components/ui/form";
import { Input } from "../../@/components/ui/input";
import {
  ArrowBigRight,
  Loader,
  Mail,
  Pen,
  PhoneCall,
  UserRoundCog,
} from "lucide-react";
import { Textarea } from "../../@/components/ui/textarea";
import { BiSupport } from "react-icons/bi";
import Link from "next/link";
import { socialLinks } from "../Footer";
import { sendContactEmail } from "../../app/action/sendContactEmail";

import { useState } from "react";
import toast from "react-hot-toast";

const formSchema = z.object({
  fullName: z
    .string({ message: "Full name is required" })
    .min(3, { message: "Make it little longer" }),
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email type" }),
  message: z
    .string({ message: "Give some sort of message" })
    .min(3, { message: "Make it little longer" }),
  subject: z
    .string({ message: "Give some sort of message" })
    .min(3, { message: "Make it little longer" }),
});

export default function ContactRightComp({ className }) {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      message: "",
      subject: "",
    },
  });

  async function handleFormSubmission(data) {
    try {
      setLoading(true);
      const res = await sendContactEmail(
        data.fullName,
        data.email,
        data.message,
        data.subject,
      );
      if (res.status !== 200) throw new Error(res.message);
      toast.success(res.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      form.reset();
      setLoading(false);
    }
  }

  return (
    <div className={cn(className, "bg-black p-4 md:p-12 ")}>
      <p className="text-2xl font-bold tracking-wider ">GET IN TOUCH</p>
      <p className="text-gray-400">
        24/7 We will answer your questions and problems
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmission)}
          className="mt-12 flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 font-bold">
                  Full Name
                </FormLabel>
                <FormControl>
                  <div className="flex gap-2 items-center border-2 border-neutral-700 rounded-md px-4">
                    <UserRoundCog className="size-4" />
                    <Input
                      placeholder="Sanity Gaming"
                      {...field}
                      className="outline-0 border-0"
                    />
                  </div>
                </FormControl>

                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 font-bold">
                  Subject
                </FormLabel>
                <FormControl>
                  <div className="flex gap-2 items-center border-2 border-neutral-700 rounded-md px-4">
                    <Pen className="size-4" />
                    <Input
                      placeholder="Collbaration"
                      {...field}
                      className="outline-0 border-0"
                    />
                  </div>
                </FormControl>

                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 font-bold">
                  Email Address
                </FormLabel>
                <FormControl>
                  <div className="flex gap-2 items-center border-2 border-neutral-700 rounded-md px-4">
                    <Mail className="size-4" />
                    <Input
                      placeholder="sanity@gmail.com"
                      {...field}
                      className="outline-0 border-0"
                    />
                  </div>
                </FormControl>

                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 font-bold">
                  Message
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Hello, i want to connect with you guys for promotion ."
                    {...field}
                    className="outline-0 border-2 border-neutral-700 resize-none h-44 no-scrollbar"
                  />
                </FormControl>

                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <Button
            disabled={loading}
            type="submit"
            className="flex gap-2 items-center"
            arial-label="send-contact-btn"
          >
            {loading ? (
              <Loader className="animate-spin" />
            ) : (
              <>
                <p>Send</p>
                <ArrowBigRight className="size-4" />
              </>
            )}
          </Button>
        </form>
      </Form>

      <div className="mt-8 flex flex-wrap gap-4">
        <div className="flex gap-2 items-center text-gray-400 text-sm">
          <PhoneCall className="size-4" />
          <p>+1 (800) 123 XX21</p>
        </div>

        <div className="flex gap-2 items-center text-gray-400 text-sm">
          <BiSupport className="size-4" />
          <p>support@sanityesports.live</p>
        </div>

        <div className="flex gap-2 items-center text-gray-400 text-sm">
          <Mail className="size-4" />
          <p>contact@sanityesports.live</p>
        </div>
      </div>

      <div className="sm:hidden justify-center mt-8 flex flex-wrap gap-4">
        {socialLinks.map((e, i) => {
          return (
            <Link href={e.link} key={i} aria-label={`${e.title}-social}`}>
              <e.icon className=" size-4" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
