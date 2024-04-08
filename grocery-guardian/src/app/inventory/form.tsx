"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";

export const InventoryForm = () => {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<boolean>(false);

  // const { data: session } = useSession();

  // useEffect(() => {
  //     const fetchUser = async () => {
  //         try {
  //             if (session) {
  //                 const res = await fetch(`/api/profile?email=${session?.user?.email}`, {
  //                     method: 'GET',
  //                     headers: {
  //                         'Content-Type': 'application/json'
  //                     }
  //                 });

  //                 if (res.ok) {
  //                     const { user } = await res.json();
  //                     setEmail(user.email);
  //                     setName(user.name);
  //                 } else {
  //                     const errorResponse = await res.json();
  //                     throw new Error(errorResponse.error || 'Failed to fetch user data');
  //                 }
  //             }
  //         } catch (error: any) {
  //             setError(error.message || 'An error occurred while fetching your profile');
  //             console.error(error);
  //         }
  //     };

  //     if (session) {
  //         fetchUser();
  //     }
  // }, [session]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        body: JSON.stringify({
          email,
          name,
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
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
              />
            </div>
          </div>
          <div className="w-full flex-1 mx-2">
            <div className="my-2 p-2 bg-white flex">
              <Input
                placeholder="Quantity"
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                type="name"
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
        <div className="bg-green-200 text-green-800 p-4 rounded-md">
          Profile updated successfully!
        </div>
      )}
    </form>
  );
};
