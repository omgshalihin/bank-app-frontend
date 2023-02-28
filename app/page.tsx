import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import React from "react";

async function getData(session) {
  const res = await fetch(
    `http://localhost:8080/api/users/account/${session.user.email}`
    // `http://localhost:8080/api/users/account/test`
  );

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    // throw new Error("Failed to fetch data");
    // return undefined;
    notFound();
  }

  return res.json();
}

const Home = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <>
        <h1 className="text-center">
          Hi, welcome to your personal banking app!
        </h1>
      </>
    );
  }
  const data = await getData(session);
  return (
    <>
      <h1 className="text-center">Hi, {data.id}</h1>
    </>
  );
};

export default Home;
