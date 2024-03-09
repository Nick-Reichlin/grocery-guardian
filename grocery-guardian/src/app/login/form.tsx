'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert } from "@/components/ui/alert"
import React from "react"
import { signIn } from "next-auth/react"

export const LoginForm = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [error, setError] = React.useState<string | null>(null)

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        signIn('credentials',{
            email,
            password,
            callbackUrl:'/'
        })
        console.log("Login!")
    }
    return(
        <form onSubmit={onSubmit} className='space-y-12 w-full sm:w-[400px]'>
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor='email'>Email</Label>
                <Input
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id='email'
                    type="email" 
                    placeholder="johnsmith@smth.com"
                />
            </div>
            
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor='password'>Password</Label>
                <Input
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id='password'
                    type="password"
                />
            </div>
            {error && <Alert>{error}</Alert>}
            <div className="w-full">
                <Button className='w-full bg-green-800 hover:bg-green-400' size="lg">Login</Button>
            </div>
        </form>
)
}