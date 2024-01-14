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

export function Provider({ children, ...props }: ThemeProviderProps) {
    const { fetchUser, isLogged }: any = useAuth()
    const { fetchMyGroups }: any = useGroup()
    useEffect(() => {
        console.log(isLogged)
        if (typeof window != undefined) {
            if (!isLogged)
                fetchUser()
            if (isLogged)
                fetchMyGroups()
        }
    }, [isLogged])

    // useEffect(() => {
    //     if (typeof window != undefined) {
    //         let checkUser = () => {
    //             axios.post(`${API_URL}/user/fetchuser`, {}, {
    //                 headers: {
    //                     authorization: localStorage.getItem("authtoken")
    //                 }
    //             }).then((e) => {
    //                 if (e.data.success) {
    //                     setUser(e.data.user);
    //                     // if over searching for group
    //                     axios.get(`${API_URL}/group/fetchmygroup`, {
    //                         headers: {
    //                             authorization: localStorage.getItem("authtoken")
    //                         }
    //                     }).then((e) => {
    //                         if (e.data.success) {
    //                             console.log("hii")
    //                             router.push(`/groups/${e.data?.groups[0]?._id}`)
    //                         }
    //                         console.log(e)
    //                     })
    //                 }
    //             }).catch((e) => {
    //                 router.push("/authentication")
    //             })
    //         }
    //         checkUser()
    //     }
    // }, []);


    return (
        <NextThemesProvider {...props}>
            <ToastContainer />
            {children}
        </NextThemesProvider>
    )
}