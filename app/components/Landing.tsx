"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Landing() {
  return (
    <div className="isolate">
      <div className="px-6 pt-6 lg:px-8"></div>
      <main>
        <div className="relative px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-40">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative rounded-full py-1 px-3 text-sm leading-6 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                Give this project a star.{" "}
                <Link
                  href="https://github.com/omgshalihin/bank-app-frontend"
                  className="font-semibold text-indigo-600"
                >
                  <span className="absolute inset-0" aria-hidden="true" />
                  Visit GitHub <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight  sm:text-6xl">
                Dashboard to manage your finances
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Create seperate accounts, deposit, transfer and check
                transactions history.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <button
                  onClick={() =>
                    signIn("google", { callbackUrl: "/dashboard" })
                  }
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Don't have an account? <br />{" "}
                  <div className="text-lg">Sign up here!</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
