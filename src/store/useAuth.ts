"use client"
import { create } from "zustand";
import { API_URL } from "@/constants/API_URL";
import axios from 'axios'
import { toast } from "react-toastify";
import { toast as toastUi } from "sonner"

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
    isModelLoading: false,
    OtpRes: false,

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
            // toastUi("Event has been created", {
            //     description: "Sunday, December 03, 2023 at 9:00 AM",
            //     action: {
            //       label: "Undo",
            //       onClick: () => console.log("Undo"),
            //     },
            //   })
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
            let res: any = await axios.post(`${API_URL}/user/notification/seenall`, {}, { headers })
            console.log("res", res)
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
            let res: any = await axios.post(`${API_URL}/user/notification/removeall`, {}, { headers })
            if (res.data.success) {
                set({ userDetail: res.data.data })
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
    GetOtp: async (email: string, otpGeneratorDetail: string = "") => {
        set({
            isModelLoading: true,
        })
        let oldEmail: any = useAuth.getState().userDetail
        try {
            if (oldEmail?.email == email) {
                toast.error("both emails are look same")
                return
            }
            let res: any = await axios.post(`${API_URL}/user/otp/getotp`, { email, otpGeneratorDetail }, { headers })
            console.log(res)
            if (res.data.success) {
                set({
                    OtpRes: res.data.success
                })
                toast(res?.data?.message)
            }
        } catch (e: any) {
            console.log(e)
            toast(e?.response?.data?.message)
        }
        finally {
            set({
                isModelLoading: false
            })
        }
    },

    UpdateEmail: async (email: string, otp: number) => {
        set({
            isUserLoading: true,
        })
        try {
            let res: any = await axios.post(`${API_URL}/user/otp/updateemail`, { email, otp }, { headers })
            if (res.data.success) {
                set({
                    userDetail: res.data.data
                })
                toast(res?.data?.message);
                return 1;
            }
        } catch (e: any) {
            console.log(e)
            toast(e?.response?.data?.message)
            return -1;
        }
        finally {
            set({
                isUserLoading: false
            })
        }
    },
    RateUs: async (star: number, message: string) => {
        set({
            isUserLoading: true,
        })
        try {
            let res: any = await axios.post(`${API_URL}/user/rateus`, { star, message }, { headers })
            if (res.data.success) {
                set({
                    userDetail: res.data.data
                })
                toast(res?.data?.message);
                return 1;
            }
        } catch (e: any) {
            console.log(e)
            toast(e?.response?.data?.message)
            return -1;
        }
        finally {
            set({
                isUserLoading: false
            })
        }
    },

  

}))