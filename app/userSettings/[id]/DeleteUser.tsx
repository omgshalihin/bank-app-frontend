"use client";

import { Button } from "flowbite-react";
import Link from "next/link";
import React from "react";

const DeleteUser = ({ id }: any) => {
  return (
    <div>
      <Link href={`/userSettings/delete/${id}`}>
        <Button color="failure">Delete me</Button>
      </Link>
    </div>
  );
};

export default DeleteUser;
