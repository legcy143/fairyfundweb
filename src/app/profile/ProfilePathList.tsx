import PathListType from "@/types/PathListType";
import { LuUser2 } from "react-icons/lu";
import { LiaUserEditSolid } from "react-icons/lia";
import { CircleUser, MessageSquareText, Settings, Sparkles } from "lucide-react";

export const ProfilePathList: PathListType[] = [
    {
        pathname: "profile",
        path: "/profile",
        icon: <CircleUser size={18}/>
    },
    {
        pathname: "edit",
        path: "/profile/edit",
        icon: <LiaUserEditSolid />
    },
    {
        pathname: "setting",
        path: "/profile/setting",
        icon: <Settings size={18}/>
    },
    {
        pathname: "rate us",
        path: "/profile/rating",
        icon: <Sparkles size={18}/>
    },
]