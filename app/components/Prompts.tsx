"use client";

import { Card } from "flowbite-react";
import Link from "next/link";
import React from "react";
import useSWR from "swr";
import Register from "./Register";

interface User {
  id: string;
  userName: string;
  userEmail: string;
  userImage: string;
  userAccount: any[];
}

const fetcher = (url: RequestInfo | URL) =>
  fetch(url).then((res) => res.json());

const Prompts = ({ email, image }: any) => {
  const { data, error, isLoading } = useSWR(
    `https://bank-app-backend-production.up.railway.app/api/users/account/${email}`,
    fetcher
  );

  // if (!data) return <Register email={email} image={image} />;

  return (
    <div className="mx-auto">
      <Card>
        <h5 className="mb-3 text-base font-semibold text-gray-900 dark:text-white lg:text-xl">
          What would you like to do?
        </h5>
        <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Each of these services bring you to its respective pages.
        </p>
        <ul className="my-4 space-y-3">
          <li>
            <Link
              href={!data ? "/dashboard" : `/dashboard/${data?.id}`}
              className="group flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
            >
              <span className="ml-3 flex-1 whitespace-nowrap">
                My Dashboard
              </span>
            </Link>
          </li>
          <li>
            <Link
              href={!data ? "/account" : `/account/${data?.id}`}
              className="group flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
            >
              <span className="ml-3 flex-1 whitespace-nowrap">
                Create New Account
              </span>
            </Link>
          </li>
          <li>
            <Link
              // href={"/deposit"}
              href={!data ? "/deposit" : `/deposit/${data?.id}`}
              className="group flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
            >
              <span className="ml-3 flex-1 whitespace-nowrap">Deposit</span>
            </Link>
          </li>
          <li>
            <Link
              href={!data ? "/transfer" : `/transfer/${data?.id}`}
              className="group flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
            >
              <span className="ml-3 flex-1 whitespace-nowrap">
                Pay & Transfer
              </span>
            </Link>
          </li>
          <li>
            <Link
              href={!data ? "/invest" : `/invest/${data?.id}`}
              className="group flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
            >
              <span className="ml-3 flex-1 whitespace-nowrap">Invest</span>
              <span className="ml-3 inline-flex items-center justify-center rounded bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                Popular
              </span>
            </Link>
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default Prompts;
