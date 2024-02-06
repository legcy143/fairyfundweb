"use client"
import Loading from '@/app/Loading'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/store/useAuth'
import { useGroup } from '@/store/useGroup'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
  

export default function JoinHandler() {
    const router = useRouter();
    const query = useSearchParams()
    const key = query.get('key')
    const iv = query.get('iv')
    const { userDetail , isLoading }: any = useAuth();
    const {SendInviteRequest} = useGroup();
    useEffect(() => {
        if (userDetail && key && iv) {
            SendInviteRequest(key , iv)
        }
    }, [userDetail])

    if(isLoading){
        return <p>loading . . . </p>
    }
    if(!userDetail){
        return(
            <div className='w-full p-5 flex flex-col items-center justify-center capitalize gap-10'>
                <p>it seems you are not logged please login to continue</p>
                <Button onClick={()=>{router.push("/auth/login")}}>login</Button>
            </div>
        ) 
    }

    return (
        <div>
            sending request work fine
        </div>
    )
}


