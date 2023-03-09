"use client";

import { Alert, Card, Toast } from "flowbite-react";
import Link from "next/link";
import React, { useState } from "react";
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
  const [visibleEmail, setVisibleEmail] = useState(false);
  const [visibleId, setVisibleId] = useState(false);
  const { data, error, isLoading } = useSWR(
    `https://bank-app-backend-production.up.railway.app/api/users/${id}`,
    fetcher
  );

  const handleIdView = () => {
    setVisibleId(!visibleId);
  };

  const handleEmailView = () => {
    setVisibleEmail(!visibleEmail);
  };

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
    <div>
      <div>
        <Toast className="mb-5 min-w-full">
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
          </div>
          <div className="ml-3 text-sm font-normal">
            Navigate to settings if you wish to deactivate your account.
          </div>
          <Toast.Toggle />
        </Toast>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="order-first ">
          <div className="flex flex-col items-center">
            <img
              className="mb-3 h-24 w-24 rounded-full shadow-lg"
              src={image}
              alt="profile image"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {data.userName.charAt(0).toUpperCase() + data.userName.slice(1)}
            </h5>

            <div className="flow-root">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="shrink-0">
                      <MdPermIdentity className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1 flex flex-row">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white self-center">
                        {visibleId
                          ? data.id
                          : data.id.replace(/[0-9a-zA-Z-@-\\.]/g, "*")}
                      </p>
                      {!visibleId ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 ml-3 text-gray-900 text-opacity-50 hover:text-opacity-100 dark:text-white dark:text-opacity-50 dark:hover:text-opacity-100"
                          onClick={() => handleIdView()}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 ml-3 text-gray-900 text-opacity-50 hover:text-opacity-100 dark:text-white dark:text-opacity-50 dark:hover:text-opacity-100"
                          onClick={() => handleIdView()}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="shrink-0">
                      <MdEmail className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1 flex flex-row">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white self-center">
                        {visibleEmail
                          ? data.userEmail
                          : data.userEmail.replace(/[0-9a-zA-Z-@-\\.]/g, "*")}
                      </p>
                      {!visibleEmail ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 ml-3 text-gray-900 text-opacity-50 hover:text-opacity-100 dark:text-white dark:text-opacity-50 dark:hover:text-opacity-100"
                          onClick={() => handleEmailView()}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 ml-3 text-gray-900 text-opacity-50 hover:text-opacity-100 dark:text-white dark:text-opacity-50 dark:hover:text-opacity-100"
                          onClick={() => handleEmailView()}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Card>
        <Card className="order-2 lg:order-1 lg:col-span-2">
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
            {!data.userAccount.length ? (
              <h1>Get started by creating an account</h1>
            ) : (
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {data.userAccount.map((account: Account) => (
                  <li
                    key={account.accountId}
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
            )}
          </div>
        </Card>

        <Card className="order-1 lg:order-2">
          <div className="flex flex-col items-center pb-10">
            <h5 className="pt-10 mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
              Total Accounts Balance
            </h5>
            <div className="flex items-baseline text-gray-900 dark:text-white">
              <span className="text-3xl font-semibold">$</span>
              <span
                id="count"
                className="text-5xl font-extrabold tracking-tight"
              >
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
        <Card className="order-last lg:col-span-2">
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
    </div>
  );
};

export default UserProfile;
