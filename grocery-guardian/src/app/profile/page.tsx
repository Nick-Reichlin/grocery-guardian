import React from "react";
import { ProfileForm } from "./form";

export default function RegisterPage() {
  return (
    <div className="h-screen w-screen flex justify-center bg-no-repeat items-center">
      <div className="sm:shadow-xl px-8 py-8 sm:bg-white rounded-xl space-y-12">
        <ProfileForm/>
      </div>
    </div>
  );
}