"use client"
import LabelWithInput from '@/components/local/LableWithInput'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroupItem } from '@/components/ui/radio-group'
import { useGroup } from '@/store/useGroup'
import { RadioGroup } from '@radix-ui/react-radio-group'
import React, { useState } from 'react'
import { IoIosAddCircleOutline } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";


export default function AddItem() {
  const { }: any = useGroup()
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
  const AddItemBlock = ()=>{
    setitemData(e=>({...e , item:[...e.item,{name:"" ,quantity:"",price:0}]}))
  }
  const removeItemBlock = (index:number|string)=>{
    let arr:{name:string,quantity:string,price:number}[] = itemData.item.filter((e:any,i)=>{return e = i != index})
    console.log(arr , index)
    setitemData(e=>({...e , item:[...arr]}))
  }
  const handleOnChange = (key: string, value: string | boolean) => {
    setitemData((e => ({ ...e, [key]: value })))
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
          <h1 className='flex items-center justify-between'>
            Items
            <IoIosAddCircleOutline className='h-6 w-6' onClick={AddItemBlock}/>
            </h1>
          <div className='flex flex-col gap-4 p-4'>
            {itemData?.item?.map((e, i) => {
              return (
                <div className='flex gap-2 items-center justify-center' key={i}>
                  <LabelWithInput
                    value={e.name}
                    label={`item ${i+1}`}
                    onChangeText={(e) => handleOnChange(`e.name`, e)} />
                  <LabelWithInput
                    value={e.quantity}
                    label='Quntity'
                    onChangeText={(e) => handleOnChange('broughtBy', e)} />
                  <LabelWithInput
                    value={e.price}
                    label='price'
                    type='number'
                    onChangeText={(e) => handleOnChange('broughtBy', e)} />
                    <RxCrossCircled className='h-10 w-10' onClick={()=>removeItemBlock(i)}/>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      <Button onClick={() => console.log(itemData)}>Update Profile</Button>
    </main>
  )
}

