"use client";

import { Card } from "flowbite-react";
import Link from "next/link";
import React from "react";
import useSWR from "swr";
import Spinners from "./Spinners";
import { BsCashCoin } from "react-icons/bs";
import { BiTransfer } from "react-icons/bi";
import { GiPayMoney } from "react-icons/gi";
import { MdEmail, MdPermIdentity } from "react-icons/md";
import TransactionHistory from "./TransactionHistory";

interface User {
  id: string;
  image: string;
}

type Account = {
  accountId: string;
  accountName: string;
  accountBalance: number;
};

const fetcher = (url: RequestInfo | URL) =>
  fetch(url).then((res) => res.json());

const UserProfile = ({ id, image }: User) => {
  const { data, error, isLoading } = useSWR(
    `https://bank-app-backend-production.up.railway.app/api/users/${id}`,
    fetcher
  );

  if (error)
    return (
      <div>
        <p>Failed to load</p>
        <Link href={"/register"}>Click</Link>
      </div>
    );
  if (isLoading)
    return (
      <div>
        <Spinners />
      </div>
    );

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Card>
        <div className="flex flex-col items-center">
          <img
            className="mb-3 h-24 w-24 rounded-full shadow-lg"
            src={image}
            alt="profile image"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {data.userName.toUpperCase()}
          </h5>

          <div className="flow-root">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="shrink-0">
                    <MdPermIdentity className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      {data.id}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="shrink-0">
                    <MdEmail className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      {data.userEmail}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Card>
      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Accounts
          </h5>
          <Link
            href={`/account/${id}`}
            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            Create
          </Link>
        </div>
        <div className="flow-root max-h-64 overflow-y-scroll no-scrollbar">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {data.userAccount.map((account: Account) => (
              <li
                className={`${
                  account.accountBalance ||
                  !account.accountName.includes("From")
                    ? "py-3 sm:py-4"
                    : "hidden"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="shrink-0">
                    <BsCashCoin className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      {account.accountName}
                    </p>
                    <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                      {account.accountId}
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    ${account.accountBalance}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Card>

      <Card>
        <div className="flex flex-col items-center pb-10">
          <h5 className="pt-10 mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
            Total Accounts Balance
          </h5>
          <div className="flex items-baseline text-gray-900 dark:text-white">
            <span className="text-3xl font-semibold">$</span>
            <span id="count" className="text-5xl font-extrabold tracking-tight">
              {data.userAccount
                .map((account: Account) => account.accountBalance)
                .reduce((prev: number, curr: number) => prev + curr, 0)
                .toFixed(2)}
            </span>
          </div>
        </div>
        <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
          <Link
            href={`/deposit/${data.id}`}
            className="inline-flex w-full items-center justify-center rounded-lg bg-gray-800 px-4 py-2.5 text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 sm:w-auto"
          >
            <GiPayMoney className="mr-3 h-7 w-7" />
            <div className="text-left">
              <div className="mb-1 text-xs">Make a</div>
              <div className="-mt-1 font-sans text-sm font-semibold">
                Deposit
              </div>
            </div>
          </Link>
          <Link
            href={`transfer/${data.id}`}
            className="inline-flex w-full items-center justify-center rounded-lg bg-gray-800 px-4 py-2.5 text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 sm:w-auto"
          >
            <BiTransfer className="mr-3 h-7 w-7" />
            <div className="text-left">
              <div className="mb-1 text-xs">Pay &</div>
              <div className="-mt-1 font-sans text-sm font-semibold">
                Transfer
              </div>
            </div>
          </Link>
        </div>
      </Card>
      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Transactions History
          </h5>
          {/* <Link
            href={`/account/${id}`}
            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            Create
          </Link> */}
        </div>
        <div className="flow-root max-h-64 overflow-y-scroll no-scrollbar">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            <TransactionHistory data={data} />
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default UserProfile;
