import React, { useState } from 'react'
import { BiRupee } from "react-icons/bi";
import { SlOptionsVertical as OptionIcons } from "react-icons/sl";
import { Button } from '@/components/ui/button';
import { useGroup } from '@/store/useGroup';
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
import { Badge } from "@/components/ui/badge"
import LableWithInput from "@/components/local/LableWithInput"
import { MoreVertical } from 'lucide-react';




export default function Members({ members, isAdmin, groupID, isOwner , userID}: any) {
  return (
    <div>
      {/* {members?.map((e:any) => console.log(e))} */}
      {members?.map((e: any) => <Membercard
        key={e?._id}
        isAdmin={isAdmin}
        groupID={groupID}
        isOwner={isOwner}
        memberID={e.memberID}
        name={e?.memberID?.userName ?? e?.memberID ?? "deactivated"}
        bio={e?.memberID?.bio ?? "N/A"}
        role={e.role}
        credit={e?.credit}
        userID={userID}
      />)}
      {/* <Membercard />
      <Membercard />
      <Membercard /> */}
    </div>
  )
}

const Membercard = ({ name = "", bio = "", role = "member", credit = -1, isAdmin, memberID, groupID, isOwner , userID}: any) => {
  const { PromoteOrDemoteAsAdmin }: any = useGroup();
  return (
    <div className='flex items-center justify-between p-3 border m-1 rounded border-border'>
      <p className='capitalize flex-1 truncate '>{name} {role == "admin" && <Badge variant="secondary">{role}</Badge>}</p>
      <p className='flex items-center min-w-[5rem]'> <BiRupee /> {credit}</p>

      {isAdmin &&
        <Sheet>
          <SheetTrigger>
            <Button variant={'outline'}>
              <MoreVertical />
            </Button>
          </SheetTrigger>
          <SheetContent>
            {/* options */}
            <>
              <SheetHeader>
                <SheetTitle>
                  {name}{"  "}
                  {role == "admin" && <Badge variant="secondary">{role}</Badge>}
                </SheetTitle>
                <SheetDescription>
                  {bio}
                </SheetDescription>
              </SheetHeader>
              <div className='flex flex-col mt-5'>
                {
                  role == "admin" ?
                    <ActionButton
                      disabled={!isOwner}
                      onClick={() => {
                        PromoteOrDemoteAsAdmin(memberID, groupID, false)
                      }}>
                      Demote as admin
                    </ActionButton>
                    :
                    <ActionButton
                      disabled={!isOwner}
                      onClick={() => {
                        PromoteOrDemoteAsAdmin(memberID, groupID, true)
                      }}>
                      Promote as admin
                    </ActionButton>
                }
                <AmountActionForm credit={credit} memberID={memberID} groupID={groupID} userID={userID}/>
              </div>
            </>
            {/*  */}
          </SheetContent>
        </Sheet>
      }
    </div>
  )
}

const ActionButton = (props: any) => {
  return (
    <Button variant={'outline'} className='justify-start' {...props}>{props.children}</Button>
  )
}

const AmountActionForm = ({ credit = "" ,memberID, groupID ,userID}: any) => {
  const { ManageUserCredit}: any = useGroup();
  const [amount, setamount] = useState('')
  return (
    <div className='flex flex-col gap-2 my-5'>
      <LableWithInput
        placeholder='enter amount'
        label={`credit (${credit+ " + "}${amount.length ? amount : "0"}  =  ${credit + (+amount)})`}
        type='number'
        value={amount}
        onChangeText={(e) => setamount(e)} />
      <div className='ml-auto'>
        <Button onClick={()=>{
          ManageUserCredit(memberID,groupID,userID,+amount)
        }}>Update fund</Button>
      </div>
    </div>
  )
}