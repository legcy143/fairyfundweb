"use client"
import React, { useEffect, useState } from 'react'
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
import axios from 'axios'
import { useGroup } from '@/store/useGroup'

export default function SendJoinRequest() {
    const [url, seturl] = useState('');
    const pendingTasks: any = [];
    const [isDone, setisDone] = useState(false)
    const {SendInviteRequest ,isGroupLoading} = useGroup();

    async function handleSubmit(e: any) {
        if (isDone) {
            return;
        }
        e.preventDefault();
        const urlT = new URL(url).searchParams;
        let key = urlT?.get('key');
        let iv = urlT?.get('iv');
        await SendInviteRequest(key , iv)
        setisDone(true)
        e.target.click()
    }

    return (
        <main>
            <DialogHeader>
                <DialogTitle>Send Request</DialogTitle>
                <DialogDescription className='capitalize'>
                    Paste invite url to send join request
                </DialogDescription>
            </DialogHeader>
            <div className='my-5'>
                <LabelWithInput
                    maxLength={400}
                    placeholder={"https://group?invite...."}
                    value={url}
                    onChangeText={(e) => seturl(e)} />
            </div>
            {/*content goes here  */}
            <DialogFooter>
                <DialogTrigger>
                    <Button disabled={isGroupLoading} type="submit" onClick={handleSubmit}>Send join request</Button>
                </DialogTrigger>
            </DialogFooter>
        </main>
    )
}
