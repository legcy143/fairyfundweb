"use client"
import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


export default function Products({ items = [] }: any) {
    return (
        <main className='md:p-5'>
            <h1>products</h1>
            {items?.map((e: any) => <SingleAccordion key={e._id}
                date={new Date(e?.date).toLocaleString()}
                addedBy={e.addedBy}
                broughtBy={e.broughtBy}
                title={e.title}
                totalPrice={e.totalPrice}
            />)}
        </main>
    )
}


const SingleAccordion = ({ addedBy, broughtBy, date, includedMembers, product, title, totalPrice }: any) => {
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger >
                    {/* accoridan header content goes here */}
                    <div className='w-[100%] '>
                        <p className='w-fit py-1 opacity-80 font-normal text-sm'>{date}</p>
                        <div className='flex gap-1 w-[98%]'>
                            <MiniCard title='added by' name={addedBy} />
                            <MiniCard title='brought by' name={broughtBy} />
                        </div>
                        <div className='flex items-center justify-between gap-2 p-1'>
                            <p className='truncate w-full text-wrap line-clamp-1 text-start flex-1'>
                                {title}
                            </p>
                            <p>{totalPrice}</p>
                        </div>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    {/* body content goes here */}
                    hii
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

const MiniCard = ({ title = "my funds", name = "prince" }) => {
    return (
        <div className='flex flex-col  rounded border p-2 text-base font-medium transition-colors focus:outline-none border-solid bg-secondary text-secondary-foreground hover:bg-secondary/80 w-[100%] max-w-[15rem] '>
            <p className='flex items-center justify-between capitalize'>{title}</p>
            <p className=' w-fit'>{name}</p>
        </div>
    )
}

