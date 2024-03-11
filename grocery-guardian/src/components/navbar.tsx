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
                <div>right</div>
            </div>
        </nav>
    )
}

export default Navbar