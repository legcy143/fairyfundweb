import TimeAgo from '@/utils/TimeAgo'
import React from 'react'

export default function Activity({ activityList = [] }: any) {
    return (
        <div className='flex flex-col gap-3 mx-auto'>
            {activityList?.map((e: any) => {
                return (
                    <div className='bg-secondary p-3 rounded'>
                        <div className='flex items-center justify-between'>
                            <p className='text-base font-bold  '>{e.title}</p>
                            <p className='text-xs opacity-50'>{TimeAgo(new Date(e?.createdAt))}</p>
                        </div>
                        <p className='text-sm my-1'>{e.message}</p>
                    </div>
                )
            })}
        </div>
    )
}
