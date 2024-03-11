import React from "react";
import { RegisterForm } from "./form";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="h-screen w-screen flex justify-center bg-no-repeat items-center bg-[url('https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
      <div className="sm:shadow-xl px-8 py-8 sm:bg-white rounded-xl space-y-12">
        <h1 className="font-semibold text-2xl">Create your Account</h1>
        <RegisterForm />
        <p className="text-center">
          Have an account?&nbsp;
          <Link className="text-green-500 hover:underline" href="/login">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
