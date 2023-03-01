"use client";

import { Dropdown } from "flowbite-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

type User = {
  name: string;
  email: string;
};

const UserDropdownHeader = ({ name, email }: User) => {
  const router = useRouter();
  return (
    <>
      <Dropdown label="Navigate">
        <Dropdown.Header>
          <span className="block text-sm">{name}</span>
          <span className="block truncate text-sm font-medium">{email}</span>
        </Dropdown.Header>
        <Dropdown.Item onClick={() => router.push("/account")}>
          My Account
        </Dropdown.Item>
        <Dropdown.Item>Pay & Transfer</Dropdown.Item>
        <Dropdown.Item>Invest</Dropdown.Item>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => signOut()}>Sign out</Dropdown.Item>
      </Dropdown>
    </>
  );
};

export default UserDropdownHeader;
