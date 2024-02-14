"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { useTheme } from 'next-themes'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useRouter } from 'next/navigation'
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useAuth } from '@/store/useAuth'
import { Bell, CheckCheck, Trash2 } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import TimeAgo from '@/utils/TimeAgo'

function Navbar() {
  const { isLogged, userDetail, MarkAllSeenNotification, RemoveAllNotification }: any = useAuth();
  const { setTheme } = useTheme()
  const router = useRouter()
  return (
    <div className='px-5 h-[4.5rem] flex-shrink-0 flex flex-row items-center justify-between shadow-md sticky top-0 backdrop-blur-3xl z-20 gap-1'>
      <Link href={"/"}>
        <h1 className='font-bold italic text-xl'>fairy funds</h1>
      </Link>
      <div className='flex gap-5'>
        <NotificationHandler
          router={router}
          notifications={userDetail?.notifications}
          RemoveAllNotification={RemoveAllNotification}
          MarkAllSeenNotification={MarkAllSeenNotification} />
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

const NotificationHandler = ({ router, notifications = [], MarkAllSeenNotification, RemoveAllNotification }: any) => {
  let isSeenCount = 0;
  notifications.forEach((e: any) => {
    if (e?.isSeen === false) { isSeenCount++ }
  });
  return (
    <Sheet>
      <SheetTrigger>
        <div className='aspect-square p-1 relative w-9'>
          {isSeenCount > 0 &&
            <span className='bg-red-500 absolute top-0 right-0 w-5 aspect-square  rounded-full text-xs flex items-center justify-center text-white'>{isSeenCount}</span>
          }
          <Bell />
        </div>
      </SheetTrigger>
      <SheetContent className='p-3 max-h-full'>
        {/* options */}
        <SheetHeader className='p-2'>
          <SheetTitle className='flex items-center gap-3 text-xl'>
            <Bell /> Notification
          </SheetTitle>
          {isSeenCount > 0 &&
            <SheetDescription className='text-xs opacity-50 bg-secondary rounded p-2'>
              {isSeenCount} Unread Notification
            </SheetDescription>}
          {notifications?.length > 0 ?
            <div className='capitalize flex items-center justify-between'>
              {isSeenCount > 0 &&
                <Button variant={'link'} className='gap-2 items-center' onClick={() => { MarkAllSeenNotification() }}><CheckCheck size={15} />mark as reed</Button>
              }
              <Button variant={'link'} className='gap-2 items-center ml-auto' onClick={() => { RemoveAllNotification() }}> <Trash2 size={13} /> remove all</Button>
            </div> :
            <SheetDescription className='text-xs opacity-50 bg-secondary rounded p-2'>
              No notificaions available
            </SheetDescription>
          }
        </SheetHeader>
        <div className='flex flex-col gap-3 overflow-auto  h-[90vh] pb-10'>
          {notifications?.map((e: any) => {
            let paresedData: any;
            if (e?.data) {
              paresedData = JSON?.parse(e?.data)

            }
            return (
              <div className='bg-secondary p-3 rounded'>
                <div className='flex items-center justify-between'>
                  <p className='text-base font-bold  '>{e.title}</p>
                  <p className='text-xs opacity-50'>{TimeAgo(new Date(e?.createdAt))}</p>
                </div>
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