"use client"
import { Button } from '@/components/ui/button'
import { CardDescription, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@/store/useAuth'
import { Star } from 'lucide-react'
import React, { useState } from 'react'

export default function page() {
  const {RateUs , userDetail}:any = useAuth();
  let RatingArray = [1,2,3,4,5];
  const [ratingDetail, setratingDetail] = useState<any>({star:userDetail?.rating?.star ?? 1 , message:userDetail?.rating?.message})
  return (
    <main className='p-5 max-w-[30rem]'>
      {/* current rating contianer */}
      <CardTitle>Rate us</CardTitle>
      <CardDescription>your rating and feedback is very important for us , we value you rating , so don't forget to rate us and send message </CardDescription>
      <section className='my-5 flex flex-col gap-3'>
        <div className='flex items-center gap-1'>
          {RatingArray?.map((e:number)=>{
            return <Star fill={e<= ratingDetail?.star ? "green":"transparent"} key={e} className={`cursor-pointer ${e<= ratingDetail?.star && "text-green-600"}`} onClick={()=>{
              console.log(e)
              setratingDetail((i:any)=>({...i , star:e}))
            }}/>
          })}
          <p className='ml-2'>{ratingDetail.star}</p>
        </div>
        <Textarea
          placeholder="leave a message"
          className="resize-none"
          value={ratingDetail?.message}
          onChange={(t)=>{
            setratingDetail((e:any)=>({...e , message:t?.target?.value}))
          }}
        />
        <Button className='ml-auto' onClick={()=>{
          // console.log(ratingDetail)
          RateUs(ratingDetail?.star , ratingDetail?.message)
        }}>Post</Button>
      </section>
    </main>
  )
}
