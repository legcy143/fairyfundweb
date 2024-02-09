import React from 'react'
import { BiRupee } from "react-icons/bi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SlOptionsVertical as OptionIcons } from "react-icons/sl";
import { Button } from '@/components/ui/button';
import { useGroup } from '@/store/useGroup';





export default function Members({ members, isAdmin, groupID, isOwner }: any) {
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
        role={e.role}
        credit={e?.credit}
      />)}
      {/* <Membercard />
      <Membercard />
      <Membercard /> */}
    </div>
  )
}

const Membercard = ({ name = "", role = "member", credit = -1, isAdmin, memberID, groupID , isOwner }: any) => {
  const { PromoteOrDemoteAsAdmin }: any = useGroup();
  return (
    <div className='flex items-center justify-between p-3 border m-1 rounded border-border'>
      <p className='capitalize flex-1 truncate '>{name}{role == "admin" && " (admin)"}</p>
      <p className='flex items-center min-w-[5rem]'> <BiRupee /> {credit}</p>
      {isAdmin &&
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={'outline'}>
              <OptionIcons />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>{name}</DropdownMenuLabel>
            {
              role == "admin" ?
                <DropdownMenuItem
                disabled={!isOwner}
                 onClick={() => {
                  PromoteOrDemoteAsAdmin(memberID, groupID, false)
                }}>
                  Demote as admin
                </DropdownMenuItem>
                :
                <DropdownMenuItem 
                disabled={!isOwner}
                onClick={() => {
                  PromoteOrDemoteAsAdmin(memberID, groupID, true)
                }}>
                  Promote as admin
                </DropdownMenuItem>
            }
          </DropdownMenuContent>
        </DropdownMenu>
      }
    </div>
  )
}