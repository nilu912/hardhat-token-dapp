import { ethers } from "ethers";
import { connectWallet } from "../utils/contract";
import React, { useEffect, useState } from "react";

const WalletConnect = ({ setAccount, setContract }) => {
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        window.ethereum.on("accountsChanged", (accounts) => {
          setWalletAddress(accounts[0]);
          setAccount(accounts[0]);
        });
      }
    };
    checkConnection();
  }, []);
  const handleConnect = async () => {
    const {contract, account} = await connectWallet();
    setWalletAddress(account);
    setAccount(account);
    setContract(contract);
  }

  return (
    <>
        <div className="flex justify-center">
            <button className="w-[15rem] h-[3rem] rounded-md bg-indigo-600 hover:not-focus:bg-indigo-700" onClick={handleConnect}>
                {walletAddress? `Connected: ${walletAddress.slice(0, 6)}...`:"Connect Wallet"}
            </button>
        </div>
    </>
  );
};

export default WalletConnect;
