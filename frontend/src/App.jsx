import React, { useState } from "react";
import { ethers } from "ethers";
import TokenBalance from "./components/TokenBalance";
import TransferToken from "./components/TransferToken";
import WalletConnect from "./components/WalletConnect";

const App = () => {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-400">
        Blockchain Token DApp
      </h2>

      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md space-y-6">
        <WalletConnect setAccount={setAccount} setContract={setContract} />

        {account && (
          <div className="space-y-6">
            <div className="bg-gray-700 p-4 rounded-lg shadow-sm">
              <TokenBalance account={account} />
            </div>

            <div className="bg-gray-700 p-4 rounded-lg shadow-sm">
              <TransferToken
                account={account}
                updateBalance={() => setAccount(account)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

// import React from "react";
// import { useState, useEffect } from "react";
// import { ethers } from "ethers";
// import contractABI from "./abi/Token.json";

// const App = () => {
//   const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
//   const [balance, setBalance] = useState("");
//   const [contract, setContract] = useState(null);
//   const [account, setAccount] = useState("");
//   const [formData, setFormData] = useState({
//     receiver: "",
//     tokenAmm: "",
//   });

//   // useEffect(() => {
//   //   connectWallet();
//   // }, [account]);
//   useEffect(() => {
//     if(account && contract)
//       getBalance();
//   }, [account,contract]);

//   const connectWallet = async () => {
//     if (window.ethereum) {
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const signer = provider.getSigner();
//       const accounts = await provider.send("eth_requestAccounts", []);
//       setAccount(accounts[0]);

//       const contractInstance = new ethers.Contract(
//         contractAddress,
//         contractABI.abi,
//         signer
//       );
//       setContract(contractInstance);
//       // getBalance();

//       window.ethereum.on("accountsChanged", (newAccount) => {
//         setAccount(newAccount[0]);
//       });
//     } else {
//       alert("MetaMask not detected");
//     }
//   };
//   const disconnectWallet = () => {
//     setAccount("");
//     setBalance("");
//   };
//   const transferToken = async (e) => {
//     e.preventDefault();
//     if (!contract || !formData.receiver || !formData.tokenAmm)
//       alert("Please enter recipient address and amount!");
//     try {
//       const tx = await contract.transfer(
//         formData.receiver,
//         ethers.utils.parseUnits(formData.tokenAmm, 0)
//       );
//       console.log("transaction sent:", tx);

//       await tx.wait();
//       alert("Transaction confirm!");
//     } catch (error) {
//       console.error(error);
//       alert("Transaction Faild!");
//     }
//   };
//   const getBalance = async () => {
//     if (!contract || !account) return;
//     try {
//       const getAccountAddress = ethers.utils.getAddress(account);
//       const ownerBal = await contract.balanceOf(getAccountAddress);
//       setBalance(ethers.utils.formatUnits(ownerBal, 0));
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   const onChnageHandller = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };
//   return (
//     <>
//       <div>
//         <h4>Blockchain Token Dapp</h4>
//         <p>connected wallet: {account}</p>
//         <p>Owner balance: {balance}</p>
//         {account === "" ? (
//           <button onClick={connectWallet}>Connect Wallet</button>
//         ) : (
//           <button onClick={disconnectWallet}>Disconnect Wallet</button>
//         )}
//         <form onSubmit={transferToken}>
//           <p>Enter Receiver Address</p>
//           <input
//             type="text"
//             name="receiver"
//             placeholder="Enter Receiver Address"
//             onChange={onChnageHandller}
//           ></input>
//           <p>Enter Token Amount</p>
//           <input
//             type="number"
//             name="tokenAmm"
//             placeholder="Enter Token Amount"
//             onChange={onChnageHandller}
//           ></input>
//           <button>Submit Data</button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default App;
