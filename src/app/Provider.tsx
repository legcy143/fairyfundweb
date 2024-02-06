"use client"

import React, { useEffect, useState } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { useRouter } from "next/navigation"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import { API_URL } from "@/constants/API_URL"
import { useAuth } from "@/store/useAuth"
import { useGroup } from "@/store/useGroup"
import ModelSpinner from "@/components/legcyUI/ModelSpinner"

export function Provider({ children, ...props }: ThemeProviderProps) {
    const { fetchUser, isLogged, startFetching }: any = useAuth()
    const { fetchMyGroups }: any = useGroup()
    useEffect(() => {
        // console.log(isLogged)
        if (typeof window != undefined) {
            if (!isLogged)
                fetchUser()
            if (isLogged)
                fetchMyGroups()
        }
    }, [isLogged])

    return (
        <NextThemesProvider {...props}>
            <ToastContainer
                className={'max-w-[90%]'}
                position="top-right"
                autoClose={2000}
                closeOnClick={false}
                draggable={true}
                pauseOnHover={false}
            />
            {startFetching && <ModelSpinner />}
            {children}
        </NextThemesProvider>
    )
}