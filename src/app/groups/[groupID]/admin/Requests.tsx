import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import React from 'react'
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";


export default function Requests() {
  return (
    <main className='flex flex-col items-center gap-5'>
        <div className='w-full max-w-[25rem] flex items-center justify-center shadow-md rounded-lg border p-3 gap-3'>
            <Avatar className="h-14 w-14">
            <AvatarImage alt="User Logo" src="/placeholder.svg?height=64&width=64" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className='w-full flex flex-col'> 
          <p>username</p>
          <p className='truncate max-w-[10rem]'>user bio goes here so wassupdfadsgd</p>
          </div>
          <IoCheckmarkCircleOutline size={65}/>
          <RxCrossCircled size={60}/>
        </div>
    </main>
  )
}
