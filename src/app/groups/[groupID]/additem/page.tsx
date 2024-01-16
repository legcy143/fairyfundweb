"use client"
import { useAuth } from '@/store/useAuth'
import { useGroup } from '@/store/useGroup'
import React, { useEffect } from 'react'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


export default function AddItem() {
    const { addNewItem }: any = useGroup()
    const { isLogged }: any = useAuth()

    const formSchema = z.object({
        userName: z.string().min(3, {
            message: "invalid userName",
        }),
        password: z.string().min(1, {
            message: "invalid password",
        }),
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userName: "",
            password: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }


    if (!isLogged) {
        return <div>it seems you are not logged in</div>
    }
    return (
        <main className='p-2 py-5'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-5 max-w-sm m-auto bg-secondary rounded-md">
            {/* single form field */}
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                    <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='w-full mt-5' type="submit">login</Button>
          </form>
        </Form>
      </main>
    )
}
