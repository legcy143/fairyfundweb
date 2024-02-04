"use client"
import LabelWithInput from '@/components/local/LableWithInput'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { useGroup } from '@/store/useGroup'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function page() {
    
    const {createNewGroup , statusHandler , isGroupLoading}:any = useGroup();
    let router = useRouter();
    useEffect(() => {
     if(statusHandler){
        setgroupData({
            groupBio:"",
            groupName:"",
        })
        router.push("/")
     }
    }, [statusHandler])
    
    const [groupData, setgroupData] = useState({
        groupName: "",
        groupBio: "",
    })
    const handleOnChange = (key: string, value: string | boolean) => {
        setgroupData((e => ({ ...e, [key]: value })))
    }
    const handleCreateGroup = ()=>{
        console.log(groupData)
        if(groupData?.groupName.length > 3){
            createNewGroup(groupData);
        }
        else{
            toast.warn("Group name is too short")
        }
    }
    return (
        <Card className='w-[90%] max-w-[30rem] my-5 mx-auto p-5'>
            <CardTitle className='mb-1'>Create New Group</CardTitle>
            <CardDescription>fill these detail to crete your new group</CardDescription>
            <CardContent className="flex flex-col gap-4 my-5">
                <LabelWithInput
                    value={groupData.groupName}
                    label='group name'
                    onChangeText={(e) => handleOnChange('groupName', e)} />
                <LabelWithInput
                    value={groupData.groupBio}
                    label='group bio'
                    onChangeText={(e) => handleOnChange('groupBio', e)} />
                    <Button disabled={isGroupLoading} onClick={handleCreateGroup}>create</Button>
            </CardContent>
        </Card>
    )
}
