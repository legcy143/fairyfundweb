import PathListType from "@/types/PathListType";
import { LuUser2 } from "react-icons/lu";
import { MdOutlineDashboard } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { CgProfile } from "react-icons/cg";




export const AdminPathList: PathListType[] = [
    {
        pathname: "dashboard",
        path: "/admin/dashboard",
        icon: <MdOutlineDashboard />
    },
    {
        pathname: "users",
        path: "/admin/users",
        icon: <LuUser2 />
    },
    {
        pathname: "groups",
        path: "/admin/groups",
        icon: <HiOutlineUserGroup />
    },
    {
        pathname: "profile",
        path: "/admin/profile",
        icon: <CgProfile />
    },
]

