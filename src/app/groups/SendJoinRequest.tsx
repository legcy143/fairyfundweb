"use client"
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import LabelWithInput from '@/components/local/LableWithInput'

export default function SendJoinRequest() {
    return (
        <main>
            <DialogHeader>
                <DialogTitle>Send Request</DialogTitle>
                <DialogDescription className='capitalize'>
                    Paste invite url to send join request
                </DialogDescription>
            </DialogHeader>
            <div className='my-5'>
                <LabelWithInput placeholder={"https://group?invite...."}/>
            </div>
            {/*content goes here  */}
            <DialogFooter>
                <DialogTrigger>
                    <Button type="submit">Send join request</Button>
                </DialogTrigger>
            </DialogFooter>
        </main>
    )
}
