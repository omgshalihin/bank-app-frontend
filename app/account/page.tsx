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

async function getNewData(id) {
  const res = await fetch(`http://localhost:8080/api/users/${id}`);
  if (!res.ok) {
    notFound();
  }

  return res.json();
}

const page = async () => {
  const session = await getServerSession(authOptions);
  const data = await getData(session);
  const newData = await getNewData(data.id);

  return (
    <div>
      <h1>Account route</h1>
      <p>{session?.user?.email}</p>
      <p>{data.id}</p>
      <CreateAccount data={data} />
    </div>
  );
};

export default page;
