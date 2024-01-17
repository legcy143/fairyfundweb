import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Admin({ groupID = "" }: any) {

    const router:any = useRouter()

    const navigateArr = [
        { title: "Add Items", route: "/additem" },
        { title: "Add Members", route: "/additem" },
        { title: "Manage Fund", route: "/additem" },
    ]
    return (
        <div className='flex flex-wrap gap-5'>
            {navigateArr?.map((e: any) => <Button
                onClick={() => router.push(`${groupID}/${e.route}`)}
                key={e.title}>
                {e.title}
            </Button>
            )}
        </div>
    )
}
