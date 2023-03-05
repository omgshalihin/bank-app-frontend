import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import React from "react";
import SignUp from "../components/SignUp";

const Home = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      {/* <span className="text-center">Sign in to view your dashboard</span> */}
      <SignUp email={session?.user?.email} image={session?.user?.image} />
    </div>
  );
};

export default Home;
