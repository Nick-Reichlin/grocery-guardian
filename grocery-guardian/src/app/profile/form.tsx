'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert } from "@/components/ui/alert"
import React, { useEffect } from "react"

export const ProfileForm = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [name, setName] = React.useState('')
    const [error, setError] = React.useState<string | null>(null)
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`/api/profile?email=nickreichlin@gmail.com`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
    
                if (res.ok) {
                    const { user } = await res.json()
                    setEmail(user.email)
                    setName(user.name)
                } else {
                    const errorResponse = await res.json();
                    throw new Error(errorResponse.error || 'Failed to fetch user data');
                }
            } catch (error: any) {
                setError(error.message || 'An error occurred while fetching your profile');
                console.error(error);
            }
        };
    
        fetchUser();
    }, []);
    


    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const res = await fetch('/api/profile', {
                method: 'POST',
                body: JSON.stringify({
                    email, password, name
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(res.ok) {

            } else {
                setError((await res.json()).error)
            }
        } catch (error: any) {
            setError(error?.message)
            console.error(error)
        }
    }

    return (
        <form onSubmit={onSubmit} className='space-y-12 w-full sm:w-[400px]'>
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor='email'>Email</Label>
                <Input
                    required
                    defaultValue={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id='email' 
                    type="email"
                    readOnly
                />
            </div>

            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor='name'>Name</Label>
                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id='name'
                    type="name"
                />
            </div>

            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor='password'>New Password</Label>
                <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id='password'
                    type="password"
                />
            </div>

            {error && <Alert>{error}</Alert>}
            <div className="w-full">
                <Button className='w-full bg-green-800 hover:bg-green-400' size="lg">Update</Button>
            </div>
        </form>
    )
}
