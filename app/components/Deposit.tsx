"use client";

import { Button, Checkbox, Label, Table, TextInput } from "flowbite-react";
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
  const [checkBoxStatus, setCheckBoxStatus] = useState({
    status: false,
    accountName: "",
    accountBalance: 0,
  });
  const pathName = usePathname();
  const userId = pathName?.split("/")[2];

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

  const handleConfirm = (account: Account) => {
    const accountId = account.accountId;
    const balance = account.accountBalance;
    const depositAmount = amount;
    const projectedBalance = balance + depositAmount;

    // for transaction history
    const accountName = account.accountName;
    const transactionStatus = "+";
    const transactionAmount = amount;

    patchData(accountId, projectedBalance);
    putTransactionHistory(
      accountId,
      accountName,
      transactionStatus,
      transactionAmount
    );
  };

  const patchData = (accountId: string, projectedBalance: number) => {
    const dataToPatch = {
      accountBalance: `${projectedBalance}`,
    };

    const url = `https://bank-app-backend-production.up.railway.app/api/users/${userId}?account=${accountId}`;
    fetch(url, {
      method: "PATCH",
      mode: "cors",
      body: JSON.stringify(dataToPatch),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  };

  const putTransactionHistory = (
    accountId: string,
    accountName: string,
    transactionStatus: string,
    transactionAmount: number
  ) => {
    const dataToPatch = {
      accountId: `${accountId}`,
      accountName: `${accountName}`,
      transactionStatus: `${transactionStatus}`,
      transactionAmount: transactionAmount,
    };

    const url = `https://bank-app-backend-production.up.railway.app/api/users/history/${userId}`;
    fetch(url, {
      method: "PUT",
      mode: "cors",
      body: JSON.stringify(dataToPatch),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
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
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
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
                  <form
                    action={`/dashboard/${userId}`}
                    onSubmit={() => handleConfirm(account)}
                  >
                    <Button
                      type="submit"
                      gradientDuoTone="greenToBlue"
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
