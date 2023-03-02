"use client";

import React from "react";
import UserDropdownHeader from "../components/UserDropdownHeader";
import { Card, Dropdown } from "flowbite-react";
import Link from "next/link";

import useSWR from "swr";
import Spinners from "../components/Spinners";
import { signOut } from "next-auth/react";

type User = {
  name: string;
  email: string;
};

const Logged = ({ name, email }: User) => {
  return (
    <div>
      <UserDropdownHeader name={name} email={email} />
    </div>
  );
};

export default Logged;
