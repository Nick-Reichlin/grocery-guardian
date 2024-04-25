'use client'

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { GroceryForm } from "@/components/update-item-form";

export default function EditPage() {
    const navigation = useRouter();

    const searchParams = useSearchParams()

    const rawID = searchParams.get('id')
    const id = parseInt(rawID, 10);

    useEffect(() => {
        if (!id) {
            navigation.push('/404'); // Redirecting to a Not Found page if no ID is present
        }
    }, [id, navigation]);

    if (!id) {
        return <div>Loading or invalid ID...</div>;
    }

    return (
        <main>
            <div className="h-screen w-screen flex justify-center bg-no-repeat items-center bg-emerald-100">
                <div className="sm:shadow-xl px-8 py-8 sm:bg-white rounded-xl space-y-12">
                    <GroceryForm id={id} />
                </div>
            </div>
        </main>
    );
}
