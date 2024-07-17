"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "../../../@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../@/components/ui/form"
import { Input } from "../../../@/components/ui/input"
import { signUpSchema } from '../../../model/Schema/signUpSchema';




   
  export default function CreateTeamForm() {

    const form = useForm({
        
      });

    const onSubmit = async (data) => {
        
    };

    return (
        <div className="flex justify-center items-center ">
        <div className="w-3/4 p-8 space-y-8 rounded-lg shadow-md bg-gray-800">
            <div className="text-center">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-bold tracking-tight first:mt-0 text-gray-100">
                Create Team
            </h2>
            <p className="mb-4 text-gray-100">Create your team and start competing</p>
            </div>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                        <Input type="file" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                        <Input placeholder="Name of your team" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="game"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Game</FormLabel>
                        <FormControl>
                        <Input placeholder="Game you play" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Role</FormLabel>
                        <FormControl>
                        <Input placeholder="Role in the game" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="rank"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Rank</FormLabel>
                        <FormControl>
                        <Input placeholder="Your rank" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="server"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Server</FormLabel>
                        <FormControl>
                        <Input placeholder="Preferred server" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Language</FormLabel>
                        <FormControl>
                        <Input placeholder="Language you speak" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="players"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Players</FormLabel>
                        <FormControl>
                        <Input placeholder="Players in your team" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="requests"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Requests</FormLabel>
                        <FormControl>
                        <Input placeholder="Special requests" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                </div>
                <div className="flex justify-center">
                <Button type="submit">Create</Button>
                </div>
            </form>
            </Form>
        </div>
        </div>
    );




  }