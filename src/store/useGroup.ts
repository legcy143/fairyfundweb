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

export const useGroup = create((set: any) => ({
    isGroupLoading: false,
    statusHandler: false,
    myGroups: [],
    groupByID: {},

    // local fetch and add it in object with user detail like is he is admin or not
    localFetchGroupByID: async (_id: string, userID: string) => {
        let arr: any = useGroup?.getState()?.myGroups;
        let isAdmin = false;
        let myCredit = 0;
        let group = [];
        if (arr.length == 0) {
            try {
                let res = await axios.get(`${API_URL}/group/fetchgroup/${_id}`, { headers });
                if (res.data.success) {
                    group = res.data.data;
                }
            } catch (e: any) {
                toast.error(e.response.data.message)
            }

        } else {
            group = arr.filter((e: any) => {
                return e = e._id == _id
            })?.[0]
        }
        group?.users?.map((e: any) => {
            if(e?.memberID?._id == userID){
                myCredit = e?.credit;
                if (e?.role == "admin") {
                    isAdmin = true
                    return;
                }
            }
            return;
        });
        set({
            groupByID: { ...group, isAdmin , myCredit}
        })
    },

    setGroup: async (data: any) => {
        set({
            userDetail: data
        })
    },

    fetchMyGroups: async () => {
        try {
            set({
                isGroupLoading: true,
            })
            let res: any = await axios.get(`${API_URL}/group/fetchmygroup`, { headers })
            if (res.data.success) {
                // console.log("groups from fetching ", res)
                set({
                    myGroups: res.data.groups
                })
            }
        } catch (e) {
            console.log("fetch groups error ", e)
        }
        finally {
            set({
                isGroupLoading: false
            })
        }
    },
    // admin actions
    addNewItem: async (data: any, userID: any) => {
        try {
            let res: any = await axios.post(`${API_URL}/group/additem`, data, { headers })
            if (res.data.success) {
                let arr = useGroup.getState().myGroups
                let oldData = arr.filter((e: any) => { return e = e._id != data.groupID })
                set({
                    myGroups: [res.data.group, ...oldData]
                })
                
                await useGroup.getState().localFetchGroupByID(data.groupID, userID)
                toast.success("added suucesfully")
            }
        } catch (e) {
            toast.error("failed to add product")
            console.log("error in adding products", e)
        }
        finally {
            set({
                isGroupLoading: false
            })
        }
    },

    createNewGroup: async (data: any) => {
        try {
            set({ isGroupLoading: true })
            let res = await axios.post(`${API_URL}/group/create`, data, { headers })
            if (res.data.success) {
                let prevList = useGroup?.getState()?.myGroups;
                set({
                    myGroups: [res.data?.group, ...prevList],
                    statusHandler: true
                })
                toast.success("group created succesfully")
            }
        } catch (error) {
            toast.error("group creation failed")
        } finally {
            setTimeout(() => {
                set({
                    isGroupLoading: false,
                    statusHandler: false,
                })
            }, 100);
        }
    }



}))