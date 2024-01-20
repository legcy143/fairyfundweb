"use client"
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function LabelWithInput({
    maxLength = 200,
    label = "",
    placeholder = "",
    value = "",
    onChangeText = (e: string) => { }
}) {
    const [Val, setVal] = useState(value)
    return (
        <div className="flex flex-col gap-2">
            <Label htmlFor="id1" className="text-left capitalize">{label}</Label>
            <Input
                id="id1"
                placeholder={placeholder || label}
                value={Val}
                onChange={(e) => { onChangeText(e.target.value); setVal(e.target.value); }} className="col-span-3"
                autoComplete={'off'}
                maxLength={maxLength}
            />
        </div>
    )
}