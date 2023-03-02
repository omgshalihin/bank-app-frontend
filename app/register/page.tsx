import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import React from "react";
import Register from "../components/Register";

const page = async () => {
  return (
    <div>
      <h1 className="text-center">Sign in to view your dashboard</h1>
    </div>
  );
};

export default page;
