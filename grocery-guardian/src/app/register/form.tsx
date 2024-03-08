'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React from "react"

export const RegisterForm = () => {
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Register!')
    }

    return (
        <form>
            <div>
                <Input />
            </div>
            
            <Input />
            <Button>Register</Button>
        </form>
    )
}