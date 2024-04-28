import React from 'react';
import Navbar from "@/components/navbar";
import { InventoryForm } from "./form";
import InvenetoryTable from "@/components/inventoryTable";

export default function InventoryPage() {
  return (
    <main>
      <Navbar />
      <div className="flex justify-center items-start bg-no-repeat bg-emerald-100 min-h-screen w-full">
        <div className="w-full bg-white rounded-xl p-8 my-5 mx-auto shadow-xl overflow-hidden">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Your Groceries
            </h1>
            <InventoryForm />
            <InvenetoryTable />
        </div>
      </div>
    </main>
  );
}
