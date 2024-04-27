'use client'

import Navbar from "@/components/navbar";
import { useState } from "react";
import ConvertApi from 'convertapi-js'

export default function ReceiptUpload() {
    const [file, setFile] = useState<File>();
    const [convertedText, setConvertedText] = useState<string>('');

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (file) {
            let convertApi = ConvertApi.auth('OyfZvenizzakKCYt')
            let params = convertApi.createParams()
            params.add('file', file)
            let result = await convertApi.convert('pdf', 'txt', params)
            const response = await fetch(result.files[0].Url);
            const text = await response.text();
            setConvertedText(text);
            //console.log(text);
            const pattern = /CASH\r?\n(.*?)(?=\r?\n\s*\r?\n)/s;
            const match = text.match(pattern);
            console.log("Regex match:", match[1])

        } else {
            console.log("No file selected.");
        }
    }

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
                </div>
            </div>
        </main>
    );
}
