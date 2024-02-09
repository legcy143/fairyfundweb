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
import { Input } from '@/components/ui/input'
import { SearchIcon } from '@/components/icons/LegcyIcon'
import { useAdminDashboard } from '@/store/admin/useAdminDashboard'


export default function page() {
  const { allGroups, fethAllGroups, isAdminLoading } = useAdminDashboard();
  useEffect(() => {
    if (allGroups.length == 0)
        fethAllGroups()
  }, [])

  return (
    <div>
      <h1>groups</h1>
      <div className="relative items-center m-2">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
        <Input
          className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
          placeholder="Search products..."
          type="search"
        /></div>

      {isAdminLoading ? <>
        loading . . .
      </>
        : <>
          <Table>
            <TableCaption>A list of your Groups .</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px]">sr.no</TableHead>
                <TableHead>group name</TableHead>
                <TableHead>createdBy</TableHead>
                {/* <TableHead>groupOwner</TableHead> */}
                <TableHead className="text-center">funds</TableHead>
                <TableHead className="text-center">users</TableHead>
                <TableHead className="text-center">request</TableHead>
                <TableHead className="text-center">items</TableHead>
                <TableHead className="text-center">inviteKeys</TableHead>
                <TableHead className="text-center">updatedAt</TableHead>
                <TableHead className="text-center">createdAt</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allGroups?.map((e: any, i: any) => {
                console.log(e);
                return(
                  <TableRow key={e._id}>
                  <TableCell className="font-medium text-center">{i + 1}</TableCell>
                  <TableCell>{e?.groupName?.slice(0,20)}{e?.groupName?.length>20 &&"..."}</TableCell>
                  <TableCell>{e.createdBy?.userName.slice(0,10)}</TableCell>
                  <TableCell className='text-center'>{e.funds}</TableCell>
                  <TableCell className='text-center'>{e.users.length}</TableCell>
                  <TableCell className='text-center'>{e.request.length}</TableCell>
                  <TableCell className='text-center'>{e.items.length}</TableCell>
                  <TableCell className='text-center'>{e.inviteKeys.length}</TableCell>
                  <TableCell className='text-center'>{new Date(e.updatedAt).toLocaleString()} </TableCell>
                  <TableCell className="text-center">{new Date(e.createdAt).toLocaleString()}</TableCell>
                </TableRow>
              )})}
              </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={9}>Total Groups</TableCell>
                <TableCell className="text-right">{allGroups.length}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </>}
    </div>
  )
}
