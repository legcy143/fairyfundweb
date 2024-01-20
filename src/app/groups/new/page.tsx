"use client"
import LabelWithInput from '@/components/local/LableWithInput'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { useGroup } from '@/store/useGroup'
import React, { useState } from 'react'

export default function page() {
    
    const {createNewGroup}:any = useGroup()
    
    const [groupData, setgroupData] = useState({
        groupName: "",
        groupBio: "",
    })
    const handleOnChange = (key: string, value: string | boolean) => {
        setgroupData((e => ({ ...e, [key]: value })))
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
                    <Button onClick={()=>{createNewGroup(groupData)}}>create</Button>
            </CardContent>
        </Card>
    )
}
