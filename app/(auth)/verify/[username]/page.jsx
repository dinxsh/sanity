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
import Image from "next/image";
import { toast } from "sonner";

const VerifyAccount = () => {
  const router = useRouter();
  const params = useParams();

  const form = useForm({
    resolver: zodResolver(verifySchema),
    code: null,
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`/api/verify-code`, {
        username: params.username,
        code: data.code,
      });
      toast.success(response.data.message);
      router.replace("/sign-in");
    } catch (error) {
      toast.error(error.response.data.message);
    }
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
                <p className="font-bold text-base">Verify your account.</p>
              </CardDescription>
            </CardHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <CardContent>
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-bold text-zinc-300">
                          Verification Code
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="text-base border-zinc-400/10"
                            placeholder="Enter Your code"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <Button
                    className="font-bold"
                    type="submit"
                    arial-label="submit-btn"
                  >
                    Submit
                  </Button>
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
