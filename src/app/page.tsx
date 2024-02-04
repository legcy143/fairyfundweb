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
import SendJoinRequest from './groups/SendJoinRequest'





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
              <div className='p-5 rounded-lg shadow-sm flex gap-5 border cursor-pointer border-primary-foreground items-center justify-center w-full max-w-[25rem]' onClick={() => { router.push(`/groups/${e._id}`) }} key={e?._id || i}>
                <Avatar className="h-16 w-16">
                  <AvatarImage alt="User Logo" src="/placeholder.svg?height=64&width=64" />
                  <AvatarFallback>{e?.groupName[0]?.toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className='flex flex-col items-start flex-1 w-[50%] mr-auto'>
                  <h1 className='truncate w-full'>{e?.groupName}</h1>
                  <p className='truncate w-full'>{e?.groupBio}</p>
                  <p className='truncate text-right flex items-center justify-start gap-2 w-full'>{e?.users.length} <FaUsers /></p>
                </div>
                <IoIosArrowForward />
              </div>
            )
          })}
        </div>}
    </main>
  )
}
