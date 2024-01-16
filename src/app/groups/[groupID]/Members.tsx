import React from 'react'
import { BiRupee } from "react-icons/bi";

export default function Members({ members = [{ _id: '0', role:"", credit: 0 }] }) {
  return (
    <div>
      {members?.map((e:any) => <Membercard key={e?._id} name={e?.memberID.userName} role={e.role} credit={e?.credit} />)}
      {/* <Membercard />
      <Membercard />
      <Membercard /> */}
    </div>
  )
}

const Membercard = ({ name = "", role = "member", credit = -1 }) => {
  return (
    <div className='flex items-center justify-between p-3 border m-1 rounded border-border'>
      <p className='capitalize flex-1 truncate '>{name}{role == "admin" && " (admin)"}</p>
      <p className='flex items-center min-w-[5rem]'> <BiRupee/> {credit}</p>
    </div>
  )
}