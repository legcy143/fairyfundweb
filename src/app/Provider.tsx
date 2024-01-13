"use client"

import  React, { useEffect } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function Provider({ children, ...props }: ThemeProviderProps) {
    useEffect(() => {
        console.log("from provider.tsx")
    }, [])
    
    return (
        <NextThemesProvider {...props}>
            {children}
        </NextThemesProvider>
    )
}