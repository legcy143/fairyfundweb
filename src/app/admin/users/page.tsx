"use client"
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useAdminDashboard } from '@/store/admin/useAdminDashboard'
import { MdOutlinePublic as PublicIcon } from "react-icons/md";
import { IoLockClosedOutline as PrivateIcon} from "react-icons/io5";



export default function page() {
  const { allUsers , fethAllUsers, isAdminLoading } = useAdminDashboard();
  useEffect(() => {
    if(allUsers.length == 0)
        fethAllUsers()
  }, [])
  
  return (
    <div>
      <h1>users</h1>
      {isAdminLoading ? <>
      loading . . .
      </>
        : <>
          <Table>
            <TableCaption>A list of your users.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px]">sr.no</TableHead>
                <TableHead>private</TableHead>
                <TableHead>username</TableHead>
                <TableHead>name</TableHead>
                <TableHead>email</TableHead>
                <TableHead>phone</TableHead>
                <TableHead>gender</TableHead>
                <TableHead>myLocation</TableHead>
                <TableHead className='text-center'>lastVisit</TableHead>
                <TableHead className='text-center'>updatedAt</TableHead>
                <TableHead className="text-right">createdAt</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allUsers.map((e: any, i: any) => (
                <TableRow key={e._id}>
                  <TableCell className="font-medium text-center">{i + 1}</TableCell>
                 
                  <TableCell className='text-center'>{e?.private ? <PrivateIcon/> :<PublicIcon/>} </TableCell>
                  <TableCell className='text-center'>{e?.userName} </TableCell>
                  <TableCell className='text-center'>{e?.name} </TableCell>
                  <TableCell className='text-center'>{e?.email || "N/A"} </TableCell>
                  <TableCell className='text-center'>{e?.phone || "N/A"} </TableCell>
                  <TableCell className='text-center'>{e?.gender} </TableCell>
                  <TableCell className='text-center'>{e?.myLocation || "N/A"} </TableCell>
                  <TableCell className='text-center'>{new Date(e.lastVisit).toLocaleString()} </TableCell>
                  <TableCell className='text-center'>{new Date(e.updatedAt).toLocaleString()} </TableCell>
                  <TableCell className="text-center">{new Date(e.createdAt).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={10}>Total Users</TableCell>
                <TableCell className="text-right">{allUsers.length}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </>}

    </div>
  )
}
