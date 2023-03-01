"use client";

import React from "react";
import UserDropdownHeader from "../components/UserDropdownHeader";

type User = {
  name: string;
  email: string;
};

const Logged = ({ name, email }: User) => {
  return (
    <>
      <UserDropdownHeader name={name} email={email} />
    </>
  );
};

export default Logged;
