"use client";

import { Button } from "../../../../@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../@/components/ui/form";
import { Input } from "../../../../@/components/ui/input";
import { useToast } from "../../../../@/components/ui/use-toast";
import { verifySchema } from "../../../../model/Schema/verifySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../@/components/ui/card";

const VerifyAccount = () => {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(verifySchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`/api/verify-code`, {
        username: params.username,
        code: data.code,
      });

      toast({
        title: "Success",
        description: response.data.message,
      });
      router.replace("/sign-in");
    } catch (error) {
      console.error("Error in sign-up of user", error);
      const axiosError = AxiosError;
      let errorMessage = axiosError.response?.data.message;
      toast({
        title: "Signup failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <div>
    <div className="bg-cover bg-center h-screen" style={{ backgroundImage: "url('/pexels-lulizler-3165335.jpg')" }}>
    <div className="flex justify-center items-center min-h-[70vh]">
      <Card>
        <CardHeader className="mb-5">
          <CardTitle className="text-2xl md:text-3xl tracking-tight transition-all">
            Verify your account
          </CardTitle>
          <CardDescription className="pl-1">
            Enter your verification code
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardContent>
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Your code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit">Submit</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
    </div>
    </div>
  );
};

export default VerifyAccount;
