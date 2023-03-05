import OverlaySuccess from "@/app/components/OverlaySuccess";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import React from "react";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div>
        <span className="text-center">Sign in to view your account</span>
      </div>
    );
  }

  return (
    <div>
      <OverlaySuccess email={session?.user?.email} />
    </div>
  );
};

export default page;
