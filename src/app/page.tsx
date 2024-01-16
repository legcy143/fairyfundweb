"use client"
import { Button } from '@/components/ui/button'
import { useGroup } from '@/store/useGroup'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const { myGroups }: any = useGroup()
  return (
    <main className='p-5'>
      {myGroups?.map((e: any) => {
        return (
          <>
            <Link href={`/groups/${e._id}`}>
              <Button>groups</Button>
            </Link> <br />
          </>
        )
      })}
      hello
    </main>
  )
}
