"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

import React from "react";

const Login = () => {
  return (
    <li className="list-none">
      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="flex flex-row text-sm bg-gray-700 text-white py-2 px-6 gap-x-2 rounded-xl disabled:opacity-25"
      >
        <FcGoogle className="self-center" /> Sign in with Google
        {/* <span aria-hidden="true">&rarr;</span> */}
      </button>
    </li>
  );
};

export default Login;
