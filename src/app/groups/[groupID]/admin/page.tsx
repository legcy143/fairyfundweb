"use client"
import React, { useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NotFound from '../NotFound'
import { MdAdminPanelSettings } from "react-icons/md";
import { useGroup } from '@/store/useGroup'
import { useParams } from 'next/navigation';
import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from 'next/navigation';
import AddItem from './AddItem';
import Products from '../Products';
import Requests from './Requests';
import ManageFunds from './ManageFunds';
import { useAuth } from '@/store/useAuth';


export default function page() {
  const { localFetchGroupByID, groupByID }:any = useGroup();
  const { userDetail }: any = useAuth()
  const router = useRouter()
  const param = useParams();
  useEffect(() => {
    localFetchGroupByID(param.groupID as string , userDetail?._id);
    return()=>{
      console.log("return from admin page")
    }
  }, [])
  
  useEffect(() => {
    console.log("group : ", groupByID , param)
  }, [groupByID])

  if(!groupByID?.isAdmin){
     return <p>unautherized acces</p>
  }

  const tabOptions = [
    {
      value: "products",
      component: <Products />
    },
    {
      value: "add products",
      component: <AddItem groupID={param.groupID} userId={userDetail?._id}/>
    },
    {
      value: "manage fund",
      component: <ManageFunds />
    },
    {
      value: "Request",
      component: <Requests />
    },
  ]
  return (
    <main className='h-full overflow-hidden'>
      <Tabs defaultValue={tabOptions[0].value} className='max-h-[100%]  overflow-auto'>
        <div className='flex items-center justify-between p-5 flex-wrap'>
          <div className='w-fit p-1 relative'>
            
            <h1 className='font-bold text-xl flex items-center '><IoMdArrowBack onClick={()=>router.back()} className='h-10 w-10 mr-5'/> <MdAdminPanelSettings size={30} /> Admin Pannel</h1>
            <p>view and manage your groups</p>
          </div>
          {/* <h1 className='p-1'>"group name</h1> */}
        </div>
        <TabsList className="w-[100%] overflow-auto h-fit justify-start sticky top-0 z-10 p-2">
          {tabOptions?.map(e => <TabsTrigger
            key={e.value}
            value={e.value}>
            {e.value}
          </TabsTrigger>
          )}
        </TabsList>
        {tabOptions?.map(e => <TabsContent
          key={e.value}
          value={e.value}>
          {e.component}
        </TabsContent>
        )}
      </Tabs>
    </main>
  )
}


const TestMe = ({ val = 2 }) => {
  return (
    <div>
      <p className='my-5 font-bold text-3xl'>hii {val} 1 </p>
      <p className='my-20 font-bold text-3xl'>hii {val}</p>
      <p className='my-20 font-bold text-3xl'>hii {val}</p>
      <p className='my-20 font-bold text-3xl'>hii {val}</p>
      <p className='my-20 font-bold text-3xl'>hii {val}</p>
      <p className='my-20 font-bold text-3xl'>hii {val}</p>
      <p className='my-20 font-bold text-3xl'>hii {val}</p>
      <p className='my-20 font-bold text-3xl'>hii {val}</p>
      <p className='my-20 font-bold text-3xl'>hii {val}</p>
      <p className='my-20 font-bold text-3xl'>hii {val}</p>
      <p className='my-5 font-bold text-3xl'>hii {val} 3</p>
    </div>
  )

}