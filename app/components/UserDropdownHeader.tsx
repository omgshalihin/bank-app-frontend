"use client";

import { Dropdown } from "flowbite-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import useSWR from "swr";

type User = {
  name: string;
  email: string;
};

const fetcher = (url: RequestInfo | URL) =>
  fetch(url).then((res) => res.json());

const UserDropdownHeader = ({ name, email }: User) => {
  const { data, error, isLoading } = useSWR(
    `https://bank-app-backend-production.up.railway.app/api/users/account/${email}`,
    fetcher
  );

  if (error)
    return (
      <Link href={`/register`}>
        Register <span aria-hidden="true">&rarr;</span>
      </Link>
    );

  return (
    <div>
      <Dropdown label="Navigate">
        <Dropdown.Header>
          <span className="block text-sm">{name}</span>
          <span className="block truncate text-sm font-medium">{email}</span>
        </Dropdown.Header>
        <Link href={`/dashboard/${data?.id}`}>
          <Dropdown.Item>My Dashboard</Dropdown.Item>
        </Link>
        <Link href={`/transfer/${data?.id}`}>
          <Dropdown.Item>Pay & Transfer</Dropdown.Item>
        </Link>
        <Dropdown.Item>Invest</Dropdown.Item>
        <Link href={`/userSettings/${data?.id}`}>
          <Dropdown.Item>Settings</Dropdown.Item>
        </Link>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => signOut({ callbackUrl: `/` })}>
          Sign out
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};

export default UserDropdownHeader;
