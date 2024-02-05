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
    SendInviteResponse : {},
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
            group = arr?.filter((e: any) => {
                // console.log("in local fetch " ,e)
                return e = e?._id == _id
            })?.[0]
        }
        group?.users?.map((e: any) => {
            if (e?.memberID?._id == userID) {
                myCredit = e?.credit;
                if (e?.role == "admin") {
                    isAdmin = true
                    return;
                }
            }
            return;
        });
        set({
            groupByID: { ...group, isAdmin, myCredit }
        })
    },

    setGroup: async (data: any) => {
        set({
            userDetail: data
        })
    },

    HandleChangeGroup  : async(apiGroup:any)=>{
        let arr = useGroup.getState().myGroups
        let oldData = arr.filter((e: any) => { return e = e._id != apiGroup._id })
        let prevgroupByID = useGroup?.getState()?.groupByID;
        set({
            myGroups: [...oldData ,apiGroup],
            groupByID:{...prevgroupByID , ...apiGroup}
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
                let prevgroupByID = useGroup?.getState()?.groupByID;
                set({
                    myGroups: [...oldData ,res.data.group],
                    groupByID:{...prevgroupByID , ...res?.data?.group}
                })

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
    },

    GenrateInviteKey: async (groupID: any , userID:any) => {
        try {
            set({ isGroupLoading: true })
            let res = await axios.post(`${API_URL}/group/genrateinvitelink`, {groupID}, { headers });
            console.log(res)
            if (res.data.success) {
                await useGroup.getState().HandleChangeGroup(res?.data?.data);
                toast.success("genrate invite key succesfully");
            }
        } catch (error) {
            console.log(error)
            toast.error("genrate invite key failed")
        }
    },

    RemoveInviteKey: async (groupID: any , inviteKeyID:any) => {
        try {
            set({ isGroupLoading: true })
            let res = await axios.post(`${API_URL}/group/removeinvitelink`, {groupID , inviteKeyID}, { headers });
            // console.log(res)
            if (res.data.success) {
                await useGroup.getState().HandleChangeGroup(res?.data?.data);
                toast.success("remove invite key succesfully");
            }
        } catch (error) {
            console.log(error)
            toast.error("remove invite key failed")
        }finally {
            set({
                isGroupLoading: false
            })
        }
    },

    SendInviteRequest: async (inviteKey: any , IV:any) => {
        try {
            set({ isGroupLoading: true })
            let res = await axios.post(`${API_URL}/group/sendrequest`, {IV , inviteKey}, { headers });
            // console.log(res)
            if (res.data.success) {
                toast.success("request send success");
            }
        } catch (error:any) {
            console.log(error)
            toast.error( error?.response?.data?.message || "request send faield")
            // if(error?.response)
        } finally {
            set({
                isGroupLoading: false
            })
        }
    },
    GroupInviteReponse: async (memberID: any , groupID:any , isAccept:any = false) => {
        try {
            set({ isGroupLoading: true })
            let res = await axios.post(`${API_URL}/group/groupinviteresponse`, {memberID , groupID , isAccept}, { headers });
            // console.log(res)
            if (res.data.success) {
                await useGroup.getState().HandleChangeGroup(res?.data?.data);
                toast.success(res?.data?.message || "something went wrong");
            }
        } catch (error) {
            console.log(error)
            toast.error("failed to add")
        } finally {
            set({
                isGroupLoading: false
            })
        }
    }


}))