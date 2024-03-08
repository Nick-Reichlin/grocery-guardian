'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React from "react"

export const RegisterForm = () => {
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Register!')
    }

    return (
        <form className='space-y-12 w-[400px]'>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor='email'>Email</Label>
                <Input id= 'email' type="email" placeholder="johnsmith@smth.com"/>
            </div>
            
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor='password'>Password</Label>
                <Input id= 'password' type="password"/>
            </div>
            <div className="w-full">
                <Button className='w-full bg-green-800 hover:bg-green-400' size="lg">Register</Button>
            </div>
        </form>
    )
}
