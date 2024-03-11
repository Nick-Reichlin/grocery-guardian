import React from "react"
import Image from "next/image"
import Link from "next/link"

const Navbar = () => {
    return (
        <nav className="fixed w-full h-12 shadow-xl">
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
                        <Link href="/inventory">
                            <li className="ml-10 hover:border-b text-xl">Inventory</li>
                        </Link>
                        <Link href="/grocery-lists">
                            <li className="ml-10 hover:border-b text-xl">Grocery Lists</li>
                        </Link>
                        <Link href="/profile">
                            <li className="ml-10 hover:border-b text-xl">Profile</li>
                        </Link>

                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar