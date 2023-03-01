"use client";

import { Card, Dropdown } from "flowbite-react";
import React, { useEffect, useState } from "react";

interface User {
  data: {
    id: string;
    userName: string;
    userEmail: string;
    userAccount: any[];
  };
  image: string;
}

type Account = {
  accountName: string;
  accountBalance: number;
};

const UserProfile = ({ data, image }: User) => {
  return (
    <div className="mx-auto">
      <Card>
        <div className="flex justify-end px-4 pt-4"></div>
        <div className="flex flex-col items-center pb-10">
          <img
            className="mb-3 h-24 w-24 rounded-full shadow-lg"
            src={image}
            alt="profile image"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {data.userName}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {data.userEmail}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {data.id}
          </span>
          <h5 className="pt-10 mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
            {data.userAccount.length} Accounts
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {data.userAccount.map((account: Account) => (
              <ul className="flex flex-row justify-evenly">
                <li>{account.accountName}</li>
                <li>{account.accountBalance}</li>
              </ul>
            ))}
          </span>

          <h5 className="pt-10 mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
            Total Accounts Balance
          </h5>
          <div className="flex items-baseline text-gray-900 dark:text-white">
            <span className="text-3xl font-semibold">$</span>
            <span className="text-5xl font-extrabold tracking-tight">
              {data.userAccount
                .map((account: Account) => account.accountBalance)
                .reduce((prev, curr) => prev + curr, 0)}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserProfile;
