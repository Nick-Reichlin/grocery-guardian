'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React from "react"

export const RegisterForm = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                body: JSON.stringify({
                    email, password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(res.ok) {
                // redirect
            }
        } catch (error) {
            console.error(error)
        }

        console.log('Register!')
    }

    return (
        <form onSubmit={onSubmit} className='space-y-12 w-[400px]'>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor='email'>Email</Label>
                <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id='email' 
                type="email" 
                placeholder="johnsmith@smth.com"/>
            </div>
            
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor='password'>Password</Label>
                <Input 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id='password'
                    type="password"
                />
            </div>
            <div className="w-full">
                <Button className='w-full bg-green-800 hover:bg-green-400' size="lg">Register</Button>
            </div>
        </form>
    )
}
