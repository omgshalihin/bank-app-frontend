import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession, Session } from "next-auth";
import { notFound } from "next/navigation";
import React from "react";
import UserProfile from "../components/UserProfile";

interface User {
  id: string;
  userName: string;
  userEmail: string;
  userAccount: any[];
}

async function getData(session: Session): Promise<User> {
  const res = await fetch(
    `http://localhost:8080/api/users/account/${session?.user?.email}`,
    { next: { revalidate: 2 } }
  );
  if (!res.ok) {
    notFound();
  }

  return res.json();
}

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <>
        <h1 className="text-center">Sign in to view your dashboard</h1>
      </>
    );
  }
  const data = await getData(session);
  return (
    <>
      <UserProfile id={data.id} image={session?.user?.image || ""} />
    </>
  );
};

export default Home;
