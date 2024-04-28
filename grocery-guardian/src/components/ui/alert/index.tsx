import React from "react"

type AlertProps = {
    children: React.ReactNode
}
const Alert = ({ children }: AlertProps) => {
    return (
        <div className="p-2 rounded bg-red-200 p-3 rounded-md mt-4 mb-4 mx-4 text-center">
            {children}
        </div>
    )
}
export {Alert}