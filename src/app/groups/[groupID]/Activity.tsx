import React from 'react'

export default function Activity({activityList = []}:any) {
  return (
    <div className='flex flex-col gap-3 max-w-[40rem] mx-auto'>
        {activityList?.map((e:any)=>{
            return(
                <div className='bg-secondary p-3 rounded'>
                <p className='text-base font-bold'>{e.title}</p>
                <p className='text-sm my-1'>{e.message}</p>
                </div>
            )
        })}
    </div>
  )
}
