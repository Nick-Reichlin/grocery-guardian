import React from "react"
import Image from "next/image"
import Link from "next/link"
import { LogoutButton } from "@/app/auth"

const Navbar = () => {
    return (
        <nav className="fixed w-full h-12 shadow-xl bg-white">
            <div className="flex justify-between items-center h-full w-full px-8 2xl:px-16">
                <Link href='/'>
                    <Image 
                        src={"/logo.png"} 
                        alt={"logo"}
                        width="50"
                        height="14"
                        className="cursor-pointer"
                        priority
                    />
                </Link>
                <div>
                    <ul className="hidden sm:flex">
                        <Link href="/upload-receipt">
                            <li className="ml-10 hover:border-b text-green-600 text-xl">Upload a receipt</li>
                        </Link>
                        <Link href="/inventory">
                            <li className="ml-10 hover:border-b text-green-600 text-xl">Your Groceries</li>
                        </Link>
                        <Link href="/grocery-lists">
                            <li className="ml-10 hover:border-b text-green-600 text-xl">Grocery Lists</li>
                        </Link>
                        <Link href="/profile">
                            <li className="ml-10 hover:border-b text-green-600 text-xl">Profile</li>
                        </Link>
                        <li className="ml-10 hover:border-b text-green-600 text-xl">
                            <LogoutButton />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar