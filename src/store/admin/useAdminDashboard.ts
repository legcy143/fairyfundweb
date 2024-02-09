"use client"
import { create } from "zustand";
import { API_URL } from "@/constants/API_URL";
import axios from 'axios'
import { toast } from "react-toastify";

let authToken: string | null = '';
if (typeof window !== 'undefined') {
    authToken = localStorage.getItem("authtoken")
}

const headers: any = {
    authorization: authToken,
};

export const useAdminDashboard = create((set: any) => ({
    isAdminLoading: false,
    allUsers:[],
    allGroups:[],

    fethAllUsers:async()=>{
        try {
            set({
                isAdminLoading: true,
            })
            let res: any = await axios.get(`${API_URL}/admin/users`, { headers })
            if (res.data.success) {
                set({
                    allUsers: res.data.data
                })
            }
        } catch (error:any) {
            toast.error(error?.response?.data?.message)
        }
        finally{
            set({isAdminLoading:false})
        }
    },
    fethAllGroups:async()=>{
        try {
            set({
                isAdminLoading: true,
            })
            let res: any = await axios.get(`${API_URL}/admin/groups`, { headers })
            if (res.data.success) {
                set({
                    allGroups: res.data.data
                })
            }
        } catch (error:any) {
            toast.error(error?.response?.data?.message)
        }
        finally{
            set({isAdminLoading:false})
        }
    },
}))