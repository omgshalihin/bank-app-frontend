"use client";

import { Card } from "flowbite-react";
import Link from "next/link";
import React, { useState } from "react";
import useSWR from "swr";

const fetcher = (url: RequestInfo | URL) =>
  fetch(url).then((res) => res.json());

const Prompts = ({ email }: any) => {
  const { data, error, isLoading } = useSWR(
    `https://bank-app-backend-production.up.railway.app/api/users/account/${email}`,
    fetcher
  );
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(!hover);
  };

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
                {data ? "My Dashboard" : "Loading..."}
              </span>
            </Link>
          </li>
          <li>
            <Link
              href={!data ? "/account" : `/account/${data?.id}`}
              className="group flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
            >
              <span className="ml-3 flex-1 whitespace-nowrap">
                {data ? "Create New Account" : "Loading..."}
              </span>
              <span className="ml-3 inline-flex items-center justify-center rounded bg-gray-200 px-2 py-0.5 text-xs font-medium text-yellow-500 dark:bg-gray-700 dark:text-yellow-400">
                Popular
              </span>
            </Link>
          </li>
          <li>
            <Link
              href={!data ? "/deposit" : `/deposit/${data?.id}`}
              className="group flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
            >
              <span className="ml-3 flex-1 whitespace-nowrap">
                {data ? "Deposit" : "Loading..."}
              </span>
            </Link>
          </li>
          <li>
            <Link
              href={!data ? "/transfer" : `/transfer/${data?.id}`}
              className="group flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
            >
              <span className="ml-3 flex-1 whitespace-nowrap">
                {data ? "Pay & Transfer" : "Loading..."}
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              onMouseEnter={onHover}
              onMouseLeave={onHover}
              className={`${
                hover
                  ? "group flex items-center rounded-lg bg-red-50 p-3 text-base font-bold text-gray-900 hover:bg-red-100 hover:shadow dark:bg-red-600 dark:text-white dark:hover:bg-red-500"
                  : "group flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
              }`}
            >
              {hover ? (
                <span className="ml-3 flex-1 whitespace-nowrap">
                  Coming Soon
                </span>
              ) : (
                <span className="ml-3 flex-1 whitespace-nowrap">
                  {data ? "Invest" : "Loading..."}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default Prompts;
