import DeleteUser from "@/app/userSettings/[id]/DeleteUser";
import React from "react";

const page = ({ params }: any) => {
  return (
    <div>
      <DeleteUser id={params.id} />
    </div>
  );
};

export default page;
