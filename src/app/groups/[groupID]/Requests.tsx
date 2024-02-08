import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useGroup } from '@/store/useGroup';
import React from 'react'
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";


export default function Requests({ requestList = [] , groupID=''}) {
  const {GroupInviteReponse} = useGroup();
  return (
    <main className='flex flex-col items-center gap-5'>
     {!requestList?.length && <p>No Requests</p>}
      {requestList?.map((e:any , i:any) => {
        // console.log(e)
        return (
          <div className='w-full max-w-[25rem] flex items-center justify-center shadow-md rounded-lg border p-3 gap-3' key={i}>
            <Avatar className="h-14 w-14">
              <AvatarImage alt="User Logo" src="/placeholder.svg?height=64&width=64" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className='w-full flex flex-col'>
              <p>{e?.memberID?.userName}</p>
              <p className='truncate max-w-[10rem]'>{e?.memberID?.bio}</p>
          </div>
          <RxCrossCircled size={65} onClick={()=>{
            GroupInviteReponse(e?.memberID?._id , groupID , false)
          }}/>
            <IoCheckmarkCircleOutline size={65} onClick={()=>{
              GroupInviteReponse(e?.memberID?._id , groupID , true)
            }}/>
          </div>
        )
      })}
    </main>
  )
}
