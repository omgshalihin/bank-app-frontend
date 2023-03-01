"use client";

import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import React from "react";

const Success = () => {
  const router = useRouter();

  return (
    <div>
      <p>You have successfully registered as a member.</p>
      <button
        type="button"
        onClick={() => {
          router.refresh();
          router.push("/dashboard");
        }}
      >
        Go to dashboard
      </button>
      {/* <div className="flex flex-wrap items-center gap-2 justify-center">
        <Button
          type="button"
          onClick={() => router.push("/dashboard")}
          outline={true}
          gradientDuoTone="pinkToOrange"
        >
          View My Dashboard
        </Button>
      </div> */}
    </div>
  );
};

export default Success;
