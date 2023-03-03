"use client";

import { Button, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";

interface User {
  id: string;
}

const CreateAccount = ({ id }: User) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number>(0);

  const registerName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    setName(value);
  };

  const registerAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    setAmount(parseFloat(value));
  };

  const handleCreation = () => {
    putData(name, amount);
  };

  const putData = (name: string, amount: number) => {
    const newAccountData = {
      accountName: `${name}`,
      accountBalance: amount,
    };
    fetch(`http://localhost:8080/api/users/${id}`, {
      method: "PUT",
      mode: "cors",
      body: JSON.stringify(newAccountData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  };

  return (
    <div>
      <form className="flex flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Account name" />
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
            <Label htmlFor="amount" value="Deposit amount" />
          </div>
          <TextInput
            onChange={(e) => registerAmount(e)}
            id="amount"
            type="amount"
            required={true}
            shadow={true}
          />
        </div>
        <form action={`/dashboard/${id}`} onClick={handleCreation}>
          <Button type="submit">Register new account</Button>
        </form>
      </form>
    </div>
  );
};

export default CreateAccount;
