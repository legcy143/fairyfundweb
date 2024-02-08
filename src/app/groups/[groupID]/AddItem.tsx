"use client"
import LabelWithInput from '@/components/local/LableWithInput'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { useGroup } from '@/store/useGroup'
import React, { useState } from 'react'
import { IoIosAddCircleOutline } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import { toast } from 'react-toastify'


export default function AddItem({ groupID, userID }: any) {
  const { addNewItem , isGroupLoading }: any = useGroup()
  type AddItemDataTypes = {
    title: string;
    message: string;
    broughtBy: string;
    item: {
      name: string,
      quantity: string,
      price: number,
    }[];
  };
  const [itemData, setitemData] = useState<AddItemDataTypes>({
    title: "",
    message: "",
    broughtBy: "",
    item: [
      { name: "", quantity: "", price: 0 }
    ]
  })
  const AddItemBlock = () => {
    setitemData(e => ({ ...e, item: [...e.item, { name: "", quantity: "", price: 0 }] }))
  }
  
  const removeItemBlock = (index: number | string) => {
    setitemData((e) => {
      return { ...e, item: e.item.filter((e, i) => i !== index) }
  })
}
const handleAddItem = (key: string, index: number, value: string | number) => {
  let changeItem = itemData.item.map((e: any, i: any) => {
    if (i === index) {
      e = { ...e, [key]: value }
    }
    return e;
  })
  setitemData((e: any) => ({ ...e, item: [...changeItem] }))
}

const handleOnChange = (key: string, value: string | boolean) => {
  setitemData((e => ({ ...e, [key]: value })))
}

const handleSubmit = async()=>{
  if(!itemData?.title.length){
    toast.error("Fields are required");
    return
  }
  await addNewItem({ ...itemData, groupID }, userID);
  setitemData({
    title: "",
    message: "",
    broughtBy: "",
    item: [
      { name: "", quantity: "", price: 0 }
    ]
  })
}

return (
  <main className='p-5 max-w-[30rem] m-auto'>
    <CardTitle>Add items</CardTitle>
    <CardDescription>click on add when you are done</CardDescription>
    <section className="flex flex-col gap-4 my-5">
      <LabelWithInput value={itemData.title}
        label='title' onChangeText={(e) => handleOnChange('title', e)} />
      <LabelWithInput
        value={itemData.message}
        label='message'
        onChangeText={(e) => handleOnChange('message', e)} />
      <LabelWithInput
        value={itemData.broughtBy}
        label='brought By'
        onChangeText={(e) => handleOnChange('broughtBy', e)} />
      <div>
        <div className='flex items-center justify-between'>
          <p>Items<CardDescription>Add minimum one item </CardDescription> </p>
          <IoIosAddCircleOutline className='h-6 w-6' onClick={AddItemBlock} />
        </div>
        <div className='flex flex-col gap-4 p-4'>
    {/* <CardDescription>Add minimum one item </CardDescription> */}
          {itemData?.item?.map((e, i) => {
            return (
              <div className='flex gap-2 items-center justify-end' key={i}>
                <LabelWithInput
                  value={e.name}
                  label={`item #${i + 1}`}
                  placeholder='name'
                  onChangeText={(text) => handleAddItem('name', i, text)} />
                <LabelWithInput
                  value={e.quantity}
                  label='Quntity'
                  onChangeText={(text) => handleAddItem('quantity', i, text)} />
                <LabelWithInput
                  value={e.price}
                  label='price'
                  type='number'
                  onChangeText={(text) => handleAddItem('price', i, +text)} />
                <RxCrossCircled className='h-10 w-10' onClick={() => removeItemBlock(i)} />
              </div>
            )
          })}
        </div>
      </div>
    </section>
    {/* <Button onClick={() => console.log({ ...itemData, groupID }, userID)}>Add item</Button> */}
    <Button disabled={isGroupLoading} onClick={handleSubmit}>Add item</Button> 
  </main>
)
}

