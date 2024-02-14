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

export const useAuth = create((set: any) => ({
    isLoading: false,
    isLogged: false,
    userDetail: null,
    startFetching: false,
    isUserLoading: false,

    setUser: async (data: any) => {
        set({
            userDetail: data
        })
    },

    fetchUser: async () => {
        try {
            set({
                startFetching: true,
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
                startFetching: false,
                isLoading: false
            })
        }
    },
    UpdateProfile: async (data: any) => {
        try {
            set({
                startFetching: true,
            })
            let res: any = await axios.post(`${API_URL}/user/editprofile`, data, { headers })
            if (res.data.success) {
                set({
                    isLogged: true,
                    userDetail: res.data.user
                })
                toast.success("Update Profile succesfully")
            }
        } catch (e: any) {
            toast.error(e?.response?.data?.message)
            console.log("edit user profile error ", e)
        }
        finally {
            set({
                startFetching: false
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
                window.location.href = "/"
            }
        } catch (e: any) {
            if (e?.response?.data?.success == false) {
                toast(e.response.data.message)
            } else {
                toast("Internal Server Error")
            }
            console.log("login error res", e.response)
            // console.log("login error ", e)
        }
        finally {
            set({
                isLoading: false
            })
        }
    },

    signup: async (data: any) => {
        set({
            isLoading: true,
        })
        try {
            // let resdata = await axios.post(`${API_URL}/user/login` , {data})
            let res: any = await axios.post(`${API_URL}/user/signup`, data)
            if (res.data.success) {
                localStorage.setItem("authtoken", res.data.jwt)
                set({
                    isLogged: true,
                    userDetail: res.data.user
                })
                window.location.href = "/"
            }
        } catch (e: any) {
            if (e?.response?.data?.success == false) {
                toast(e.response.data.message)
            } else {
                toast("Internal Server Error")
            }
            console.log("login error res", e.response)
            // console.log("login error ", e)
        }
        finally {
            set({
                isLoading: false
            })
        }
    },

    logout: async () => {
        try {
            let res = await localStorage.removeItem("authtoken");
            console.log(res)
            window.location.href = "/auth/login"
        }
        catch (error) {
            toast("Failed to Logout")
            console.log("error : ", error)
        }
    },

    MarkAllSeenNotification: async () => {
        set({
            isUserLoading: true,
        })
        try {
            let res: any = await axios.post(`${API_URL}/user/notification/seenall`, {}, {headers})
            console.log("res" , res)
            if (res.data.success) {
                set({
                    userDetail: res.data.data
                })
            }
        } catch (e: any) {
            console.log(e)
            toast(e?.response?.data?.message)
        }
        finally {
            set({
                isUserLoading: false
            })
        }
    },
    RemoveAllNotification: async () => {
        set({
            isUserLoading: true,
        })
        try {
            let res: any = await axios.post(`${API_URL}/user/notification/removeall`, {}, {headers})
            if (res.data.success) {
                set({userDetail: res.data.data })
                toast(res?.data?.message)
            }
        } catch (e: any) {
            console.log(e)
            toast(e?.response?.data?.message)
        }
        finally {
            set({
                isUserLoading: false
            })
        }
    },

}))