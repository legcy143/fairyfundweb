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
    SendInviteResponse: {},
    myGroups: [],
    groupByID: {},

    // local fetch and add it in object with user detail like is he is admin or not
    localFetchGroupByID: async (_id: string, userID: string) => {
        let arr: any = useGroup?.getState()?.myGroups;
        let isAdmin = false;
        let isOwner = false;
        let myCredit = 0;
        let group: any = [];
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
                isOwner = e?.memberID?._id == group?.groupOwner;
                // console.log(isOwner , e?.memberID?._id ,e?.groupOwner  ,group)
                myCredit = e?.credit;
                isAdmin = e?.role == "admin";
                return;
            }
            return;
        });
        set({
            groupByID: { ...group, isOwner, isAdmin, myCredit }
        })
    },


    HandleChangeGroup: async (apiGroup: any, userID?: any) => {
        let arr = useGroup.getState().myGroups
        let oldData = arr.filter((e: any) => { return e = e._id != apiGroup._id })
        let prevgroupByID = useGroup?.getState()?.groupByID;
        console.log(apiGroup, userID)
        if (userID) {
            let isAdmin = false;
            let isOwner = false;
            let myCredit = 0;
            apiGroup?.users?.map((e: any) => {
                if (e?.memberID?._id == userID) {
                    isOwner = e?.memberID?._id == apiGroup?.groupOwner;
                    myCredit = e?.credit;
                    isAdmin = e?.role == "admin";
                    return;
                }
                return;
            });
            set({
                myGroups: [...oldData, apiGroup],
                groupByID: { ...prevgroupByID, ...apiGroup, isOwner, isAdmin, myCredit }
            })
        }
        else {
            set({
                myGroups: [...oldData, apiGroup],
                groupByID: { ...prevgroupByID, ...apiGroup }
            })
        }
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
            set({
                isGroupLoading: true
            })
            let res: any = await axios.post(`${API_URL}/group/additem`, data, { headers })
            if (res.data.success) {
                console.log(userID)
                useGroup.getState().HandleChangeGroup(res?.data?.group, userID)
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
    LeaveGroup: async (groupID: any) => {
        try {
            set({ isGroupLoading: true })
            let res = await axios.post(`${API_URL}/group/leave`, { groupID }, { headers })
            if (res.data.success) {
                window.location.href = "/"
                toast.success(res.data.message || "client side error")
            }
        } catch (error: any) {
            console.log("hii there", error)
            toast.error(error?.response?.data?.message || "failed to leave group")
        } finally {
            setTimeout(() => {
                set({
                    isGroupLoading: false,
                })
            }, 100);
        }
    },
    deleteGroup: async (groupID: any) => {
        try {
            set({ isGroupLoading: true })
            let res = await axios.post(`${API_URL}/group/delete`, { groupID }, { headers })
            if (res.data.success) {
                window.location.href = "/"
                toast.success(res.data.message || "client side error")
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "failed to leave group")
        } finally {
            setTimeout(() => {
                set({
                    isGroupLoading: false,
                })
            }, 100);
        }
    },

    GenrateInviteKey: async (groupID: any, userID: any) => {
        try {
            set({ isGroupLoading: true })
            let res = await axios.post(`${API_URL}/group/genrateinvitelink`, { groupID }, { headers });
            console.log(res)
            if (res.data.success) {
                await useGroup.getState().HandleChangeGroup(res?.data?.data);
                toast.success("genrate invite key succesfully");
            }
        } catch (error) {
            console.log(error)
            toast.error("genrate invite key failed")
        } finally {
            set({ isGroupLoading: false })
        }
    },

    RemoveInviteKey: async (groupID: any, inviteKeyID: any) => {
        try {
            set({ isGroupLoading: true })
            let res = await axios.post(`${API_URL}/group/removeinvitelink`, { groupID, inviteKeyID }, { headers });
            // console.log(res)
            if (res.data.success) {
                await useGroup.getState().HandleChangeGroup(res?.data?.data);
                toast.success("remove invite key succesfully");
            }
        } catch (error) {
            console.log(error)
            toast.error("remove invite key failed")
        } finally {
            set({
                isGroupLoading: false
            })
        }
    },

    SendInviteRequest: async (inviteKey: any, IV: any) => {
        try {
            set({ isGroupLoading: true })
            let res = await axios.post(`${API_URL}/group/sendrequest`, { IV, inviteKey }, { headers });
            // console.log(res)
            if (res.data.success) {
                toast.success("request send success");
            }
        } catch (error: any) {
            console.log(error)
            toast.error(error?.response?.data?.message || "request send faield")
            // if(error?.response)
        } finally {
            set({
                isGroupLoading: false
            })
        }
    },
    GroupInviteReponse: async (memberID: any, groupID: any, isAccept: any = false) => {
        try {
            set({ isGroupLoading: true })
            let res = await axios.post(`${API_URL}/group/groupinviteresponse`, { memberID, groupID, isAccept }, { headers });
            // console.log(res)
            if (res.data.success) {
                await useGroup.getState().HandleChangeGroup(res?.data?.data);
                toast.success(res?.data?.message || "something went wrong");
            }
        } catch (error) {
            // console.log(error)
            toast.error("failed to add")
        } finally {
            set({
                isGroupLoading: false
            })
        }
    },
    PromoteOrDemoteAsAdmin: async (memberID: any, groupID: any, isPromote: any = false) => {
        // console.log("promote as admin")
        try {
            set({ isGroupLoading: true })
            let res = await axios.post(`${API_URL}/group/promoteordemoteasadmin`, { memberID, groupID, isPromote }, { headers });
            // console.log(res)
            if (res.data.success) {
                await useGroup.getState().HandleChangeGroup(res?.data?.data);
                toast.success(res?.data?.message || "something went wrong");
            }
        } catch (error: any) {
            // console.log(error)
            toast.error(error?.response?.data?.message || "failed")
        } finally {
            set({
                isGroupLoading: false
            })
        }
    },

    ManageUserCredit: async (memberID: any, groupID: any, userID: any, amount: any) => {
        try {
            set({ isGroupLoading: true })
            let res = await axios.post(`${API_URL}/group/manageusercredit`, { memberID, groupID, amount }, { headers });
            if (res.data.success) {
                console.log(res)
                await useGroup.getState().HandleChangeGroup(res?.data?.data, userID);
                toast.success(res?.data?.message || "something went wrong");
            }
        } catch (error: any) {
            console.log(error)
            toast.error(error?.response?.data?.message || "failed")
        } finally {
            set({
                isGroupLoading: false
            })
        }
    },
    // todo handler userID , groupID ,todo
    AddTodo: async (groupID: string, userID: string, todo: string) => {
        try {
            set({ isGroupLoading: true })
            let res = await axios.post(`${API_URL}/group/todo/add`, { groupID, todo }, { headers });
            if (res.data.success) {
                console.log(res)
                await useGroup.getState().HandleChangeGroup(res?.data?.data, userID);
                toast.success(res?.data?.message || "something went wrong");
            }
        } catch (error: any) {
            console.log(error)
            toast.error(error?.response?.data?.message || "failed")
        } finally {
            set({
                isGroupLoading: false
            })
        }
    },
    MarkAsDoneTodo: async (groupID: string, userID: string, todoID: string ) => {
        try {
            set({ isGroupLoading: true })
            let res = await axios.post(`${API_URL}/group/todo/done`, { groupID, todoID }, { headers });
            if (res.data.success) {
                console.log(res)
                await useGroup.getState().HandleChangeGroup(res?.data?.data, userID);
                toast.success(res?.data?.message || "something went wrong");
            }
        } catch (error: any) {
            console.log(error)
            toast.error(error?.response?.data?.message || "failed")
        } finally {
            set({
                isGroupLoading: false
            })
        }
    },
    DeleteTodo: async (groupID: string, userID: string, todoID: string) => {
        try {
            set({ isGroupLoading: true })
            let res = await axios.post(`${API_URL}/group/todo/delete`, { groupID, todoID }, { headers });
            if (res.data.success) {
                // console.log(res)
                await useGroup.getState().HandleChangeGroup(res?.data?.data, userID);
                toast.success(res?.data?.message || "something went wrong");
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "failed")
        } finally {
            set({
                isGroupLoading: false
            })
        }
    },



}))