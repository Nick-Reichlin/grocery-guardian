'use client'

import Navbar from "@/components/navbar";
import { useState } from 'react';

export default function ReceiptUpload() {
    const [parsedData, setParsedData] = useState(null);

    const handleParsePdf = async () => {
        const res = await fetch('/api/upload-receipt', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        setParsedData(data);
    }

    return (
        <main>
            <Navbar />
            <div className="h-screen w-screen flex justify-center bg-no-repeat items-center bg-emerald-100">
                <div className="w-full h-full sm:shadow-xl bg-white rounded-xl p-8 mt-20">
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 pb-2">
                        Receipt Upload
                    </h1>
                    <button onClick={handleParsePdf}>Parse PDF</button>
                    {parsedData && (
                        <div>
                            <h2>Parsed Data</h2>
                            <pre>{JSON.stringify(parsedData, null, 2)}</pre>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
