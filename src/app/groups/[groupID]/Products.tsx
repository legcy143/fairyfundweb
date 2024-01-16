"use client"
import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

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


export default function Products({ itemsDetail = [] }: any) {
    return (
        <main className='md:p-5'>
            <h1>products</h1>
            {itemsDetail?.map((e: any) => <SingleAccordion key={e._id}
                date={new Date(e?.date).toLocaleString()}
                addedBy={e.addedBy}
                broughtBy={e.broughtBy}
                title={e.title}
                totalPrice={e.totalPrice}
                item={e.item}
                message={e?.message}
            />)}
        </main>
    )
}


const SingleAccordion = ({ addedBy, broughtBy, date, includedMembers, item = [], title, totalPrice, message }: any) => {
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
                    <Table>
                        <TableCaption>{message}</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[0.5rem]">s.no</TableHead>
                                <TableHead>Item</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Quantity</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {item.map((e: any, i: any) => (
                                <TableRow key={i}>
                                    <TableCell className="font-medium">{i + 1}</TableCell>
                                    <TableCell>{e.name}</TableCell>
                                    <TableCell>{e.quantity}</TableCell>
                                    <TableCell className="text-right ">{e.price}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={3}>Total</TableCell>
                                <TableCell className="text-right">${totalPrice}</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
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

