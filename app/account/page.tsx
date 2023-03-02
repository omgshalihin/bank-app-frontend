import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession, Session } from "next-auth";
import { notFound } from "next/navigation";
import React from "react";
import CreateAccount from "../components/CreateAccount";

interface User {
  id: string;
  userName: string;
  userEmail: string;
  userAccount: any[];
}

async function getData(session: Session): Promise<User> {
  const res = await fetch(
    `http://localhost:8080/api/users/account/${session?.user?.email}`
  );
  if (!res.ok) {
    notFound();
  }

  return res.json();
}

const page = async () => {
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
    <div>
      <CreateAccount id={data.id} />
    </div>
  );
};

export default page;
