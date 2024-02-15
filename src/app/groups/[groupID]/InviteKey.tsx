"use client"
import { Button } from '@/components/ui/button'
import React, { memo, useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useGroup } from '@/store/useGroup'
import { LuCopy } from "react-icons/lu";
import { LuCopyCheck } from "react-icons/lu";
import { MdOutlineDelete } from "react-icons/md";
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { WhatsappIcon, WhatsappShareButton } from 'react-share'
import { SlOptionsVertical as OptionIcons } from "react-icons/sl";
import { FaWhatsapp } from "react-icons/fa";





export default function InviteKey({ keysList = [], groupID = '' }) {
  const { GenrateInviteKey, RemoveInviteKey, isGroupLoading }: any = useGroup();
  // const router = useRouter();
  const currentDomain = `${window.location.protocol}//${window.location.host}`;
  return (
    <main className='p-2'>
      <nav className='flex items-center justify-between gap-5'>
        <h1>Invite Keys [ {keysList.length} ] </h1>
        <Button onClick={() => { GenrateInviteKey(groupID) }}>Genrate New key</Button>
        {/* <Dialog>
          <DialogTrigger asChild>
          </DialogTrigger>
          <DialogContent>
          </DialogContent>
        </Dialog> */}
      </nav>
      {!keysList.length && <p className='p-5 text-center'>No Kyes found , genrate new key</p>}
      {keysList?.map((e: any, i: any) => {
        return (
          <UrlCard
            key={e._id}
            _id={e._id}
            index={i}
            currentDomain={currentDomain}
            createdAt={e.createdAt}
            invitekey={e.key}
            IV={e.IV}
            groupID={groupID}
            RemoveInviteKey={RemoveInviteKey}
            inviteurl={`${currentDomain}/groups/join?key=${e.key}&iv=${e.IV}`}
          />
        )
      })}
    </main>
  )
}

const UrlCard = memo(({ index = 0, createdAt, currentDomain, invitekey, IV, RemoveInviteKey, groupID, _id, inviteurl }: any) => {
  return (
    <section className='flex flex-col items-center gap-2 p-2'>
      <div className='w-full flex items-center justify-between p-1'>
        <h1>{index + 1} .  {new Date(createdAt).toDateString()}</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={'outline'}>
              <OptionIcons />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <OptionActionModel RemoveInviteKey={RemoveInviteKey} groupID={groupID} inviteurl={inviteurl} _id={_id} />
          </DialogContent>
        </Dialog>
      </div>
      <div className='w-full space-y-3'>
        {/* <div className='bg-secondary flex items-center justify-between gap-2 p-3 rounded w-full relative'>
          <p className='truncate max-w-[100%]'>
            {inviteurl}
          </p>
        </div> */}
        <p className='rounded bg-secondary p-2 truncate max-w-[100%] text-wrap'>
          {inviteurl}
        </p>
      </div>
    </section>
  )
})

const OptionActionModel = ({ RemoveInviteKey, groupID, _id, inviteurl }: any) => {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteurl);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false)
      }, 2000);
      toast.success("copied successfully")
    } catch (error) {
      toast.success("copied failed")
    }
  };
  return (
    <main className='py-1 w-full overflow-hidden'>
      <DialogTitle>Actions </DialogTitle>
      <p className='my-3 rounded bg-secondary p-2 truncate max-w-[100%] text-wrap'>
        {inviteurl}
      </p>
      <div className='flex items-center gap-2'>
        <Button className='text-xl' variant={'outline'} onClick={handleCopy} >
          {isCopied ? <LuCopyCheck /> : <LuCopy />}
        </Button>
        <Button className='text-xl' variant={'outline'} >
          <WhatsappShareButton url={inviteurl}>
            <FaWhatsapp color='green' />
          </WhatsappShareButton>
        </Button>
        <Button className='text-xl ml-auto' variant={'outline'} onClick={() => RemoveInviteKey(groupID, _id)}>
          <MdOutlineDelete color='red' />
        </Button>
      </div>
    </main>
  )
}


