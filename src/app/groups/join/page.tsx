"use client"
import { useAuth } from '@/store/useAuth'
import { useGroup } from '@/store/useGroup'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

export default function page() {
    const query = useSearchParams()
    const key = query.get('key')
    const iv = query.get('iv')
    console.log(query, key, iv)
    const { userDetail }: any = useAuth();
    const {SendInviteRequest} = useGroup();
    useEffect(() => {
        if (userDetail && key && iv) {
            SendInviteRequest(key , iv)
            console.log("use detail")
        }
    }, [userDetail])

    return (
        <div>page</div>
    )
}
