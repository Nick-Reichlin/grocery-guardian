import React from "react";
import Navbar from "@/components/navbar";

export default function RegisterPage() {
  return (
    <main>
      <Navbar />
      <div className="h-screen w-screen flex justify-center bg-no-repeat items-center bg-emerald-100">
        <h1 className=" absolute text-3xl font-bold text-center text-gray-800 mb-8">
          Inventory
        </h1>
        <div className="w-11/12 h-[90vh] sm:shadow-xl bg-white rounded-xl p-8 mt-10"></div>
      </div>
    </main>
  );
}
