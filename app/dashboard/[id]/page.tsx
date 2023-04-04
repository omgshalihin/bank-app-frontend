import UserProfile from "@/app/components/UserProfile";
import React from "react";

async function getData(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${id}`);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const data = await getData(id);

  return (
    <div>
      <UserProfile id={data.id} image={data.userImage} />
    </div>
  );
};

export default page;
