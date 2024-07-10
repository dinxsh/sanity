import React from 'react'

<<<<<<< Updated upstream
function SignIn(){
    return (
        <div>
            Hiii
        </div>
    )
}

export default SignIn
=======
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { signIn } from 'next-auth/react';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../@/components/ui/form';
import { Button } from '../../../@/components/ui/button';
import { Input } from '../../../@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '../../../@/components/ui/use-toast';
import { signInSchema } from '../../../model/Schema/signInSchema';
import React from 'react';

export default function SignInForm() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const { toast } = useToast();

  const onSubmit = async (data) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        identifier: data.identifier,
        password: data.password,
      });

      if (result?.error) {
        console.log(result.error);
        toast({
          title: 'Login Failed',
          description: result.error === 'CredentialsSignin' ? 'Incorrect username or password' : result.error,
          variant: 'destructive',
        });
      } else if (result?.url) {
        router.replace(result.url);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn('google', { callbackUrl: '/' });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-600 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Welcome to Sanity Gaming
          </h1>
          <p className="mb-4">Sign in to continue your gaming adventure</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="identifier">Email/Username</FormLabel>
                  <Input id="identifier" {...field} aria-label="Email or Username" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input id="password" type="password" {...field} aria-label="Password" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='w-full' type="submit">Sign In</Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>Or</p>
          <Button className='w-full mt-2' onClick={handleGoogleSignIn}>
            Sign in with Google
          </Button>
          <p className="mt-4">
            Not a member yet?{' '}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
>>>>>>> Stashed changes
