"use client"
import { Button } from '@/components/ui/button'
import { useGroup } from '@/store/useGroup'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const { myGroups }: any = useGroup()
  return (
    <main className='p-5'>
      <h1 className='text-xl font-semibold capitalize my-3'>my groups</h1>
      {myGroups?.map((e: any) => {
        console.log(e)
        return (
          <>
            <Link href={`/groups/${e._id}`}>
              <Button variant={'outline'}>
                {e.groupName}
              </Button>
            </Link> <br />
          </>
        )
      })}
    </main>
  )
}
