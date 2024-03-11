import React from "react";
import Link from "next/link";
import { LoginForm } from './form'

export default function LoginPage() {
  return (
    <div className="h-screen w-screen flex justify-center bg-no-repeat items-center bg-[url('https://images.unsplash.com/photo-1534533983688-c7b8e13fd3b6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
      <div className="sm:shadow-xl px-8 py-8 sm:bg-white rounded-xl space-y-12">
        <h1 className="font-semibold text-2xl">Login</h1>
        <LoginForm />
        <p className="text-center">
          Need to create an account?&nbsp;
          <Link className="text-green-500 hover:underline" href="/register">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
