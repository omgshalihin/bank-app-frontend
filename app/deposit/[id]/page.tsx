import React from "react";
import useSWR from "swr";
import Link from "next/link";
import Spinners from "@/app/components/Spinners";
import Deposit from "@/app/components/Deposit";

async function getData(id: string) {
  const res = await fetch(`http://localhost:8080/api/users/${id}`);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const fetcher = (url: RequestInfo | URL) =>
  fetch(url).then((res) => res.json());

const page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const data = await getData(id);

  // const { data, error, isLoading } = useSWR(
  //   `http://localhost:8080/api/users/${id}`,
  //   fetcher
  // );
  // if (error)
  //   return (
  //     <div>
  //       <p>User ID is invalid.</p>
  //       <Link href={"/"}>Bring me to homepage</Link>
  //     </div>
  //   );
  // if (isLoading)
  //   return (
  //     <div>
  //       <Spinners />
  //     </div>
  //   );

  return (
    <div>
      <Deposit data={data} />
    </div>
  );
};

export default page;
