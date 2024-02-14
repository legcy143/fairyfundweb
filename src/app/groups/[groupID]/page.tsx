"use client"
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { BiRupee } from "react-icons/bi";
import { FaUserGroup } from "react-icons/fa6";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Products from './Products';
import NotFound from './NotFound';
import Members from './Members';
import { useGroup } from '@/store/useGroup';
import { useAuth } from '@/store/useAuth';
import Error404 from '@/components/local/Error404';
import AddItem from './AddItem';
import Requests from './Requests';
import InviteKey from './InviteKey';
import Setting from './Setting';
import Activity from './Activity';
import { ActivityIcon, CheckSquare, LinkIcon, PackagePlusIcon, Settings, ShoppingBasketIcon, UserPlusIcon, UsersRoundIcon } from 'lucide-react';
import Todo from './Todo';


export default function page() {
    const { groupID }: any = useParams();
    let router = useRouter();
    const { localFetchGroupByID, groupByID, isGroupLoading }: any = useGroup()
    const { isLogged, userDetail }: any = useAuth()

    useEffect(() => {
        if (userDetail) {
            localFetchGroupByID(groupID as string, userDetail?._id);
        }
        return () => {
            console.log("return from admin page")
        }
    }, [userDetail])

    // if (isGroupLoading) {
    //     return (
    //         <div>loading ..</div>
    //     )
    // }
    if (!groupByID) {
        return <Error404 />
    }

    const Options = [
        {
            value: <ValueTitle icon={<ShoppingBasketIcon />} title='Products' />,
            component: <Products itemsDetail={groupByID?.items} />
        },
        {
            value: <ValueTitle icon={<UsersRoundIcon />} title='members' />,
            component: <Members members={groupByID?.users} groupID={groupID} isAdmin={groupByID?.isAdmin} isOwner={groupByID?.isOwner} userID={userDetail?._id} />
        },
        {
            value: <ValueTitle icon={<ActivityIcon />} title='activity' />,
            component: <Activity activityList={groupByID?.activity} />
        },
        {
            value: <ValueTitle icon={<CheckSquare />} title='todo' />,
            component: <Todo isAdmin={groupByID?.isAdmin} groupID={groupID} userID={userDetail?._id} todoList={groupByID?.todos}/>
        },
    ]
    const AdminOptions = [
        {
            value: <ValueTitle icon={<PackagePlusIcon />} title='add product' />,
            component: <AddItem groupID={groupID} userID={userDetail?._id} membersList={groupByID?.users} />
        },
        {
            value: <ValueTitle icon={<UserPlusIcon />} title={`Request ${groupByID?.request?.length > 0 ? `(${groupByID?.request?.length})` : ""}`} />,

            component: <Requests requestList={groupByID?.request} groupID={groupID as string} />
        },
        {
            value: <ValueTitle icon={<LinkIcon />} title='invite keys' />,
            component: <InviteKey keysList={groupByID?.inviteKeys} groupID={groupID as string} userID={userDetail?._id} />
        },
    ]
    let tabOptions: any = [...Options]
    if (groupByID?.isAdmin) {
        tabOptions = [...Options, ...AdminOptions]
    }

    tabOptions.push({
        value: <ValueTitle icon={<Settings />} title='setting' />,
        component: <Setting groupID={groupID as string} isAdmin={groupByID?.isAdmin} userID={userDetail?._id} />
    })
    // console.log(tabOptions)


    return (
        <div className='p-5'>
            <div className='mb-5 flex flex-wrap  justify-between gap-5'>
                <h2 className='capitalize font-semibold text-3xl flex-center gap-2'><FaUserGroup /> {groupByID?.groupName}</h2>
                <div className='flex items-center justify-center gap-3 w-full md:w-fit md:min-w-[22rem] '>
                    <MiniCard title='my credit' coin={groupByID.myCredit} />
                    <MiniCard title='group funds' coin={groupByID?.funds} />
                </div>
            </div>

            <Tabs defaultValue={tabOptions[0].value} className='max-h-[70vh] overflow-auto'>
                <TabsList className="w-[100%] overflow-auto h-fit justify-start sticky top-0 z-10">
                    {tabOptions?.map((e: any) => <TabsTrigger
                        key={e.value}
                        value={e.value}>
                        {e.value}
                    </TabsTrigger>
                    )}
                    {/* {groupByID?.isAdmin &&
                        <TabsTrigger
                            onClick={() => router.push(`${groupID}/admin`)}
                            value="admin">
                            admin
                        </TabsTrigger>
                    } */}
                </TabsList>
                {tabOptions?.map((e: any) => <TabsContent
                className='max-w-[50rem] mx-auto'
                    key={e.value}
                    value={e.value}>
                    {e.component}
                </TabsContent>
                )}
            </Tabs>


        </div>
    )
}
const MiniCard = ({ title = "my funds", coin = 0, icon = <BiRupee /> }) => {
    let errorStyle = ""
    return (
        <div className={`flex flex-col  rounded border p-4 text-base font-semibold transition-colors focus:outline-none border-solid bg-secondary text-secondary-foreground hover:bg-secondary/80 w-[100%] max-w-[15rem] ${errorStyle}`}>
            <p className='flex items-center justify-between capitalize'>{title} {icon}</p>
            <p className={`${coin < 0 ? 'text-red-500' : coin > 0 && 'text-green-500'}`}>{coin}</p>
        </div>
    )
}

const ValueTitle = ({ icon = <Settings size={15} />, title = "" }) => {
    return (
        <p className='flex items-center gap-1 capitalize'>
            {React.cloneElement(icon, { size: 15 })}
            {title}
        </p>
    )
}