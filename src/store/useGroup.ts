"use client"
import { create } from "zustand";
import { API_URL } from "@/constants/API_URL";
import axios from 'axios'

let authToken: string | null = '';
if (typeof window !== 'undefined') {
    authToken = localStorage.getItem("authtoken")
}

const headers:any = {
    authorization: authToken,
};

export const useGroup = create((set) => ({
    isLoading: false,
    myGroups: null,

    setGroup: async (data: any) => {
        set({
            userDetail: data
        })
    },

    fetchMyGroups: async () => {
        try {
            console.log("starting loadin groups")
            set({
                isLoading: true,
            })
            let res: any = await axios.get(`${API_URL}/group/fetchmygroup`, { headers })
            if (res.data.success) {
                console.log("groups from fetching ", res)
                set({
                    myGroups: res.data.groups
                })
            }
        } catch (e) {
            console.log("fetch groups error ", e)
        }
        finally {
            set({
                isLoading: false
            })
        }
    },
    // admin actions
    addNewItem: async (data: any) => {
        try {
            let res: any = await axios.get(`${API_URL}/group/additem`, { headers })
            if (res.data.success) {
                console.log("groups from fetching ", res)
                set({
                    myGroups: res.data.groups
                })
            }
        } catch (e) {
            console.log("fetch groups error ", e)
        }
        finally {
            set({
                isLoading: false
            })
        }
    },



}))