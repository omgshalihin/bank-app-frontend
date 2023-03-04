"use client";

import { Table } from "flowbite-react";
import React from "react";

interface UserData {
  data: {
    userAccount: any[];
    userTransactionHistory: any[];
  };
}

interface Account {
  accountBalance: number;
  accountId: string;
  accountName: string;
}

interface Transaction {
  historyId: string;
  historyTimeStamp: string;
  accountId: string;
  accountName: string;
  transactionStatus: string;
  transactionAmount: number;
}

const TransactionHistory = ({ data }: UserData) => {
  return (
    <Table>
      <Table.Head>
        <Table.HeadCell>Account name</Table.HeadCell>
        <Table.HeadCell>Status</Table.HeadCell>
        <Table.HeadCell>Price</Table.HeadCell>
        <Table.HeadCell>Date / Time</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {data.userTransactionHistory.map((transaction: Transaction) => (
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {transaction.accountName}
            </Table.Cell>
            <Table.Cell>{transaction.transactionStatus}</Table.Cell>
            <Table.Cell>{transaction.transactionAmount}</Table.Cell>
            <Table.Cell>{transaction.historyTimeStamp}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default TransactionHistory;
