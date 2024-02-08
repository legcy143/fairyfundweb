"use client"
import NotLogged from '@/components/local/NotLogged'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/store/useAuth'
import { useGroup } from '@/store/useGroup'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { IoIosArrowForward } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import { MdOutlineGroupAdd } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CardContent, Card } from "@/components/ui/card"
import SendJoinRequest from './groups/SendJoinRequest'
import { memo } from 'react'

export default function Home() {
  const { myGroups }: any = useGroup();
  const { isLogged }: any = useAuth();
  const router = useRouter();
  if (!isLogged) {
    return <NotLogged />
  }
  return (
    <main className='p-5 md:p-16'>
      <div className='flex items-center justify-between gap-5'>
        <h1 className='text-xl font-semibold capitalize my-3'>my groups</h1>
        <div className='flex items-center gap-2'>
          <Button onClick={() => { router.push("/groups/new") }}> + New</Button>
          <Dialog>
            <DialogTrigger asChild>
              {/* <Button variant="outline">Edit Profile</Button> */}
              <Button><MdOutlineGroupAdd className='mr-1' /> Join</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <SendJoinRequest />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {myGroups.length == 0 ? <>No groups found </> :
        <div className='flex flex-wrap py-3 gap-3 items-center justify-center'>
          {myGroups?.map((e: any, i: any) => {
            return (
              <GroupCard
                key={e._id}
                onClick={() => { router.push(`/groups/${e._id}`) }}
                fallBackAvtar={e?.groupName[0]?.toUpperCase()}
                groupBio={e?.groupBio}
                groupName={e?.groupName}
                members={e?.users.length} 
                funds={e?.funds}
                />
            )
          })}
        </div>}
    </main>
  )
}




const GroupCard = memo(({ fallBackAvtar = "", groupName = "", groupBio = "", members = 0, funds = 0, onClick}:any)=>{
  return (
    <Card className='p-3 pb-0 w-[20rem] cursor-pointer' onClick={onClick}>
      <CardContent className="flex flex-col">
        <div className="flex items-center gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage alt="Music Makers" src="/placeholder-avatar.jpg" />
            <AvatarFallback>{fallBackAvtar}</AvatarFallback>
          </Avatar>
          <h3 className="text-lg font-medium leading-6">{groupName}</h3>
        </div>
        <p className="text-sm leading-5 text-gray-500 dark:text-gray-400">
          {groupBio}
        </p>
        <div className="flex items-center mt-4">
          <p className="text-sm font-medium leading-5 flex items-center gap-2">{members} <FaUsers /></p>
          <p className={`ml-auto text-sm font-medium leading-5 ${funds <0 ? 'text-red-500' : funds >0 && 'text-green-500'}`}>₹{funds}</p>
        </div>
      </CardContent>
    </Card>
  )
})
