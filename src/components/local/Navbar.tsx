"use client"
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { useTheme } from 'next-themes'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useRouter } from 'next/navigation'
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useAuth } from '@/store/useAuth'

function Navbar() {
  const { isLogged, userDetail }: any = useAuth();
  const { setTheme } = useTheme()
  const router = useRouter()
  return (
    <div className='px-5 h-[5rem] flex flex-row items-center justify-between shadow-md sticky top-0 backdrop-blur-3xl z-20'>
      <Link href={"/"}>
        <h1 className='font-bold italic text-xl'>fairy funds</h1>
      </Link>
      <div className='flex gap-5'>
        {/* <Button onClick={() => {
          setTheme("dark")
        }}>dark</Button>
        <Button onClick={() => {
          setTheme("light")
        }}>light</Button> */}

        <Button variant="outline" size="icon" className=''>
          <SunIcon className="p-2 w-full h-full rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 dark:hidden" onClick={() => { setTheme("dark") }} />
          <MoonIcon className="p-2 w-full h-full  rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 hidden dark:block" onClick={() => { setTheme("light") }} />
          <span className="sr-only">theme</span>
        </Button>

        {isLogged ?
          <Link href={"/profile"}>
            <Avatar>
              <AvatarImage src="" alt="" />
              <AvatarFallback className='uppercase'>{userDetail?.userName.slice(0, 2)}</AvatarFallback>
            </Avatar>
          </Link>
          :
          <Button onClick={() => {
            router.push("/auth/login")
          }}>Login</Button>
        }

      </div>
    </div>
  )
}

export default Navbar