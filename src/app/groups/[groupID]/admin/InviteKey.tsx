"use client"
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
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



export default function InviteKey({ keysList = [], groupID = '', userID = '' }) {
  const { GenrateInviteKey , RemoveInviteKey}: any = useGroup();
  const router = useRouter();
  const currentDomain = `${window.location.protocol}//${window.location.host}`;

  return (
    <main className='p-2'>
      <nav className='flex items-center justify-between gap-5'>
        <h1>Invite Keys [ {keysList.length} ] </h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={() => { GenrateInviteKey(groupID, userID) }}>Genrate New key</Button>
          </DialogTrigger>
          <DialogContent>

          </DialogContent>
        </Dialog>
      </nav>
      {!keysList.length && <p className='p-5 text-center'>No Kyes found , genrate new key</p>}
      {keysList?.map((e: any, i: any) => {
        // console.log(e)
        return (
          <section key={e._id || i} className='flex flex-col items-center gap-2 p-2'>
            <div className='w-full flex items-center justify-between p-1'>
            <h1>{i + 1} .  {new Date(e.createdAt).toDateString()}</h1>
            <MdOutlineDelete size={25} onClick={()=>RemoveInviteKey(groupID,e._id)}/>
            </div>
            <div className='w-full space-y-3'>
              <LocalCard label={'key'} title={e.key} />
              <LocalCard label={"IV"} title={e.IV} />
              <LocalCard title={`${currentDomain}/groups/join?key=${e.key}&iv=${e.IV}`} />
            </div>
          </section>
        )
      })}
    </main>
  )
}


const LocalCard = ({ label='',title = '', onAction }: any) => {
  const [isCopied, setIsCopied] = useState(false);
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(title);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false)
      }, 2000);
      toast.success("copied successfully")
    } catch (error) {
      // console.error('Copy failed', error);
      toast.success("copied failed")
    }
  };

  return (
    <div className='bg-secondary flex items-center justify-between gap-2 p-3 rounded w-full relative'>
      {label &&
      <p className='absolute top-[-0.7rem] rounded bg-inherit px-2 text-sm'>{label+" : "}</p>
      }
      <p className='flex-1 truncate max-w-[100%]'>{title}</p>
      {isCopied ? <LuCopyCheck/> : <LuCopy onClick={handleCopy}/>}
    </div>
  )
}

