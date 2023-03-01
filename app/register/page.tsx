import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import React from "react";
import Register from "../components/Register";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <>
        <h1 className="text-center">Sign in to view your dashboard</h1>
      </>
    );
  }
  return (
    <div>
      <Register email={session?.user?.email || ""} />
    </div>
  );
};

export default page;
