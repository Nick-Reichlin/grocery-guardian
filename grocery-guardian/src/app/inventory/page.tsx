import React from "react";
import Navbar from "@/components/navbar";
import { InventoryForm } from "./form";
import InvenetoryTable from "@/components/inventoryTable";
import { FoodItem } from './columns'
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";


async function getFoodItems(): Promise<FoodItem[]> {
  const session = await getServerSession(authOptions)
  try {
      if (session) {
        //console.log("In")
        const res = await fetch(`/api/inventoryRowsData?userID=${session?.user?.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (res.ok) {
          const data = await res.json()
          console.log(`Data: ${data}`)
          return data
        } else {
          const errorResponse = await res.json();
          throw new Error(errorResponse.error || 'Failed to fetch user groceries');
        }
      }
  } catch (error: any) {
    console.error(error);
  }
  return []
}

export default async function InventoryPage() {
  const FoodItems = await getFoodItems()
  console.log(FoodItems)

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
