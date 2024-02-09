"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { CiWarning } from "react-icons/ci";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useGroup } from '@/store/useGroup';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';



export default function Setting({ groupID, userID, isAdmin = false }: any) {
    return (
        <main className='max-w-[50rem] m-auto'>
            {/* danger activities */}
            <Card className='border-none'>
                <CardContent className='flex flex-col items-start gap-2 p-3'>
                    <CardTitle className='flex items-center gap-3'> <CiWarning color='red' /> Danger</CardTitle>
                    <CardDescription className='mb-5'>Be Caution these action are ireversible</CardDescription>
                    <Dialog>
                        <DialogTrigger>
                            <Button variant={'destructive'}>Leave group</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <CommonModel groupID={groupID} title="leave this group" action="leave"/>
                        </DialogContent>
                    </Dialog>
                    {isAdmin &&
                        <Dialog>
                            <DialogTrigger>
                                <Button variant={'destructive'} className='gap-2'><MdDeleteOutline /> Delete Group</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <CommonModel groupID={groupID} title="delete this group" action="delete"/>
                            </DialogContent>
                        </Dialog>
                    }
                </CardContent>
            </Card>
        </main>
    )
}

const CommonModel = ({ title , groupID , action }: any) => {
    const { LeaveGroup, deleteGroup ,statusHandler,isGroupLoading}: any = useGroup();
    const HandleRemove = async(e:any)=>{
        e.preventDefault();
        switch (action) {
            case 'leave':
                await LeaveGroup(groupID)
                break;
            case 'delete':
                await deleteGroup(groupID)
                break;
        }
    }


    return (
        <>
            <DialogHeader>
                <DialogTitle className='capitalize flex items-center gap-2 mb-1'>
                    <CiWarning color='red' />
                    {title}
                </DialogTitle>
                <DialogDescription>This process is irrversible are you sure you want to {title}</DialogDescription>
            </DialogHeader>
            <div className='flex items-center ml-auto gap-3'>
                <DialogTrigger>
                    <Button>No , keep</Button>
                </DialogTrigger>
                <DialogTrigger>
                    <Button
                    disabled={isGroupLoading}
                        onClick={HandleRemove}
                        variant={'destructive'}>yes, {title?.slice(0, 6)}</Button>
                </DialogTrigger>
            </div>
        </>
    )
}