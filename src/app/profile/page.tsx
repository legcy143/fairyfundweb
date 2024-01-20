"use client"
import { useAuth } from '@/store/useAuth'
import React, { useEffect } from 'react'
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { MdLock } from "react-icons/md";

export default function Profile() {
  const { userDetail, logout }: any = useAuth()
  return (
    <main>
      {/* header */}
      <CardHeader>
        <div className=' flex gap-5 items-center'>
          <Avatar className="h-14 w-14">
            <AvatarImage alt="User Logo" src="/placeholder.svg?height=64&width=64" />
            <AvatarFallback>{userDetail?.name[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className='flex flex-col gap-1 capitalize'>
            <CardTitle className='flex items-center gap-2'>{userDetail?.name ?? "Not Available"} {userDetail?.isPrivate && <MdLock className='opacity-70 p-1'/>}</CardTitle>
            <CardDescription>@{userDetail?.userName}</CardDescription>
          </div>
        </div>
        <CardDescription>{userDetail?.bio || 'bio not available'}</CardDescription>
      </CardHeader>
      {/*  */}
      <CardContent>
        <div className="space-y-3 mt-[-1rem] mb-[1rem]">
          <LabelDiv value="phone number" />
          <ValueDiv value={userDetail?.phoneNumber || "not available"} />
          <LabelDiv value="email" />
          <ValueDiv value={userDetail?.email || "not available"} />
          <LabelDiv value="location" />
          <ValueDiv value={userDetail?.myLocation || "not available"} />
          {/* <Input disabled id="gender" placeholder="Enter your gender" value={userDetail?.gender} /> */}

          <RadioGroup defaultValue={userDetail?.gender}>
            <LabelDiv value="Gender" />
            <div className="flex items-center space-x-2">
              <RadioGroupItem className='disabled:cursor-default disabled:opacity-100' value="female" disabled id="r1" />
              <Label htmlFor="r1">female</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem className='disabled:cursor-default disabled:opacity-100' disabled value="male" id="r2" />
              <Label htmlFor="r2">male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem disabled className='disabled:cursor-default disabled:opacity-100' value="other" id="r2" />
              <Label htmlFor="r2">other</Label>
            </div>
          </RadioGroup>
        </div>
        <Button onClick={() => logout()}>Logout</Button>
      </CardContent>
    </main>
  )
}


const LabelDiv = ({ value }: any) => {
  return (
    <p className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize max-w-[30rem] mt-5 mb-2'>{value}</p>
  )
}
const ValueDiv = ({ value }: any) => {
  return (
    <p className='flex w-full rounded-md border border-input bg-background p-3 text-sm ring-offset-background disabled:opacity-50 max-w-[30rem] min-h-[2.5rem] items-center'>{value}</p>
  )
}