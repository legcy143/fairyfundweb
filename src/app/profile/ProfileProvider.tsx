"use client"

import React from "react"
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "@/store/useAuth"
import ModelSpinner from "@/components/legcyUI/ModelSpinner"

export function ProfileProvider({ children }: any) {
    const { isUserLoading }: any = useAuth()
   
    return (
        <>
            {isUserLoading && <ModelSpinner />}
            {children}
        </>
    )
}