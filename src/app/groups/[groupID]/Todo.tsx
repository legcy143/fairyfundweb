import LabelWithInput from '@/components/local/LableWithInput'
import { Button } from '@/components/ui/button'
import { CardDescription, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { useGroup } from '@/store/useGroup'
import TimeAgo from '@/utils/TimeAgo'
import { DeleteIcon, Trash, Trash2 } from 'lucide-react'
import React, { useState } from 'react'

export default function Todo({ isAdmin = false, groupID = "", userID = "", todoList = [] }: any) {
    const { MarkAsDoneTodo, DeleteTodo } = useGroup()
    return (
        <main>
            {/* add task */}
            {isAdmin &&
                <AddTodoHandler groupID={groupID} userID={userID} />
            }
            {/* read task */}
            {todoList.length == 0 ? <p className='m-auto text-center'>No Todo Found</p> :
                <>
                    <section>
                        {todoList?.map((e: any) => {
                            if (!e?.isDone)
                                return (
                                    <div className='bg-secondary p-3 rounded m-2' key={e?._id}>
                                        <div className='flex items-center justify-between'>
                                            <p className='text-sm font-medium'>Added by {e?.createdBy?.userName || "N/A"}</p>
                                            <p className='text-xs opacity-50'>{TimeAgo(new Date(e?.createdAt))}</p>
                                        </div>
                                        <div className='flex items-center gap-3'>
                                            {
                                                !e?.isDone && isAdmin &&
                                                <Checkbox defaultChecked={e?.isDone} onCheckedChange={(i) => { i && MarkAsDoneTodo(groupID, userID, e._id) }} />
                                            }
                                            <p className={`text-sm my-1 flex-1 ${e?.isDone && "line-through"}`}>{e?.todo}</p>
                                           
                                        </div>
                                    </div>
                                )
                        })}

                        {/* done task */}
                        {todoList?.map((e: any) => {
                            if (e?.isDone)
                                return (
                                    <div className='bg-secondary p-3 rounded m-2' key={e?._id}>
                                        <div className='flex items-center justify-between'>
                                            <p className='text-sm font-medium'>Added by {e?.createdBy?.userName || "N/A"}</p>
                                            <p className='text-xs opacity-50'>{TimeAgo(new Date(e?.createdAt))}</p>
                                        </div>
                                        <div className='flex items-center gap-3'>
                                            {/* {
                                                !e?.isDone && isAdmin &&
                                                <Checkbox defaultChecked={e?.isDone} onCheckedChange={(i) => { i && MarkAsDoneTodo(groupID, userID, e._id) }} />
                                            } */}
                                            <p className={`text-sm my-1 flex-1 ${e?.isDone && "line-through"}`}>{e?.todo}</p>
                                            {
                                                e?.isDone && isAdmin &&
                                                <Trash2 onClick={() => { DeleteTodo(groupID, userID, e._id) }} size={17} className='text-red-500 ml-auto' />
                                            }
                                        </div>
                                    </div>
                                )
                        })}
                    </section>
                </>
            }

        </main>
    )
}


const AddTodoHandler = ({ groupID = "", userID = "" }) => {
    const { AddTodo }: any = useGroup()
    const [todo, settodo] = useState('')
    return (
        <section className='flex flex-col gap-5 p-1 py-5'>
            <p>
                <CardTitle className='mb-1'>Add Todo</CardTitle>
                <CardDescription>Add task or undone things for todo</CardDescription>
            </p>
            <LabelWithInput label={"todo"}
                value={todo}
                onChangeText={(e) => { settodo(e) }} />
            <Button className='ml-auto' onClick={() => { AddTodo(groupID, userID, todo) }}>Add Task</Button>
        </section>
    )
}
