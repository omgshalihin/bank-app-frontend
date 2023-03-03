import React from "react";
import Transfer from "./Transfer";

async function getData(id: string) {
  const res = await fetch(`http://localhost:8080/api/users/${id}`);
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
      <Transfer data={data} />
    </div>
  );
};

export default page;
