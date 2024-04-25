'use client'

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";
import router, { useRouter } from "next/navigation";


export const GroceryForm = ({ id }) => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [expirationDate, setExpirationDate] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const router = useRouter()

    useEffect(() => {
        const fetchGroceryItem = async () => {
            try {
                const res = await fetch(`/api/update-item?id=${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    } 
                });

                if (res.ok) {
                    const { item } = await res.json();
                    setName(item.name);
                    setQuantity(item.quantity);
                    setExpirationDate(item.expirationDate?.split('T')[0]);
                } else {
                    const errorData = await res.json();
                    throw new Error(errorData.message || 'Failed to fetch grocery data');
                }
            } catch (error) {
                setError(error.message);
            }
        };

        fetchGroceryItem();
    }, [id]);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {
            const res = await fetch(`/api/update-item`, {
                method: 'POST',
                body: JSON.stringify({
                    id: id,
                    name,
                    quantity,
                    expirationDate
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (res.ok) {
                setSuccess(true);
                setError(null);
            } else {
                const errorData = await res.json();
                throw new Error(errorData.message);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 w-full sm:w-[400px]">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">Edit Grocery Item</h1>
            <div className="grid w-full gap-1.5">
                <Label htmlFor='name'>Name</Label>
                <Input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id='name'
                    type="text"
                    readOnly
                />
            </div>
            <div className="grid w-full gap-1.5">
                <Label htmlFor='quantity'>Quantity</Label>
                <Input
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                    id='quantity'
                    type="number"
                />
            </div>
            <div className="grid w-full gap-1.5">
                <Label htmlFor='expirationDate'>Expiration Date</Label>
                <Input
                    required
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                    id='expirationDate'
                    type="date"
                />
            </div>
            {error && <Alert>{error}</Alert>}
            {success && <div className="bg-green-200 text-green-800 p-4 rounded-md">Item updated successfully!</div>}
            <Button className='w-full bg-green-800 hover:bg-green-700' size="lg">Update Item</Button>
            <Button onClick={() => router.back()} className="w-full bg-green-800 hover:bg-green-700" size="sm">
                Back to Inventory
            </Button>
        </form>
    );
}
