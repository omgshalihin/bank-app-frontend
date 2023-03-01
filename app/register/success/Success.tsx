"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Success = () => {
  const router = useRouter();

  return (
    <div>
      <p>
        You have successfully registered as a member. Now you will be directed
        to dashboard.
      </p>
      <button type="button" onClick={() => router.push("/dashboard")}>
        Go to dashboard
      </button>
    </div>
  );
};

export default Success;
