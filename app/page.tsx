import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import React from "react";
import UserPrompt from "./components/UserPrompt";

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div>
        <h1 className="text-center">Welcome to your personal banking app!</h1>
      </div>
    );
  }

  return (
    <div>
      <UserPrompt email={session?.user?.email} image={session?.user?.image} />
    </div>
  );
};

export default Home;
