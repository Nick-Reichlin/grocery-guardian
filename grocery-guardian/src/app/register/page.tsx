import React from "react";
import { RegisterForm } from "./form";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-green-300">
      <div className="shadow-xl px-8 py-8 bg-white rounded-xl space-y-12">
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
