import React, { Children } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { PencilIcon } from 'lucide-react'

  
  export default function EditDialogeHandler(props:any) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
        <PencilIcon size={18} className='cursor-pointer'/>
        </AlertDialogTrigger>
        <AlertDialogContent onClick={e=>e.preventDefault()} >
          {props.children}
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  