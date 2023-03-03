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
    `http://localhost:8080/api/users/account/${email}`,
    fetcher
  );

  return (
    <>
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
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => signOut({ callbackUrl: `/` })}>
          Sign out
        </Dropdown.Item>
      </Dropdown>
    </>
  );
};

export default UserDropdownHeader;
