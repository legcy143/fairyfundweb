import React from 'react'

export default function ModelSpinner() {
    return (
        <div
            className="flex flex-col items-center justify-center fixed top-0 right-0 w-[100vw] h-[100vh] backdrop-blur-sm z-50">
            <span className="spinner-border h-16 w-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin" />
        </div>
    )
}
