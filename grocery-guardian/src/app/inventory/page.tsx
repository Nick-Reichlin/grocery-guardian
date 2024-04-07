import React from "react";
import Navbar from "@/components/navbar";

export default function RegisterPage() {
  return (
    <main>
      <Navbar />
      <div className="h-screen w-screen flex justify-center bg-no-repeat items-center bg-emerald-100">
        <div className="sm:shadow-xl px-8 py-8 sm:bg-white rounded-xl space-y-12">
            <h1>Inventory</h1>
        </div>
      </div>
    </main>
  );
}