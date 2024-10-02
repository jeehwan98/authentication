'use client';

import Image from "next/image";
import logo from '@/app/favicon.ico';
import LoginForm from "./login/login-form";

export default function AuthForm() {

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex w-full max-w-6xl mx-auto bg-white shadow-lg">
        {/* left side */}
        <div className="w-1/2 p-10 bg-gray-100 flex flex-col justify-between">
          <div className="text-black">
            <div className="text-4xl font-bold mb-4">Welcome to Biddy</div>
            <Image
              width={100}
              src={logo}
              alt="Nike Logo"
              className="w-24 h-24 mb-10"
            />
          </div>
        </div>
        {/* right side */}
        <div className="w-1/2 p-10 flex items-center justify-center text-black">
          <div className="w-full max-w-md">
            <h2 className="text-4xl text-black font-bold mb-10">Login</h2>
            {/* <p className="mb-6 text-gray-600">Some Text</p> */}
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}