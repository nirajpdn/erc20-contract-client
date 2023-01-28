import { TxnInterface } from "@/pages";
import React from "react";

const TxnInfo: React.FC<{ txn: TxnInterface }> = ({ txn }) => {
  return (
    <ul className="text-xs p-3 bg-blue-100 rounded-lg">
      <li>
        <strong>From:</strong> {txn.from}
      </li>
      <li>
        <strong>To:</strong> {txn.to}
      </li>
      <li>
        <strong>Amount:</strong> {txn.amount}
      </li>
      <li>
        <a
          href={`https://goerli.etherscan.io/tx/${txn.txHash}`}
          target="_blank"
          rel="noreferrer"
          className="text-green-600 cursor-pointer"
        >
          View in etherscan
        </a>
      </li>
    </ul>
  );
};

export default TxnInfo;
