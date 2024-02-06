"use client"
import { useAuth } from '@/store/useAuth'
import { useGroup } from '@/store/useGroup'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
  

export default function JoinHandler() {
    const query = useSearchParams()
    const key = query.get('key')
    const iv = query.get('iv')
    const { userDetail }: any = useAuth();
    const {SendInviteRequest} = useGroup();
    useEffect(() => {
        if (userDetail && key && iv) {
            SendInviteRequest(key , iv)
        }
    }, [userDetail])

    return (
        <div>
            sending request work fine
        </div>
    )
}


