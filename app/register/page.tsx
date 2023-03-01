"use client";

import { Button, Label, TextInput } from "flowbite-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Register = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const registerName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    setName(value);
  };

  const registerEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    setEmail(value);
  };

  const handleRegistration = () => {
    const data = {
      userName: name,
      userEmail: email,
    };
    fetch(`http://localhost:8080/api/users`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    router.push("/dashboard");
  };

  return (
    <div>
      <form className="flex flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Your username" />
          </div>
          <TextInput
            onChange={(e) => registerName(e)}
            id="username"
            type="name"
            required={true}
            shadow={true}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput
            onChange={(e) => registerEmail(e)}
            id="email2"
            type="email"
            placeholder="name@domain.com"
            required={true}
            shadow={true}
          />
        </div>
        <Button type="button" onClick={() => handleRegistration()}>
          Register new account
        </Button>
      </form>
    </div>
  );
};

export default Register;
