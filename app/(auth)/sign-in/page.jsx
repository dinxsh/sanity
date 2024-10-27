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
import { useToast } from "../../../@/components/ui/use-toast";
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
        console.error('Sign in error:', result.error);
        toast({
          title: "Error",
          description: result.error === "CredentialsSignin" ? "Invalid email or password" : result.error,
          variant: "destructive",
        });
      } else if (result?.url) {
        router.push("/dashboard");
      } else {
        console.error('Unexpected result:', result);
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Sign in error:', error);
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
      <div
        className="bg-cover bg-center h-screen"
        style={{ backgroundImage: "url('pexels-lulizler-3165335.jpg')" }}
      >
        <div className="flex justify-center items-center min-h-[70vh] pt-10">
          <Card className="w-96">
            <CardHeader>
              <CardDescription></CardDescription>
            </CardHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-5">
                  <FormField
                    name="identifier"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xl">
                          Email or Username
                        </FormLabel>
                        <Input className="text-xl" {...field} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xl">Password</FormLabel>
                        <Input type="password" className="text-xl" {...field} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="grid mt-4">
                  <Button className="w-full" type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
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
                      onClick={handleGoogleSignIn}
                    >
                      <FaGoogle className="h-4 w-4" /> Sign in with Google
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full mt-2 flex gap-4"
                      onClick={handleDiscordSignIn}
                    >
                      <FaDiscord className="h-4 w-4" />
                      Sign in with Discord
                    </Button>

                    <div className="mt-10 text-foreground/80">
                      Not a member yet?{" "}
                      <Link
                        href="/sign-up"
                        className="hover:text-foreground underline transition-all"
                      >
                        Sign up
                      </Link>
                    </div>
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
