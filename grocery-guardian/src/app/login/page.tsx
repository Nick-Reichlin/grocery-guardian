import React from "react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-200">
      <div className="sm:shadow-xl px-8 py-8 sm:bg-white rounded-xl space-y-12">
        <h1 className="font-semibold text-2xl">Login</h1>
        
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
