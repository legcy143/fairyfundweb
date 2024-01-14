"use client"
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { useTheme } from 'next-themes'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

function Navbar() {
  const { setTheme } = useTheme()
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
        <Link href={"/profile"}>
          <Avatar>
            <AvatarImage src="" alt="" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>

      </div>
    </div>
  )
}

export default Navbar