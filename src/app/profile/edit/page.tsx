"use client"
import LabelWithInput from '@/components/local/LableWithInput'
import { Button } from '@/components/ui/button'
import { CardDescription, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroupItem } from '@/components/ui/radio-group'
import { useAuth } from '@/store/useAuth'
import { RadioGroup } from '@radix-ui/react-radio-group'
import React, { useState } from 'react'

export default function Edit() {
  const { userDetail, UpdateProfile }: any = useAuth()
  type UserData = {
    name: string;
    userName: string;
    bio: string;
    myLocation: string;
    isPrivate: boolean,
    gender: "male" | "female" | "other";
  };
  const [userData, setuserData] = useState<UserData>({
    name: userDetail?.name,
    userName: userDetail?.userName,
    bio: userDetail?.bio,
    myLocation:userDetail?.myLocation,
    gender: userDetail?.gender,
    isPrivate: userDetail?.isPrivate,
  })
  const handleOnChange = (key: string, value: string | boolean) => {
    setuserData((e => ({ ...e, [key]: value })))
  }
  return (
    <main className='p-5 max-w-[30rem]'>
      <CardTitle>Edit Profile</CardTitle>
      <CardDescription>View and manage your profile information.</CardDescription>
      <div className="flex flex-col gap-4 my-5">
        <LabelWithInput value={userData.name}
          label='name' onChangeText={(e) => handleOnChange('name', e)} />
        <LabelWithInput
          value={userData.userName}
          label='username'
          onChangeText={(e) => handleOnChange('userName', e)} />
        <LabelWithInput
          value={userData.bio}
          label='bio'
          onChangeText={(e) => handleOnChange('bio', e)} />
        <LabelWithInput
          value={userData.myLocation}
          label='my Location'
          placeholder='e.g delhi ncr ...etc'
          onChangeText={(e) => handleOnChange('myLocation', e)} />
        {/* radio options */}
        <RadioGroup defaultValue={userData.gender || "other"} className=' flex flex-col gap-2' onValueChange={(e) => { handleOnChange('gender', e) }}>
          <Label className="text-left capitalize mb-1">Gender</Label>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="female" id="r1" />
            <Label htmlFor="r1">female</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="male" id="r2" />
            <Label htmlFor="r2">male</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="other" id="r2" />
            <Label htmlFor="r2">other</Label>
          </div>
        </RadioGroup>
        <div className='flex items-center gap-2'>
          <Checkbox id="terms" checked={userData.isPrivate}
            onCheckedChange={(e) => { handleOnChange('isPrivate', e) }} />
          <CardDescription>Private Account</CardDescription>
        </div>
      </div>
      <Button onClick={() => UpdateProfile(userData)}>Update Profile</Button>
    </main>
  )
}

