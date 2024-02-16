"use client"
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { MailIcon, PencilIcon, PhoneIcon } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import EditDialogeHandler from './EditDialogeHandler'
import LabelWithInput from '@/components/local/LableWithInput'
import { Button } from '@/components/ui/button'
import { AlertDialogAction, AlertDialogCancel, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { useAuth } from '@/store/useAuth'
import ModelSpinner from '@/components/legcyUI/ModelSpinner'
import { toast } from 'react-toastify'

export default function PhoneAndEmail() {
    const { userDetail }: any = useAuth()
    return (
        <main className='flex flex-col gap-3'>
            <div>
                <CardTitle>Email & Phone</CardTitle>
                <CardDescription>your email and phone number is private not other user have acces to see your email and password without your permision</CardDescription>
            </div>
            <Card className='p-2 flex gap-2 items-center'>
                <div style={{ width: 'calc(100% - 2rem)' }}>
                    <p className='text-lg font-semibold flex items-center gap-1'><MailIcon size={18} /> Email</p>
                    <p className='truncate opacity-80 text-sm'>{userDetail?.email || "N/A"}</p>
                </div>
                <EditDialogeHandler>
                    <UpdateEmail />
                </EditDialogeHandler>
            </Card>
            <Card className='p-2 flex gap-2 items-center'>
                <div style={{ width: 'calc(100% - 2rem)' }}>
                    <p className='text-lg font-semibold flex items-center gap-1'><PhoneIcon size={18} /> Phone</p>
                    <p className='truncate opacity-80 text-sm'>{userDetail?.phoneNumber || "N/A"}</p>
                </div>
                <EditDialogeHandler>
                    <p>comming soon</p>
                    <AlertDialogCancel>close</AlertDialogCancel>
                </EditDialogeHandler>
            </Card>
        </main>
    )
}


const UpdateEmail = () => {
    const [otpGeneratorDetail, setotpGeneratorDetail] = useState<any>({
        location: {
            latitude: null, longitude: null
        },
        device: {
            platform: null,
            isMobile: null
        }
    })
    useEffect(() => {
        if ("geolocation" in navigator) {
            // console.log(navigator)
            navigator.geolocation.getCurrentPosition(function (position) {
                setotpGeneratorDetail((e: any) => ({
                    ...e,
                    location: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    }
                }));
                setotpGeneratorDetail((e: any) => ({
                    ...e,
                    device: {
                        platform: navigator.platform,
                        isMobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
                    },
                }))
            });
        } else {
            // console.log("Geolocation is not available in your browser.");
        }
    }, []);
    // use auth
    const { GetOtp, isModelLoading, OtpRes }: any = useAuth()

    const [email, setemail] = useState('')
    const [PageState, setPageState] = useState(1)

    useEffect(() => {
        if (OtpRes == true) {
            setPageState(2)
        }
    }, [OtpRes])


    const HanleGetOtp = async (e: any) => {
        e.preventDefault()
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            toast("invalild email")
            return;
        }
        await GetOtp(email, otpGeneratorDetail);
        if (OtpRes == true) {
            setPageState(2)
        }
    }

    return (
        <section className='p-2'>
            {isModelLoading && <ModelSpinner className="h-full w-full" />}
            {
                PageState == 1 ?
                    <>
                        <AlertDialogTitle className=' mb-5 text-lg font-semibold flex items-center gap-1'><MailIcon size={18} />Update Email</AlertDialogTitle>
                        <div className='flex flex-col gap-3'>
                            <LabelWithInput label={"email"}
                                placeholder='email@gmail.com'
                                value={email}
                                onChangeText={(e) => { setemail(e) }} />
                            <AlertDialogFooter>
                                <AlertDialogCancel className='flex-1' >Cancel</AlertDialogCancel>
                                <AlertDialogAction disabled={isModelLoading} className='flex-1' onClick={HanleGetOtp}>get Otp</AlertDialogAction>
                            </AlertDialogFooter>
                        </div>
                    </>
                    : <UpdateEmailWithValidateOtp
                        otpGeneratorDetail={otpGeneratorDetail}
                        setPageState={setPageState}
                        email={email} />
            }

        </section>
    )
}
const UpdateEmailWithValidateOtp = ({ setPageState, email, otpGeneratorDetail }: any) => {
    const { UpdateEmail, GetOtp } = useAuth();
    let closeModelRef:any = useRef(0);
    useEffect(() => {
        if (!email) {
            setPageState(1)
        }
    }, [])

    const [otp, setotp] = useState('')
    const HandleUpdateEmail = async (e: any) => {
        e.preventDefault()
        if (otp.length < 4) {
            toast.error("otp length is to short")
            return 0
        }
        let res = await UpdateEmail(email, parseInt(otp))
        if(res ==1){
            closeModelRef?.current?.click();
        }
    }
    return (
        <div className='flex flex-col gap-5'>
            <div>
                <AlertDialogTitle className='text-lg font-semibold flex items-center gap-1'><MailIcon size={18} />Otp</AlertDialogTitle>
                <AlertDialogDescription>Otp Send To {email}</AlertDialogDescription>
            </div>
            <div className='flex flex-col gap-3'>
                <LabelWithInput label={"otp"}
                    placeholder='0 0 0 0 0 0'
                    value={otp}
                    type='number'
                    onChangeText={(e) => { setotp(e) }} />
                <div className='flex justify-between items-center'>
                    <Button variant={'link'} onClick={() => GetOtp(email, "")}>Resend Otp</Button>
                    <span></span>
                </div>
            </div>
            <AlertDialogFooter>
                <AlertDialogCancel
                    onClick={(e: any) => {
                        e.preventDefault()
                        setPageState(1)
                    }
                    }
                    className='flex-1' >Previous</AlertDialogCancel>
                    <AlertDialogCancel ref={closeModelRef}/>
                <AlertDialogAction className='flex-1' onClick={HandleUpdateEmail}>Update</AlertDialogAction>
            </AlertDialogFooter>
        </div>
    )
}