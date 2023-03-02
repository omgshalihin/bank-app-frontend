import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession, Session } from "next-auth";
import { notFound } from "next/navigation";
import React from "react";
import UserPrompt from "./components/UserPrompt";

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <>
        <h1 className="text-center">Welcome to your personal banking app!</h1>
      </>
    );
  }

  return (
    <main className="">
      <UserPrompt email={session?.user?.email} image={session?.user?.image} />
    </main>
  );
};

export default Home;
