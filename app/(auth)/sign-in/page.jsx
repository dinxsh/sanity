"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { FaDiscord, FaGoogle } from "react-icons/fa";
import { Loader2 } from "lucide-react";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../@/components/ui/form";
import { Button } from "../../../@/components/ui/button";
import { Input } from "../../../@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../../@/components/ui/card";
import { useToast } from "../../../@/components/ui/use-toast";
import { signInSchema } from "../../../model/Schema/signInSchema";

const SignInForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Form setup with Zod schema validation
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data) => {
            router.push("/dashboard");
    // setIsLoading(true);
    // try {
    //   const result = await signIn("credentials", {
    //     redirect: false,
    //     email: data.identifier,
    //     password: data.password,
    //   });

    //   if (result?.error) {
    //     toast({
    //       title: "Error",
    //       description:
    //         result.error === "CredentialsSignin"
    //           ? "Invalid email or password."
    //           : result.error,
    //       variant: "destructive",
    //     });
    //   } else if (result?.url) {
    //     router.push("/dashboard");
    //   } else {
    //     toast({
    //       title: "Error",
    //       description: "An unexpected error occurred.",
    //       variant: "destructive",
    //     });
    //   }
    // } catch (error) {
    //   console.error("Sign in error:", error);
    //   toast({
    //     title: "Error",
    //     description: "An unexpected error occurred.",
    //     variant: "destructive",
    //   });
    // } finally {
    //   setIsLoading(false);
    // }
  };

  // OAuth sign-in handlers
  const handleOAuthSignIn = async (provider) => {
    await signIn(provider, { callbackUrl: "/" });
  };

  return (
    <div
      className="bg-cover bg-center h-screen"
      style={{ backgroundImage: "url('pexels-lulizler-3165335.jpg')" }}
    >
      <div className="flex justify-center items-center min-h-[70vh] pt-10">
        <Card className="w-96">
          <CardHeader>
            <h2 className="text-xl font-bold text-center">Sign In</h2>
          </CardHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-5">
                <FormField
                  name="identifier"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email or Username</FormLabel>
                      <Input {...field} disabled={isLoading} />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <Input type="password" {...field} disabled={isLoading} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>

              <CardFooter className="grid gap-4">
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign In
                </Button>

                <div className="text-center">
                  <div className="my-5 flex items-center">
                    <div className="h-[1px] bg-foreground/20 w-1/2"></div>
                    <div className="mx-2 text-foreground/60">OR</div>
                    <div className="h-[1px] bg-foreground/20 w-1/2"></div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full flex gap-4"
                    onClick={() => handleOAuthSignIn("google")}
                  >
                    <FaGoogle className="h-4 w-4" /> Sign in with Google
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full mt-2 flex gap-4"
                    onClick={() => handleOAuthSignIn("discord")}
                  >
                    <FaDiscord className="h-4 w-4" /> Sign in with Discord
                  </Button>

                  <p className="mt-10 text-foreground/80">
                    Not a member yet?{' '}
                    <Link
                      href="/sign-up"
                      className="hover:text-foreground underline transition-all"
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default SignInForm;
