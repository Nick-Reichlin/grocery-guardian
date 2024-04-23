import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";

export const GroceryForm = ({ id }) => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [expirationDate, setExpirationDate] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchGroceryItem = async () => {
            try {
                const response = await fetch(`/api/update-item?id=${id}`, { method: 'GET' });
                if (response.ok) {
                    const data = await response.json();
                    setName(data.name);
                    setQuantity(data.quantity);
                    setExpirationDate(data.expirationDate.split('T')[0]); // Assuming the date comes in ISO format
                } else {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to fetch grocery data');
                }
            } catch (error) {
                setError(error.message);
            }
        };

        fetchGroceryItem();
    }, [id]); // Depend on id to refetch when it changes

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {
            const response = await fetch(`/api/update-item?id=${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    name,
                    quantity,
                    expirationDate
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                setSuccess(true);
                setError(null);
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 w-full sm:w-[400px]">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Update Grocery Item</h1>
            <div className="grid w-full gap-1.5">
                <Label htmlFor='name'>Name</Label>
                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id='name'
                    type="text"
                />
            </div>
            <div className="grid w-full gap-1.5">
                <Label htmlFor='quantity'>Quantity</Label>
                <Input
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                    id='quantity'
                    type="number"
                />
            </div>
            <div className="grid w-full gap-1.5">
                <Label htmlFor='expirationDate'>Expiration Date</Label>
                <Input
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                    id='expirationDate'
                    type="date"
                />
            </div>
            {error && <Alert>{error}</Alert>}
            {success && <div className="bg-green-200 text-green-800 p-4 rounded-md">Item updated successfully!</div>}
            <Button className='w-full bg-green-800 hover:bg-green-700' size="lg">Update Item</Button>
        </form>
    );
}
