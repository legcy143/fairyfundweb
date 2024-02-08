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





export default function Members({ members, isAdmin }: any) {
  return (
    <div>
      {/* {members?.map((e:any) => console.log(e))} */}
      {members?.map((e: any) => <Membercard isAdmin={isAdmin} key={e?._id} name={e?.memberID?.userName ?? e?.memberID ?? "deactivated"} role={e.role} credit={e?.credit} />)}
      {/* <Membercard />
      <Membercard />
      <Membercard /> */}
    </div>
  )
}

const Membercard = ({ name = "", role = "member", credit = -1, isAdmin }: any) => {
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
              role== "admin" ? 
              <DropdownMenuItem onClick={() => {
                console.log("yo gyus")
              }}>
                 Demote as admin
              </DropdownMenuItem>
              :
               <DropdownMenuItem onClick={() => {
                console.log("yo gyus")
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