"use client";

import React from "react";
import useSWR from "swr";
import Link from "next/link";
import Spinners from "@/app/components/Spinners";
import Deposit from "@/app/components/Deposit";

const fetcher = (url: RequestInfo | URL) =>
  fetch(url).then((res) => res.json());

const page = ({ params }: { params: { id: string } }) => {
  const id = params.id;

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
      <Deposit data={data} />
    </div>
  );
};

export default page;
