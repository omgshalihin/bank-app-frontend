"use client";

import { Button, Label, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface User {
  id: string;
}

const CreateAccount = ({ id }: User) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const router = useRouter();

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
    const newAccountData = {
      accountName: `${name}`,
      accountBalance: amount,
    };
    const dataToPutHistory = {
      accountName: `${name}`,
      transactionStatus: "+",
      transactionAmount: amount,
    };
    sendDataToServer(newAccountData, dataToPutHistory);
  };

  const sendDataToServer = async (
    newAccountData: { accountName: string; accountBalance: number },
    dataToPutHistory: {
      accountName: string;
      transactionStatus: string;
      transactionAmount: number;
    }
  ) => {
    const urlCreateAccount = `https://bank-app-backend-production.up.railway.app/api/users/${id}`;
    const urlUpdateHistory = `https://bank-app-backend-production.up.railway.app/api/users/history/${id}`;

    await Promise.all([
      await fetch(urlCreateAccount, {
        method: "PUT",
        mode: "cors",
        body: JSON.stringify(newAccountData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      await fetch(urlUpdateHistory, {
        method: "PUT",
        mode: "cors",
        body: JSON.stringify(dataToPutHistory),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    ]);
    router.push(`/dashboard/${id}`);
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
            placeholder="e.g. personal, transport or food"
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
            placeholder="e.g. 9.99, 150"
          />
        </div>
        <Button onClick={handleCreation} className="min-w-full" type="button">
          Register new account
        </Button>
      </form>
    </div>
  );
};

export default CreateAccount;
