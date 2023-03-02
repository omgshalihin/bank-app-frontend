"use client";

import Spinners from "@/app/components/Spinners";
import UserProfile from "@/app/components/UserProfile";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import useSWR from "swr";

const fetcher = (url: RequestInfo | URL) =>
  fetch(url).then((res) => res.json());

const page = () => {
  const pathName = usePathname();
  const id = pathName?.split("/")[2];
  const { data, error, isLoading } = useSWR(
    `http://localhost:8080/api/users/${id}`,
    fetcher
  );
  if (error)
    return (
      <div>
        <p>User ID is invalid.</p>
        <Link href={"/"}>Bring me to homepage</Link>
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
      <UserProfile id={data.id} image={data.userImage} />
    </div>
  );
};

export default page;
