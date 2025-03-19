import { ethers } from "ethers";
import contractABI from "../abi/Token.json";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

let provider, signer, contract;

export const connectWallet = async () => {
  if (!window.ethereum) {
    alert("Metamask not detected!");
    return;
  }
  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();
  const accounts = await provider.send("eth_requestAccounts", []);
  contract = new ethers.Contract(contractAddress, contractABI.abi, signer);

  return {account: accounts[0], contract};
};

export const getBalance = async (account) => {
    if(!account) return;
    const balance = await contract.balanceOf(account)
    return ethers.utils.formatUnits(balance, 0);
};

export const transferTokens = async (recipient, amount) => {
    if(!contract) return;
    const tx = await contract.transfer(recipient, ethers.utils.parseUnits(amount, 0));
    await tx.wait();   
}
