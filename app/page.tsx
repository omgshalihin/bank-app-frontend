import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import React from "react";
import Landing from "./components/Landing";
import Prompts from "./components/Prompts";

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div>
        <Landing />
      </div>
    );
  }

  return (
    <div>
      <Prompts email={session?.user?.email} />
    </div>
  );
};

export default Home;
