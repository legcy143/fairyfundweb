import React from 'react'

export default function Members({ members = [{ _id: '0', role:"", credit: 0 }] }) {
  return (
    <div>
      {members?.map(e => <Membercard key={e?._id} name={e._id} role={e.role} credit={e?.credit} />)}
      {/* <Membercard />
      <Membercard />
      <Membercard /> */}
    </div>
  )
}

const Membercard = ({ name = "", role = "member", credit = -1 }) => {
  return (
    <div className='flex items-center justify-between p-3 border m-1 rounded border-border'>
      <p className='capitalize'>{name}{role == "admin" && "(admin)"}</p>
      <p>{credit}</p>
    </div>
  )
}