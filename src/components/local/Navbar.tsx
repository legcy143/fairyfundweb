"use client"
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { useTheme } from 'next-themes'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/store/useAuth'

function Navbar() {
  const { isLogged }: any = useAuth();
  const { setTheme } = useTheme()
  const router = useRouter()
  return (
    <div className='px-5 h-[5rem] flex flex-row items-center justify-between'>
      <Link href={"/"}>Fairy funds 2.2</Link>
      <div className='flex gap-5'>
        <Button onClick={() => {
          setTheme("dark")
        }}>dark</Button>
        <Button onClick={() => {
          setTheme("light")
        }}>light</Button>
        {isLogged ?
          <Link href={"/profile"}>
            <Avatar>
              <AvatarImage src="" alt="" />
              <AvatarFallback>PP</AvatarFallback>
            </Avatar>
          </Link>
          :
          <Button onClick={() => {
            router.push("/authentication")
          }}>authentication</Button>
        }

      </div>
    </div>
  )
}

export default Navbar