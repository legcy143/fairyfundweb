import React from 'react'
import { cn } from "@/lib/utils"

export default function ModelSpinner({className}:any) {
    return (
        <div
        // className={cn("border-b", className)}
            className={cn("flex flex-col items-center justify-center fixed top-0 right-0 w-[100vw] h-[100vh] backdrop-blur-sm z-50",className)}>
            <span className="spinner-border h-16 w-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin" />
        </div>
    )
}