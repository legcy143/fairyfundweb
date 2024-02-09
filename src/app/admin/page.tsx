"use client"
import LabelWithInput from '@/components/local/LableWithInput'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { useAdminAuth } from '@/store/admin/useAdminAuth'
import { useGroup } from '@/store/useGroup'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function page() {
  const {verify2f , isAuthLoading , isAdminLogged} = useAdminAuth()
  const [step, setstep] = useState(1)
  let router = useRouter();
  useEffect(() => {
    console.log(isAdminLogged)
    if (isAdminLogged) {
      setdata({
        email: "",
        password: "",
        otp:''
      })
      router.push("/admin/dashboard")
    }
  }, [isAdminLogged])

  const [data, setdata] = useState({
    email: "",
    password: "",
    otp:''
  })
  const handleOnChange = (key: string, value: string | boolean) => {
    setdata((e => ({ ...e, [key]: value })))
  }
  const handleEmailPassword = () => {
    console.log(data)
    setstep(2)
    if (data?.email.length > 7 && data?.email.endsWith("@gmail.com")) {
    }
    else {
      toast.warn("inValid email")
    }
  }
  const handle2f = () => {
    console.log(data)
    if (data?.otp?.length == 6) {
      verify2f(data)
    }
  }
  return (
    <Card className='w-[90%] max-w-[30rem] my-5 mx-auto p-5'>
      {step == 1 ?
        <>
          <CardTitle className='mb-1'>Login</CardTitle>
          <CardDescription>Enter your login credential to acces data</CardDescription>
          <CardContent className="flex flex-col gap-4 my-5">
            <LabelWithInput
              value={data.email}
              label='email'
              onChangeText={(e) => handleOnChange('email', e)} />
            <LabelWithInput
              value={data.password}
              label='password'
              onChangeText={(e) => handleOnChange('password', e)} />
            <Button disabled={isAuthLoading} onClick={handleEmailPassword}>continue</Button>
          </CardContent>
        </>
        :
        <>
          <CardTitle className='mb-1'>Enter otp</CardTitle>
          <CardDescription>otp send to you email { }</CardDescription>
          <CardContent className="flex flex-col gap-4 my-5">
            <LabelWithInput
              maxLength={6}
              type='number'
              value={data.otp}
              label='otp'
              placeholder='000000'
              onChangeText={(e) => handleOnChange('otp', e)} />
            <Button disabled={isAuthLoading} onClick={handle2f}>Verify</Button>
          </CardContent></>
      }
    </Card>
  )
}
