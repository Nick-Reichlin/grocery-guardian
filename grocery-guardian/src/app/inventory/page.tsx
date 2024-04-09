import React from "react";
import Navbar from "@/components/navbar";
import { InventoryForm } from "./form";
import InvenetoryTable from "@/components/inventoryTable";
import { FoodItem } from './columns'

async function getFoodItems(): Promise<FoodItem[]> {
  const res = await fetch(
    ''
  )
  const data = await res.json()
  return data
}

export default async function InventoryPage() {
  const FoodItems = await getFoodItems()

  return (
    <main>
      <Navbar />
      <div className="h-screen w-screen flex justify-center bg-no-repeat items-center bg-emerald-100">
        <div className="w-11/12 h-[90vh] sm:shadow-xl bg-white rounded-xl p-8 mt-10">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 pb-2">
            Inventory
            </h1>
            <InventoryForm/>
            <InvenetoryTable FoodItems={FoodItems}/>
        </div>
      </div>
    </main>
  );
}
