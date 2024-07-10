'use client'
import { Button } from '../../../../@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../../../../@/components/ui/form'
import { Input } from '../../../../@/components/ui/input'
import { useToast } from '../../../../@/components/ui/use-toast'
import { verifySchema } from '../../../../model/Schema/verifySchema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'

const VerifyAccount =()=>{
    const router = useRouter();
    const params = useParams();
    const {toast} = useToast();

    const form = useForm({
        resolver: zodResolver(verifySchema),

       }
    )

    const onSubmit=async(data)=>{

        try {
            const response = await axios.post(`/api/verify-code`,{
                username: params.username,
                code: data.code
            })

            toast({
                title: "Success",
                description: response.data.message
            })
            router.replace('/sign-in');
        } catch (error) {
            console.error("Error in sign-up of user",error)
            const axiosError = AxiosError;
            let errorMessage = axiosError.response?.data.message
                        toast({
                            title: "Signup failed",
                            description: errorMessage,
                            variant: "destructive"
                        })
        }
    }

    return(
        <div className='flex justify-center items-center min-h-screen bg-gray-800'>
            <div className='w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-md'>
                <div className='text-center'>
                    <h1 className='text-4-xl font-extrabold tracking-tight lg:text-5xl mb-6'>
                        Verify your account
                    </h1>
                    <p className='mb-4'>Enter your verification code</p>
                </div>
                <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
            </div>
        </div>
    )
}

export default VerifyAccount