"use client"
import { create } from "zustand";
import { API_URL } from "@/constants/API_URL";
import axios from 'axios'
import { toast } from "react-toastify";

let authToken: string | null = '';
if (typeof window !== 'undefined') {
    authToken = sessionStorage.getItem("Adminauthtoken")
}

const headers: any = {
    authorization: authToken,
};

export const useAdminAuth = create((set: any) => ({
    isAuthLoading: false,
    isAdminLogged: false,
    adminDetail: null,
    isProfileLoading: false,

    GetOtp :async(data:any)=>{
        try {
            set({
                isAuthLoading: true,
            })
            let res: any = await axios.post(`${API_URL}/admin/getotp`, data, { headers })
            if (res.data.success) {
                // set({
                //     isLogged: true,
                //     adminDetail: res.data.data
                // })
                toast.success("otp send succesfully")
            }
        } catch (error:any) {
            toast.error(error?.response?.data?.message)
        }
        finally{
            set({isAuthLoading:false})
        }
    },

    verify2f :async(data:any)=>{
        try {
            set({
                isAuthLoading: true,
            })
            let res: any = await axios.post(`${API_URL}/admin/verify2f`, data, { headers })
            if (res.data.success) {
                sessionStorage.setItem("authtoken" , res.data.data.jwt)
                set({
                    isAdminLogged: true,
                    adminDetail: res.data.data.profile
                })
                toast.success("logged succesfully")
            }
        } catch (error:any) {
            toast.error(error?.response?.data?.message || "Internal server error")
        }
        finally{
            set({isAuthLoading:false})
        }
    },
    FetchAdminProfile :async()=>{
        try {
            set({
                isAuthLoading: true,
            })
            let res: any = await axios.post(`${API_URL}/admin/fetchprofile`, {}, { headers })
            if (res.data.success) {
                set({
                    isAdminLogged: true,
                    adminDetail: res.data.data
                })
                toast.success("fetch admin profile succesfully")
            }
        } catch (error:any) {
            toast.error(error?.response?.data?.message || "Internal server error")
        }
        finally{
            set({isAuthLoading:false})
        }
    }


}))