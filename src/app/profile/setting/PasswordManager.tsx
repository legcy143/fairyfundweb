"use client"
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { KeyIcon, PencilIcon } from 'lucide-react'
import React, { useRef, useState } from 'react'
import EditDialogeHandler from './EditDialogeHandler'
import LabelWithInput from '@/components/local/LableWithInput'
import { Button } from '@/components/ui/button'
import { DialogDescription } from '@radix-ui/react-dialog'
import { AlertDialogAction, AlertDialogCancel, AlertDialogFooter, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { useAuth } from '@/store/useAuth'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

export default function PasswordManager() {
    let router = useRouter();
    return (
        <main className='flex flex-col gap-3'>
            <div>
                <CardTitle>Password Manager</CardTitle>
                <CardDescription>change or forget your password</CardDescription>
            </div>
            <Card className='p-3 flex gap-2 items-center'>
                <p className='flex font-medium items-center gap-1 flex-1'><KeyIcon size={16} /> Change password</p>
                <EditDialogeHandler>
                    <ChangePasswordModel />
                </EditDialogeHandler>
            </Card>
            <Card className='p-3 flex gap-2 items-center' onClick={()=>{
                router.push("/auth/forgetpassword")
            }}>
                <p className='flex font-medium items-center gap-1 flex-1 cursor-pointer'><KeyIcon size={16} /> forget password</p>
                {/* <EditDialogeHandler /> */}
            </Card>
        </main>
    )
}

const ChangePasswordModel = () => {
    const [OldPassword, setOldPassword] = useState('')
    const [NewPassword, setNewPassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')
    const { ChangePassword, isModelLoading }:any = useAuth()

    let closeModelRef: any = useRef(0);

    const HanleSubmit = async (e: any) => {
        e.preventDefault()
        if (OldPassword.length < 3 || OldPassword.length < 3) {
            toast.error("password length is to short")
            return 0;
        }
        if (ConfirmPassword !== NewPassword) {
            toast.error("new password and old password must be same")
            return 0;
        }
        let res = await ChangePassword(OldPassword, NewPassword)
        console.log(res)
        if (res == 1){
            setNewPassword("");
            setOldPassword("");
            setNewPassword("");
            closeModelRef.current.click();
        }
    }

    return (
        <section className='p-2'>
            <AlertDialogTitle className='mb-5'>Change password</AlertDialogTitle>
            <div className='flex flex-col gap-3'>
                <LabelWithInput label={"Old Password"}
                    value={OldPassword}
                    onChangeText={(e) => { setOldPassword(e) }} />
                <LabelWithInput label={"New Password"}
                    value={NewPassword}
                    onChangeText={(e) => { setNewPassword(e) }} />
                <LabelWithInput label={"confirm password"}
                    value={ConfirmPassword}
                    onChangeText={(e) => { setConfirmPassword(e) }} />
                <AlertDialogFooter className='bg-red-200/0'>
                    <AlertDialogCancel className='flex-1' >Cancel</AlertDialogCancel>
                    <AlertDialogCancel className='hidden' ref={closeModelRef} />
                    <AlertDialogAction className='flex-1' disabled={isModelLoading} onClick={HanleSubmit}>
                        Update
                    </AlertDialogAction>
                </AlertDialogFooter>
            </div>
        </section>
    )
}