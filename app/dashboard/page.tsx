import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import React from "react";
import SignUp from "../components/SignUp";

export const metadata = {
  title: "Dashboard",
};

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div>
        <h1 className="text-center">Sign in to view your dashboard</h1>
      </div>
    );
  }

  return (
    <div>
      <SignUp email={session?.user?.email} />
    </div>
  );
};

export default Home;
