"use client";

import { Button, Checkbox, Label, Table, TextInput } from "flowbite-react";
import { BiTransfer } from "react-icons/bi";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { HiCash, HiMail } from "react-icons/hi";
import Email from "next-auth/providers/email";
import useSWR from "swr";

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

const fetcher = (url: RequestInfo | URL) =>
  fetch(url).then((res) => res.json());

const Transfer = ({ id }: any) => {
  const { data, error, isLoading } = useSWR(
    `https://bank-app-backend-production.up.railway.app/api/users/${id}`,
    fetcher
  );
  const [userData, setUserData] = useState<User>(data);
  const [amount, setAmount] = useState<number>(0);
  const [recipient, setRecipient] = useState<string>("");
  const [checkBoxStatus, setCheckBoxStatus] = useState({
    status: false,
    accountName: "",
    accountBalance: 0,
  });

  const router = useRouter();

  const transferAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(parseFloat(value));
  };

  const recipientEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRecipient(value);
  };

  const handleCheckBox = (e: any, name: string, balance: number) => {
    const isChecked = e.target.checked;

    setCheckBoxStatus({
      status: isChecked,
      accountName: name,
      accountBalance: balance,
    });
  };

  const handleSend = async (account: Account, recipient: string) => {
    const accountId = account.accountId;
    const balance = account.accountBalance;
    const transferAmount = amount;
    const projectedBalance = balance - transferAmount;

    // for transaction history
    const accountName = account.accountName;
    const transactionStatus = "-";
    const transactionAmount = amount;

    const dataToPatch = {
      accountBalance: `${projectedBalance}`,
    };

    const dataToPut = {
      accountName: `From: ${userData.userName}`,
      accountBalance: transferAmount,
    };

    const dataToPutHistory = {
      accountId: `${accountId}`,
      accountName: `${accountName}`,
      transactionStatus: `${transactionStatus}`,
      transactionAmount: transactionAmount,
    };

    // patchUserData(accountId, dataToPatch);

    // putRecipientData(recipient, transferAmount);

    sendDataToServer(
      accountId,
      dataToPatch,
      dataToPut,
      recipient,
      dataToPutHistory
    );
  };

  const sendDataToServer = async (
    accountId: string,
    dataToPatch: { accountBalance: string },
    dataToPut: { accountName: string; accountBalance: number },
    recipient: string,
    dataToPutHistory: {
      accountId: string;
      accountName: string;
      transactionStatus: string;
      transactionAmount: number;
    }
  ) => {
    const url = `https://bank-app-backend-production.up.railway.app/api/users/${id}?account=${accountId}`;
    const url2 = `https://bank-app-backend-production.up.railway.app/api/users/transfer/${recipient}`;
    const url3 = `https://bank-app-backend-production.up.railway.app/api/users/history/${id}`;

    await Promise.all([
      await fetch(url, {
        method: "PATCH",
        mode: "cors",
        body: JSON.stringify(dataToPatch),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      await fetch(url2, {
        method: "PUT",
        mode: "cors",
        body: JSON.stringify(dataToPut),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      await fetch(url3, {
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
      <div className="flex flex-col items-center align-middle">
        <div className="mb-2 block text-center">
          <Label value="How much do you wish to transfer" />
        </div>
        <TextInput
          sizing="sm"
          onChange={(e) => transferAmount(e)}
          type="number"
          min={0}
          icon={HiCash}
          placeholder="amount"
          color={`${amount ? "success" : "failure"}`}
          helperText={`${amount ? "Alright!" : "Please enter a valid amount!"}`}
        />
      </div>
      <div className="mt-3 flex flex-col items-center align-middle">
        <div className="mb-2 block text-center">
          <Label htmlFor="email" value="Email of recipient" />
        </div>
        <TextInput
          id="email"
          type="email"
          icon={HiMail}
          onChange={(e) => recipientEmail(e)}
          placeholder="recipient@email.com"
          required={true}
          color={`${
            recipient.includes("@") && recipient.includes(".com")
              ? "success"
              : "failure"
          }`}
          helperText={`${
            recipient.includes("@") && recipient.includes(".com")
              ? "Alright!"
              : "Please enter a valid email address!"
          }`}
        />
      </div>

      <Table className="mt-7">
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
              <Table.Row
                className={`${
                  account.accountBalance
                    ? "bg-white dark:border-gray-700 dark:bg-gray-800"
                    : "hidden"
                }`}
              >
                <Table.Cell className="!p-4">
                  <Checkbox
                    onClick={(e) =>
                      handleCheckBox(
                        e,
                        account.accountName,
                        account.accountBalance
                      )
                    }
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
                    // action={`/dashboard/${id}`}
                    onClick={() => handleSend(account, recipient)}
                  >
                    <Button
                      type="button"
                      gradientDuoTone="greenToBlue"
                      disabled={
                        checkBoxStatus.status &&
                        checkBoxStatus.accountName === account.accountName &&
                        checkBoxStatus.accountBalance === account.accountBalance
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

export default Transfer;
