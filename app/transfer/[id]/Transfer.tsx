"use client";

import { Button, Checkbox, Label, Table, TextInput } from "flowbite-react";
import { BiTransfer } from "react-icons/bi";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

interface User {
  id: string;
  userName: string;
  userEmail: string;
  userImage: string;
  userAccount: any[];
}

interface Account {
  accountId: string;
  accountName: string;
  accountBalance: number;
}

const Deposit = ({ data }: any) => {
  const [userData, setUserData] = useState<User>(data);
  const [amount, setAmount] = useState<number>(0);
  const [recipient, setRecipient] = useState<string>("");
  const [checkBoxStatus, setCheckBoxStatus] = useState({
    status: false,
    accountName: "",
  });
  const pathName = usePathname();
  const userId = pathName?.split("/")[2];

  const transferAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(parseFloat(value));
  };

  const recipientEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRecipient(value);
  };

  const handleCheckBox = (e: any, name: string) => {
    const isChecked = e.target.checked;

    setCheckBoxStatus({
      status: isChecked,
      accountName: name,
    });
  };

  const handleSend = (account: Account, recipient: string) => {
    const accountId = account.accountId;
    const balance = account.accountBalance;
    const transferAmount = amount;
    const projectedBalance = balance - transferAmount;
    patchUserData(accountId, projectedBalance);
    putRecipientData(recipient, transferAmount);
  };

  const patchUserData = (accountId: string, projectedBalance: number) => {
    const dataToPatch = {
      accountBalance: `${projectedBalance}`,
    };

    const url = `http://localhost:8080/api/users/${userId}?account=${accountId}`;
    fetch(url, {
      method: "PATCH",
      mode: "cors",
      body: JSON.stringify(dataToPatch),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  };

  const putRecipientData = (recipient: string, transferAmount: number) => {
    const dataToPut = {
      accountName: `From: ${userData.userName}`,
      accountBalance: transferAmount,
    };

    const url = `http://localhost:8080/api/users/transfer/${recipient}`;
    fetch(url, {
      method: "PUT",
      mode: "cors",
      body: JSON.stringify(dataToPut),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  };

  return (
    <div>
      <div className="flex flex-col items-center align-middle">
        <div className="mb-2 block text-center">
          <Label value="How much do you wish to transfer" />
        </div>
        <TextInput
          sizing="sm"
          onChange={(e) => transferAmount(e)}
          type="number"
          min={0}
          className="mb-5"
        />
      </div>
      <div className="flex flex-col items-center align-middle">
        <div className="mb-2 block text-center">
          <Label htmlFor="email" value="Email of recipient" />
        </div>
        <TextInput
          type="email"
          onChange={(e) => recipientEmail(e)}
          placeholder="recipient@email.com"
          required={true}
          className="mb-5"
        />
      </div>

      <Table>
        <Table.Head>
          <Table.HeadCell className="!p-4">
            <Checkbox />
          </Table.HeadCell>
          <Table.HeadCell>Account name</Table.HeadCell>
          <Table.HeadCell>Balance</Table.HeadCell>
          <Table.HeadCell>Projected Balance</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {userData.userAccount.map((account) => {
            return (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="!p-4">
                  <Checkbox
                    onClick={(e) => handleCheckBox(e, account.accountName)}
                  />
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {account.accountName}
                </Table.Cell>
                <Table.Cell>${account.accountBalance}</Table.Cell>
                <Table.Cell>
                  ${account.accountBalance - (amount ? amount : 0)}
                </Table.Cell>
                <Table.Cell>
                  <form
                    action={`/dashboard/${userId}`}
                    onSubmit={() => handleSend(account, recipient)}
                  >
                    <Button
                      type="submit"
                      gradientDuoTone="greenToBlue"
                      disabled={
                        checkBoxStatus.status &&
                        checkBoxStatus.accountName === account.accountName
                          ? false
                          : true
                      }
                    >
                      <BiTransfer className="mr-3 h-7 w-7" />
                      Send
                    </Button>
                  </form>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default Deposit;
