"use client"

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import PathListType from '@/types/PathListType';



export type RouteListTypes = {
    PathList: PathListType[]
}
export default function RouteList({ PathList }: RouteListTypes) {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <>
            {PathList.map((e: any, i) => {
                let active = "bg-primary text-secondary";
                let nonAcitive = "hover:underline";
                return (
                    <div
                        key={i}
                        onClick={() => { router.push(e.path) }}
                        className={`md:px-4 h-[3rem] md:h-[2.7rem] rounded font-medium capitalize cursor-pointer flex flex-col md:flex-row items-center justify-center md:justify-start gap-0 md:gap-2 ${pathname == e.path ? active : nonAcitive}`}
                    >
                        <p className='text-xl md:text-lg'>
                            {e.icon}
                        </p>
                        <p className='font-normal md:font-medium text-xs md:text-base'>
                            {e.pathname}
                        </p>
                    </div>
                )
            })}
        </>
    )
}
