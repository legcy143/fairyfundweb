"use client"
import { useAuth } from '@/store/useAuth'
import React, { useEffect } from 'react'
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'

export default function Profile() {
  const { userDetail }: any = useAuth()
  return (
      <Card className="w-full max-w-lg m-auto">
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
          <CardDescription>View and manage your profile information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage alt="User Logo" src="/placeholder.svg?height=64&width=64" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="grid gap-0.5 text-xs">
              <div className="font-medium">{userDetail?.userName}</div>
              <div className="text-gray-500 dark:text-gray-400">6584163e303dbed93ef48a75</div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input disabled id="username" placeholder="Enter your username" value={userDetail?.userName} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Input disabled id="gender" placeholder="Enter your gender" value={userDetail?.gender}/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="credit-score">Credit Score</Label>
            <Input disabled id="credit-score" placeholder="Enter your credit score" value={userDetail?.credit}/>
          </div>
          <Button>Logout</Button>
        </CardContent>
      </Card>
  )
}

