import React from "react";
import OverlayConfirm from "./OverlayConfirm";

const page = ({ params }: any) => {
  return (
    <div>
      <OverlayConfirm id={params.id} />
    </div>
  );
};

export default page;
