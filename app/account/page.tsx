import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession, Session } from "next-auth";
import { notFound } from "next/navigation";
import React from "react";
import UserProfile from "../components/UserProfile";

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
        <h1 className="text-center">Sign in to view your account</h1>
      </>
    );
  }
  const data = await getData(session);
  return (
    <>
      <UserProfile data={data} image={session?.user?.image || ""} />
    </>
  );
};

export default Home;
