"use client";

import { Button } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div>
      <h2>It seems that you are not a member.</h2>
      <div className="flex flex-wrap items-center gap-2 justify-center">
        <Button
          onClick={() => router.push("/register")}
          outline={true}
          gradientDuoTone="pinkToOrange"
        >
          Sign me up!
        </Button>
      </div>
    </div>
  );
}
