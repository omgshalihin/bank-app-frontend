"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type User = {
  id: string;
};
const Success = ({ id }: User) => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push(`/dashboard/${id}`);
    }, 3000);
  }, []);

  return (
    <div>
      <p>You have successfully registered as a member.</p>
      <p>Now you will be directed to dashboard.</p>
    </div>
  );
};

export default Success;
