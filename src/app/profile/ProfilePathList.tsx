import PathListType from "@/types/PathListType";
import { LuUser2 } from "react-icons/lu";
import { LiaUserEditSolid } from "react-icons/lia";

export const ProfilePathList: PathListType[] = [
    {
        pathname: "profile",
        path: "/profile",
        icon: <LuUser2 />
    },
    {
        pathname: "edit",
        path: "/profile/edit",
        icon: <LiaUserEditSolid />
    }
]