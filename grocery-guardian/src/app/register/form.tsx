'use client'

import React from "react"

export const RegisterForm = () => {
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Register!')
    }

    return (
        <form>
            <input />
            <input />
            <button>Register</button>
        </form>
    )
}