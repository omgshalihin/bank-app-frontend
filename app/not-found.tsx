"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <h2>It seems that you are not a member.</h2>
      <p>
        Please <Link href={"/register"}>register</Link>!
      </p>
    </>
  );
}
