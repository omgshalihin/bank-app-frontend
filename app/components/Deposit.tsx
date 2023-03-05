"use client";

import { Button, Checkbox, Label, Table, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
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

const Deposit = ({ id }: any) => {
  const { data, error, isLoading } = useSWR(
    `https://bank-app-backend-production.up.railway.app/api/users/${id}`,
    fetcher
  );

  const [userData, setUserData] = useState<User>(data);
  const [amount, setAmount] = useState<number>(0);
  const [checkBoxStatus, setCheckBoxStatus] = useState({
    status: false,
    accountName: "",
    accountBalance: 0,
  });

  const router = useRouter();

  const depositAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(parseFloat(value));
  };

  const handleCheckBox = (e: any, name: string, balance: number) => {
    const isChecked = e.target.checked;

    setCheckBoxStatus({
      status: isChecked,
      accountName: name,
      accountBalance: balance,
    });
  };

  const handleConfirm = async (account: Account) => {
    const accountId = account.accountId;
    const balance = account.accountBalance;
    const depositAmount = amount;
    const projectedBalance = balance + depositAmount;

    // for transaction history
    const accountName = account.accountName;
    const transactionStatus = "+";
    const transactionAmount = amount;

    const dataToPatch = {
      accountBalance: `${projectedBalance}`,
    };

    const dataToPut = {
      accountId: `${accountId}`,
      accountName: `${accountName}`,
      transactionStatus: `${transactionStatus}`,
      transactionAmount: transactionAmount,
    };

    patchAndPutData(accountId, dataToPatch, dataToPut);
  };

  const patchAndPutData = async (
    accountId: string,
    dataToPatch: { accountBalance: string },
    dataToPut: {
      accountId: string;
      accountName: string;
      transactionStatus: string;
      transactionAmount: number;
    }
  ) => {
    const url = `https://bank-app-backend-production.up.railway.app/api/users/${id}?account=${accountId}`;
    const url2 = `https://bank-app-backend-production.up.railway.app/api/users/history/${id}`;

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
    ]);
    router.push(`/dashboard/${id}`);
  };

  return (
    <div>
      <div className="flex flex-col items-center align-middle">
        <div className="mb-2 block text-center">
          <Label value="How much do you wish to deposit?" />
        </div>
        <TextInput
          sizing="sm"
          onChange={(e) => depositAmount(e)}
          type="number"
          min={0}
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
              <Table.Row
                className={`${
                  !account.accountName.includes("From")
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
                  ${account.accountBalance + (amount ? amount : 0)}
                </Table.Cell>
                <Table.Cell>
                  <form onClick={() => handleConfirm(account)}>
                    <Button
                      gradientDuoTone="greenToBlue"
                      type="button"
                      disabled={
                        checkBoxStatus.status &&
                        checkBoxStatus.accountName === account.accountName &&
                        checkBoxStatus.accountBalance === account.accountBalance
                          ? false
                          : true
                      }
                    >
                      Confirm
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
