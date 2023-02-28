import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession, Session } from "next-auth";
import { notFound } from "next/navigation";
import React from "react";

interface User {
  id: string;
  userName: string;
  userEmail: string;
  userAccountName: string;
  userAccountBalance: number;
}

async function getData(session: Session): Promise<User> {
  const res = await fetch(
    `http://localhost:8080/api/users/account/${session?.user?.email}`
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
      <h1 className="text-center">My Dashboard</h1>
      <div className="flex flex-col">
        <span>{data.id}</span>
        <span>{data.userName}</span>
        <span>{data.userEmail}</span>
        <span>{data.userAccountName}</span>
        <span>${data.userAccountBalance}</span>
      </div>
    </>
  );
};

export default Home;
