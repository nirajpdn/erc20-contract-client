import * as React from "react";
import { ethers } from "ethers";
import erc20abi from "@/abi/erc20.abi.json";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Head from "next/head";
import Table from "@/components/Table";
export default function App() {
  const [txs, setTxs] = React.useState([]);
  const [contractListened, setContractListened] = React.useState();

  const [loadingInfo, setLoadingInfo] = React.useState({
    getTokenInfo: false,
    balanceInquiry: false,
    fundTransfer: false,
  });

  const [transferInfo, setTransferInfo] = React.useState<{
    amount: string;
    recipient: string;
  }>({ recipient: "", amount: "" });

  const { amount, recipient } = transferInfo;
  const [error, setError] = React.useState();

  const [contractInfo, setContractInfo] = React.useState<{
    address: string;
    tokenName: string;
    tokenSymbol: string;
    totalSupply: string;
    decimals: string;
  }>({
    address: "",
    tokenName: "-",
    tokenSymbol: "-",
    totalSupply: "-",
    decimals: "-",
  });

  const { tokenName, tokenSymbol, totalSupply, decimals } = contractInfo;
  const [balanceInfo, setBalanceInfo] = React.useState({
    address: "-",
    balance: "-",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingInfo({ ...loadingInfo, getTokenInfo: true });
    try {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
        // "goerli"
      );
      const erc20 = new ethers.Contract(
        contractInfo.address,
        erc20abi,
        provider
      );
      const values = {
        tokenName: await erc20.name(),
        tokenSymbol: await erc20.symbol(),
        totalSupply: BigInt(await erc20.totalSupply()).toString(),
        address: contractInfo.address,
        decimals: await erc20.decimals(),
      };

      setContractInfo(values);
    } catch (e: any) {
      alert(e.reason);
    } finally {
      setLoadingInfo({ ...loadingInfo, getTokenInfo: false });
    }
  };

  const getMyBalance = async () => {
    setLoadingInfo({ ...loadingInfo, balanceInquiry: true });
    try {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      await provider.send("eth_requestAccounts", []);
      const erc20 = new ethers.Contract(
        contractInfo.address,
        erc20abi,
        provider
      );
      const signer = provider.getSigner();
      const signerAddress = await signer.getAddress();
      const balance = await erc20.balanceOf(signerAddress);
      setBalanceInfo({
        address: signerAddress,
        balance: String(balance),
      });
    } catch (e: any) {
      alert(e.reason);
    } finally {
      setLoadingInfo({ ...loadingInfo, balanceInquiry: false });
    }
  };

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingInfo({ ...loadingInfo, fundTransfer: true });
    try {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const erc20 = new ethers.Contract(contractInfo.address, erc20abi, signer);
      await erc20.transfer(recipient, amount);
      alert("Success");
    } catch (e: any) {
      alert(e.reason);
    } finally {
      setLoadingInfo({ ...loadingInfo, fundTransfer: false });
    }
  };
  const headings = [
    { key: "name", value: "Name" },
    { key: "symbol", value: "Symbol" },
    { key: "total_supply", value: "Total Supply" },
    { key: "decimals", value: "Decimals" },
  ];
  const data = [
    {
      name: tokenName,
      symbol: tokenSymbol,
      total_supply: totalSupply,
      decimals,
    },
  ];

  return (
    <>
      <Head>
        <title>ERC20 Contract</title>
      </Head>
      <main>
        <div className="px-5 my-10 max-w-3xl mx-auto">
          <form onSubmit={handleSubmit}>
            <h2 className="text-center font-semibold text-lg">
              Read from smart contract
            </h2>
            <Input
              type="text"
              name="address"
              value={contractInfo.address}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setContractInfo({ ...contractInfo, address: e.target.value })
              }
              placeholder="ERC20 contract address"
            />
            <div className="pl-6 text-gray-600 text-xs">
              Sample address:
              <ul>
                <li>0xC06c06758ae0a94E7F00fd6f410BD729df15447b</li>
                <li>0x9ea4227988C45671F7813AcBB20ca26Fa007fe5D</li>
              </ul>
            </div>
            <Button type="submit" disabled={loadingInfo.getTokenInfo}>
              {loadingInfo.getTokenInfo ? "Mining..." : "Get info token"}
            </Button>
          </form>

          <div className="relative overflow-x-auto">
            <Table {...{ headings, data }} />
          </div>
          <Button onClick={getMyBalance} disabled={loadingInfo.balanceInquiry}>
            {loadingInfo.balanceInquiry ? "Mining..." : "Get my balance"}
          </Button>
          <div className="relative overflow-x-auto">
            <Table
              headings={[
                { key: "address", value: "Address" },
                { key: "balance", value: "Balance" },
              ]}
              data={[
                {
                  ...balanceInfo,
                },
              ]}
            />
          </div>

          <form onSubmit={handleTransfer} className="mt-10">
            <h2 className="text-center font-semibold text-lg">Fund transfer</h2>
            <Input
              type="text"
              name="recipient"
              value={recipient}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTransferInfo({ ...transferInfo, recipient: e.target.value })
              }
              placeholder="Recipient address"
            />
            <small className="pl-6 text-gray-600 text-xs">
              Sample address: 0x212C2e4CACc96a85cADDae84cb4667d43397DEAb
            </small>
            <Input
              type="text"
              name="amount"
              value={amount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTransferInfo({ ...transferInfo, amount: e.target.value })
              }
              placeholder="Amount to transfer"
            />
            <Button type="submit" disabled={loadingInfo.fundTransfer}>
              {loadingInfo.fundTransfer ? "Mining..." : "Transfer"}
            </Button>
          </form>
        </div>
      </main>
    </>
  );
}
