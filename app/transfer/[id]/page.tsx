import React from "react";
import Transfer from "./Transfer";

const page = async ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <Transfer id={params.id} />
    </div>
  );
};

export default page;
