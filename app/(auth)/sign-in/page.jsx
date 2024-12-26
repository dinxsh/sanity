"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { signIn } from "next-auth/react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../@/components/ui/form";
import { Button } from "../../../@/components/ui/button";
import { Input } from "../../../@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "../../../@/hooks/use-toast";
import { signInSchema } from "../../../model/Schema/signInSchema";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../@/components/ui/card";
import { FaDiscord, FaGoogle } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import { delay } from "framer-motion";
import Image from "next/image";

export default function SignInForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const { toast } = useToast();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.identifier,
        password: data.password,
      });

      if (result?.error) {
        console.error("Sign in error:", result.error);
        toast({
          title: "Error",
          description:
            result.error === "CredentialsSignin"
              ? "Invalid email or password"
              : result.error,
          variant: "destructive",
        });
      } else if (result?.url) {
        router.push("/dashboard");
      } else {
        console.error("Unexpected result:", result);
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Sign in error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  const handleDiscordSignIn = async () => {
    await signIn("discord", { callbackUrl: "/" });
  };

  return (
    <div>
      <div className="">
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
                <p className="font-bold text-base">Sign in to Sanity Gaming</p>
                <p className="text-zinc-400">
                  Welcome back! Please sign in to continue.
                </p>
              </CardDescription>
            </CardHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-5">
                  <FormField
                    name="identifier"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-bold text-zinc-300">
                          Email or Username
                        </FormLabel>
                        <Input
                          className="text-base border-zinc-400/10"
                          {...field}
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
                          type="password"
                          className="text-base border-zinc-400/10"
                          {...field}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="grid py-3 ">
                  <Button
                    className="w-full  font-bold"
                    type="submit"
                    disabled={isLoading}
                    arial-label="signin-btn"
                  >
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Sign In
                  </Button>

                  <div className="my-5 flex items-center">
                    <div className="h-[1px] bg-zinc-400/20 w-1/2"></div>
                    <div className="mx-2 text-foreground/60 font-bold">or</div>
                    <div className="h-[1px] bg-zinc-400/20 w-1/2"></div>
                  </div>

                  <div className="text-center flex items-center justify-center gap-2">
                    <Button
                      variant="default"
                      className="w-full flex gap-4"
                      onClick={handleGoogleSignIn}
                      arial-label="google-signin-btn"
                    >
                      <FaGoogle className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="default"
                      className="w-full flex gap-4"
                      onClick={handleDiscordSignIn}
                      arial-label="discord-signin-btn"
                    >
                      <FaDiscord className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-10 mb-5 text-foreground/80 text-xs text-center text-zinc-400">
                    Not a member yet?{" "}
                    <Link
                      href="/sign-up"
                      className="hover:text-blue-800 underline transition-all "
                      aria-label="signup-btn"
                    >
                      Sign up
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
}
