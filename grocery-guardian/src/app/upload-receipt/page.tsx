'use client'

import Navbar from "@/components/navbar";
import { useState } from "react";
import ConvertApi from 'convertapi-js'
import { useSession } from "next-auth/react";
import { Alert } from "@/components/ui/alert";
import React from "react";

export default function ReceiptUpload() {
    const [file, setFile] = useState<File>();
    const [convertedText, setConvertedText] = useState<string>('');
    const { data: session } = useSession();
    const [error, setError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState<boolean>(false);


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) {
            console.log("No file selected.");
            return; // Early return if no file is selected
        }
    
        try {
            // Authentication and parameter setting
            let convertApi = ConvertApi.auth('OyfZvenizzakKCYt');
            let params = convertApi.createParams();
            params.add('file', file);
    
            // Attempting the conversion
            let result = await convertApi.convert('pdf', 'txt', params);
    
            // Continue if the conversion was successful
            const response = await fetch(result.files[0].Url);
            const text = await response.text();
            setConvertedText(text);
            const pattern = /CASH\r?\n(.*?)(?=\r?\n\s*\r?\n)/s;
            const match = text.match(pattern);
            if (match && match[1]) {
                let groceries = match[1].replace(/[\r\n]+/g, ",");
                
                const items = groceries.split(",").map((item: string) => {
                    const parts = item.trim().split(" ");
                    const quantity = parseInt(parts[0], 10);
                    const name = parts.slice(1).join(" ");
                    return { name, quantity };
                });

                const postData = {
                    matchedText: groceries,
                    userId: session?.user?.id
                };
                
                // Post the extracted data to your server
                const res = await fetch("/api/upload-receipt", {
                    method: "POST",
                    body: JSON.stringify(postData),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
    
                if (res.ok) {
                    setSuccess(true);
                    setError(null);
                } else {
                    const errorData = await res.json();
                    setError(errorData.error || "Failed to upload data.");
                }
            } else {
                setError("No matching data found in the document.");
            }
        } catch (error) {
            // Catch and handle errors from ConvertApi or any other part of the try block
            console.error("An error occurred during the conversion or fetch process: ", error);
            setError("Failed to convert the document: " + error.message);
        }
    };
    

    return (
        <main>
            <Navbar />
            <div className="h-screen w-screen flex justify-center items-center bg-no-repeat bg-emerald-100">
                <div className="w-full h-full sm:shadow-xl bg-white rounded-xl p-8 mt-20">
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 pb-2">
                        Receipt Upload
                    </h1>
                    <form onSubmit={onSubmit} className="flex flex-col items-center">
                        <input
                            type="file"
                            name="file"
                            onChange={(e) => setFile(e.target.files?.[0])}
                            className="mb-4"
                        />
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Upload
                        </button>
                    </form>
                    {error && <Alert>{error}</Alert>}
                    {success && (
                    <div className="bg-green-200 text-green-800 p-3 rounded-md mt-4 mb-4 mx-4 text-center">
                        Receipt contents added to account!
                    </div>
                    )}
                </div>
            </div>
        </main>
    );
}
