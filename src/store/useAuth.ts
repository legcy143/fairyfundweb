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

export const useAuth = create((set:any) => ({
    isLoading: false,
    isLogged: false,
    userDetail: null,

    setUser: async (data: any) => {
        set({
            userDetail: data
        })
    },

    fetchUser: async () => {
        try {
            set({
                isLoading: true,
            })
            let res: any = await axios.post(`${API_URL}/user/fetchuser`, {}, { headers })
            if (res.data.success) {
                set({
                    isLogged: true,
                    userDetail: res.data.user
                })
            }
        } catch (e) {
            console.log("fetch user profile error ", e)
        }
        finally {
            set({
                isLoading: false
            })
        }
    },

    login: async (data: any) => {
        set({
            isLoading: true,
        })
        try {
            // let resdata = await axios.post(`${API_URL}/user/login` , {data})
            let res: any = await axios.post(`${API_URL}/user/login`, data)
            if (res.data.success) {
                localStorage.setItem("authtoken", res.data.jwt)
                set({
                    isLogged: true,
                    userDetail: res.data.user
                })
                window.location.href="/"
            }
        } catch (e) {
            console.log("login error ", e)
        }
        finally {
            set({
                isLoading: false
            })
        }
    }

}))