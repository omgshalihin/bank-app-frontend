"use client";

import { Button, Label, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type User = {
  email: string;
  image: string;
};

const Register = ({ email, image }: User) => {
  const router = useRouter();
  const [name, setName] = useState("");

  const registerName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    setName(value);
  };

  const handleRegistration = () => {
    const data = {
      userName: name,
      userEmail: email,
      userImage: image,
    };
    fetch(`http://localhost:8080/api/users`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    router.push("/register/success");
  };

  return (
    <form className="flex flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Your username" />
        </div>
        <TextInput
          onChange={(e) => registerName(e)}
          id="name"
          type="text"
          required={true}
          shadow={true}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="disabledEmail" value="Your email" />
        </div>
        <TextInput
          id="disabledEmail"
          type="text"
          value={email}
          placeholder="name@domain.com"
          disabled={true}
          readOnly={true}
        />
      </div>
      <Button type="button" onClick={() => handleRegistration()}>
        Become a member
      </Button>
    </form>
  );
};

export default Register;
