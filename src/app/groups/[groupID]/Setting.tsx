"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import React from 'react'
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
                            <CommonModel title="leave this group" />
                        </DialogContent>
                    </Dialog>
                    {isAdmin &&
                        <Dialog>
                            <DialogTrigger>
                                <Button variant={'destructive'} className='gap-2'><MdDeleteOutline /> Delete Group</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <CommonModel title="delete this group" />
                            </DialogContent>
                        </Dialog>
                    }
                </CardContent>
            </Card>
        </main>
    )
}

const CommonModel = ({ title }: any) => {
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
                    <Button>yes, {title?.slice(0,6)}</Button>
                </DialogTrigger>
            </div>
        </>
    )
}
const DeleteGroupButton = () => { }
const LeaveGroupButton = () => { }