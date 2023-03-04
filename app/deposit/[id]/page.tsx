import React from "react";
import Deposit from "@/app/components/Deposit";

const page = async ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <Deposit id={params.id} />
    </div>
  );
};

export default page;
