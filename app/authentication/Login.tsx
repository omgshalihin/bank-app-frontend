"use client";

import { signIn } from "next-auth/react";

import React from "react";

const Login = () => {
  return (
    <li className="list-none">
      <button
        onClick={() => signIn()}
        className="text-sm bg-gray-700 text-white py-2 px-6 rounded-xl disabled:opacity-25"
      >
        Sign in <span aria-hidden="true">&rarr;</span>
      </button>
    </li>
  );
};

export default Login;
