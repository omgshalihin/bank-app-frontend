// app/posts/[...slug]/page.tsx
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

async function getData() {
  const res = await fetch(`http://localhost:8080/api/users/account/test`);

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    // throw new Error("Failed to fetch data");
    return undefined;
  }

  return res.json();
}

export default async function PostPage() {
  const data = await getData();

  if (!data) {
    notFound();
  }

  return <h1>hey</h1>;
}
