"use client"
import React, { useEffect, useState } from 'react'

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

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
import { useRouter } from 'next/navigation'
import { useAuth } from '@/store/useAuth'


export default function Authentication() {

  const router:any = useRouter();
  const { isLogged }: any = useAuth()
  useEffect(() => {
    if (isLogged) {
      router.push("/")
    }
  }, [])


  const [isPassword, setisPassword] = useState(true)

  const { login }: any = useAuth()

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
    login(values)
    console.log(values)
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
                <div className='flex items-center justify-between pr-1'>
                  <FormLabel>Password</FormLabel>
                  <span onClick={() => setisPassword(!isPassword)}>
                    {isPassword ? <IoIosEyeOff /> : <IoIosEye />}
                  </span>
                </div>
                <FormControl>
                  <Input placeholder={isPassword ? '********' : 'password'} {...field}
                    type={isPassword ? 'password' : 'text'}
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

