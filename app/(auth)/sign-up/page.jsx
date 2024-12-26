"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { Button } from "../../../@/components/ui/button";
import { Input } from "../../../@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../@/components/ui/card";

import { useToast } from "../../../@/hooks/use-toast";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signUpSchema } from "../../../model/Schema/signUpSchema";
import Image from "next/image";

const Page = () => {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debouncedUsername = useDebounceCallback(
    (value) => setUsername(value),
    300,
  );

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // useEffect(() => {
  //   const checkUsernameUnique = async () => {
  //     if (username) {
  //       setIsCheckingUsername(true);
  //       setUsernameMessage(''); // Reset message
  //       try {
  //         const response = await axios.get(`/api/check-username-unique?username=${username}`);
  //         setUsernameMessage(response.data.message);
  //       } catch (error) {
  //         setUsernameMessage(error.response?.data.message ?? 'Error checking username');
  //       } finally {
  //         setIsCheckingUsername(false);
  //       }
  //     }
  //   };
  //   checkUsernameUnique();
  // }, [username]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/sign-up", data);

      toast({
        title: "Success",
        description: response.data.message,
      });

      router.replace(`/verify/${data.username}`);

      setIsSubmitting(false);
    } catch (error) {
      console.error("Error during sign-up:", error);

      let errorMessage =
        error.response?.data.message ??
        "There was a problem with your sign-up. Please try again.";

      toast({
        title: "Sign Up Failed",
        description: errorMessage,
        variant: "destructive",
      });

      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="bg-cover bg-center ">
        <div className="flex justify-center items-center">
          <Card className="w-[23rem] max-sm:w-[19rem] border-zinc-400/10">
            <CardHeader className="p-2">
              <CardDescription className="flex flex-col gap-2 pt-5 items-center justify-center">
                <Image
                  src="/assets/logo.jpg"
                  alt=""
                  width={500}
                  height={500}
                  className="size-12 rounded-xl"
                />
                <p className="font-bold text-base">Create an account.</p>
                <p className="text-zinc-400">
                  Welcome! Please fill the details to get started.
                </p>
              </CardDescription>
            </CardHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-5">
                  <FormField
                    name="username"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-bold text-zinc-300">
                          Username
                        </FormLabel>
                        <Input
                          className="text-base border-zinc-400/10"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            debouncedUsername(e.target.value);
                          }}
                        />
                        {isCheckingUsername && (
                          <Loader2 className="animate-spin" />
                        )}
                        {!isCheckingUsername && usernameMessage && (
                          <p
                            className={`text-sm ${
                              usernameMessage === "Username is unique"
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {usernameMessage}
                          </p>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-bold text-zinc-300">
                          Email
                        </FormLabel>
                        <Input
                          className="text-base border-zinc-400/10"
                          {...field}
                          name="email"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-bold text-zinc-300">
                          Password
                        </FormLabel>
                        <Input
                          className="text-base border-zinc-400/10"
                          type="password"
                          {...field}
                          name="password"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                  <Button
                    type="submit"
                    className="w-full font-bold"
                    disabled={isSubmitting}
                    arial-label="signup-btn"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                      </>
                    ) : (
                      "Sign Up"
                    )}
                  </Button>

                  <div className="mt-5 text-foreground/80 text-xs text-center text-zinc-400">
                    Already a member?{" "}
                    <Link
                      href="/sign-in"
                      className="hover:text-blue-800 underline transition-all "
                      aria-label="signin-btn"
                    >
                      Sign in
                    </Link>
                  </div>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;
