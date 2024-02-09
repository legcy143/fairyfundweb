import ModelSpinner from '@/components/legcyUI/ModelSpinner'
import { useAdminAuth } from '@/store/admin/useAdminAuth'
import React, { useEffect } from 'react'

export function AdminProvider({ children, ...props }: any) {
    const { isAuthLoading , isAdminLogged , FetchAdminProfile} = useAdminAuth()
    useEffect(() => {
        // console.log(isLogged)
        if (typeof window != undefined) {
            if (!isAdminLogged)
                FetchAdminProfile()
        }
    }, [isAdminLogged])

    return (
        <>
            {isAuthLoading && <ModelSpinner />}
            {children}
        </>
    )
}