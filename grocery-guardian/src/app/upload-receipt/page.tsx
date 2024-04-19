'use client'

import Navbar from "@/components/navbar";
import { useState } from "react";

export default function ReceiptUpload() {

    const [file, setFile] = useState<File>()

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!file) return
    
        try {
          const data = new FormData()
          data.set('file', file)
    
          const res = await fetch('/api/upload-receipt', {
            method: 'POST',
            body: data
          })
          // handle the error
          if (!res.ok) throw new Error(await res.text())
        } catch (e: any) {
          // Handle errors here
          console.error(e)
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
