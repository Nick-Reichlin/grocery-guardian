"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import React from "react";
import { useSession } from "next-auth/react";

export const InventoryForm = () => {

  const [quantity, setQuantity] = React.useState("");
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<boolean>(false);

  const { data: session } = useSession();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/inventory", {
        method: "POST",
        body: JSON.stringify({
          name: name.toLowerCase(),
          quantity,
          userId: session?.user?.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        setSuccess(true);
        setError(null);
      } else {
        setError((await res.json()).error);
      }
    } catch (error: any) {
      setError(error?.message);
      console.error(error);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-12 w-full">
      <div className="flex flex-col md:flex-row border-b border-gray-200 pb-4 mb-4">
        <div className="w-64 font-bold h-6 mx-2 mt-3 text-gray-800">
          Add New Grocery Item
        </div>
        <div className="flex-1 flex flex-col md:flex-row">
          <div className="w-full flex-1 mx-2">
            <div className="my-2 p-2 bg-white flex">
              <Input
                placeholder="Food Item Name"
                required
                onChange={(e) => setName(e.target.value)}
                id="name"
                type="name"
              />
            </div>
          </div>
        <div className="w-full flex-1 mx-2">
          <div className="my-2 p-2 bg-white flex">
            <Input
              placeholder="Quantity"
              required
              onChange={(e) => setQuantity(e.target.value)}
              id="quantity"
              type="number"
            />
          </div>
        </div>
      </div>
      <div className="w-full flex-1 mx-2">
          <div className="my-2 p-2 bg-white flex">
              <Button className="bg-green-800 hover:bg-green-400" size="lg">
              Add item
              </Button>
          </div>
      </div>
    </div>
    {error && <Alert>{error}</Alert>}
        {success && (
          <div className="bg-green-200 text-green-800 p-3 rounded-md mt-0">
            Grocery item added!
          </div>
        )}
  </form>
);
};
