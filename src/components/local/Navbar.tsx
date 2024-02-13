"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { useTheme } from 'next-themes'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useRouter } from 'next/navigation'
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useAuth } from '@/store/useAuth'
import { Bell } from 'lucide-react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"

function Navbar() {
  const { isLogged, userDetail }: any = useAuth();
  const { setTheme } = useTheme()
  const router = useRouter()
  return (
    <div className='px-5 h-[4.5rem] flex-shrink-0 flex flex-row items-center justify-between shadow-md sticky top-0 backdrop-blur-3xl z-20 gap-1'>
      <Link href={"/"}>
        <h1 className='font-bold italic text-xl'>fairy funds</h1>
      </Link>
      <div className='flex gap-5'>
        <NotificationHandler router={router} notifications={userDetail?.notifications} />
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

const NotificationHandler = ({ router, notifications = [] }: any) => {
  // const [newMessage, setnewMessage] = useState(notifications.length)
  return (
    <Sheet>
      <SheetTrigger>
        <div className='aspect-square p-1 relative w-9'>
          {/* <span className='bg-red-500 absolute top-0 right-0 w-5 aspect-square  rounded-full text-xs flex items-center justify-center text-white'>{newMessage}</span> */}
          <Bell />
        </div>
      </SheetTrigger>
      <SheetContent>
        {/* options */}
        <SheetHeader>
          <SheetTitle className='flex items-center gap-3 text-xl'>
            <Bell /> Notification
          </SheetTitle>
          <SheetDescription>
            {/* {bio} */}
          </SheetDescription>
        </SheetHeader>
        <div className='flex flex-col gap-3 mt-5'>
          {notifications?.map((e: any) => {
            let paresedData: any;
            if (e?.data) {
              paresedData = JSON?.parse(e?.data)

            }
            return (
              <div className='bg-secondary p-3 rounded'>
                <p className='text-base font-bold'>{e.title}</p>
                <p className='text-sm my-1'>{e.message}</p>
                {paresedData &&
                  <SheetTrigger>
                    <Button className='p-0' variant={'link'} onClick={() => {
                      router.push(`/groups/${paresedData.groupID}`)
                    }}>
                      visit group
                    </Button>
                  </SheetTrigger>
                }
              </div>
            )
          })}
        </div>
      </SheetContent>
    </Sheet>
  )
}