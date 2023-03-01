"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Success = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/dashboard");
    }, 3000);
  }, []);

  return (
    <div>
      <p>You have successfully created an account.</p>
      <p>Now you will be directed to dashboard.</p>
    </div>
  );
};

export default Success;
