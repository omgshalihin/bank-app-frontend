import React from "react";
import CreateAccount from "@/app/components/CreateAccount";

const page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  return (
    <div>
      <CreateAccount id={id} />
    </div>
  );
};

export default page;
