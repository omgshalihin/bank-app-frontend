import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession, Session } from "next-auth";
import { notFound } from "next/navigation";
import React from "react";
import Register from "../components/Register";
import UserProfile from "../components/UserProfile";

interface User {
  id: string;
  userName: string;
  userEmail: string;
  userAccount: any[];
}

const Home = async () => {
  return (
    <>
      <h1 className="text-center">Sign in to view your dashboard</h1>
    </>
  );
};

export default Home;
