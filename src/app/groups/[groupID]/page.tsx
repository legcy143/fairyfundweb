"use client"
import { Badge } from '@/components/ui/badge';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BiRupee } from "react-icons/bi";
import { FaUserGroup } from "react-icons/fa6";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Products from './Products';
import NotFound from './NotFound';
import Members from './Members';
import { useGroup } from '@/store/useGroup';
import { useAuth } from '@/store/useAuth';
import Admin from './Admin';


export default function page() {
    const { groupID } = useParams();
    const { myGroups }: any = useGroup()
    const { isLogged, userDetail }: any = useAuth()
    const [groupDetail, setgroupDetail] = useState<any>({ _id: 0 })
    const [groupLoading, setgroupLoading] = useState(true)
    const [isAdmin, setIsAdmin] = useState(false)
    const [myAmount, setmyAmount] = useState(0)
    useEffect(() => {
        if (groupID.length > 20 && isLogged && myGroups) {
            let g = myGroups.filter((e: any) => e._id == groupID);
            setgroupDetail(g[0])
            g[0].users?.map((e: any) => {
                if (e.memberID._id == userDetail._id) {
                    setmyAmount(e.credit)
                    if (e.role == "admin")
                        setIsAdmin(true)
                    return;
                }
            })
            // console.log("userDetail", userDetail, g[0])
            setgroupLoading(false)
        }
        return () => {
            setgroupDetail({ _id: 0 })
            setgroupLoading(true)
            setIsAdmin(false)
            setmyAmount(0)
        }
    }, [isLogged, myGroups])



    if (groupLoading) {
        return (
            <div>loading ..</div>
        )
    }
    if (!isLogged || !groupDetail?._id) {
        console.log(groupDetail)
        return (
            <div>404 || error</div>
        )
    }
    const tabOptions = [
        {
            value: "Products",
            component: <Products itemsDetail={groupDetail?.items} />
        },
        {
            value: "Members",
            component: <Members members={groupDetail?.users} />
        },
        {
            value: "history",
            component: <NotFound />
        },
        {
            value: "task",
            component: <NotFound />
        },
    ]
    return (
        <div className='p-5'>
            <div className='mb-5 flex flex-wrap  justify-between gap-5'>
                <h2 className='capitalize font-semibold text-3xl flex-center gap-2'><FaUserGroup /> {groupDetail?.groupName}</h2>
                <div className='flex items-center justify-center gap-3 w-full md:w-fit md:min-w-[22rem] '>
                    <MiniCard title='my funds' coin={myAmount} />
                    <MiniCard title='group funds' coin={groupDetail?.funds} />
                </div>
            </div>

            <Tabs defaultValue={tabOptions[0].value}>
                <TabsList className="w-[100%] overflow-auto h-fit justify-start">
                    {tabOptions?.map(e => <TabsTrigger
                        key={e.value}
                        value={e.value}>
                        {e.value}
                    </TabsTrigger>
                    )}
                    {isAdmin &&
                        <TabsTrigger
                            value="admin">
                            admin
                        </TabsTrigger>
                    }
                </TabsList>
                {tabOptions?.map(e => <TabsContent
                    key={e.value}
                    value={e.value}>
                    {e.component}
                </TabsContent>
                )}
                {isAdmin &&
                    <TabsContent
                        value='admin'>
                        <Admin groupID={groupID} />
                    </TabsContent>
                }
            </Tabs>


        </div>
    )
}

const MiniCard = ({ title = "my funds", coin = 0, icon = <BiRupee /> }) => {
    let errorStyle = ""
    return (
        <div className={`flex flex-col  rounded border p-4 text-base font-semibold transition-colors focus:outline-none border-solid bg-secondary text-secondary-foreground hover:bg-secondary/80 w-[100%] max-w-[15rem] ${errorStyle}`}>
            <p className='flex items-center justify-between capitalize'>{title} {icon}</p>
            <p>{coin}</p>
        </div>
    )
}
