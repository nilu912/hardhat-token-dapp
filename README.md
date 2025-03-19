# Hardhat Token DApp

This is a **Hardhat-based** project that includes a simple **ERC-20-like token contract**, a **test suite**, and a **deployment script**. The project also demonstrates how to interact with the deployed smart contract using **React.js** and **Ethers.js**.

---

## 🚀 Project Overview

- Smart contract development using **Solidity**.
- **Hardhat** for testing and deploying the smart contract.
- **React.js** for frontend interaction.
- **Ethers.js** for Web3 integration.

---

## 🛠 Prerequisites

Ensure you have the following installed:

- **Node.js** (v16 or later recommended) ➝ [Download Here](https://nodejs.org/)
- **Hardhat** (for smart contract development)
- **MetaMask** (for Web3 interaction) ➝ [Download Here](https://metamask.io/)

To install Hardhat, run:
```bash
npm install --save-dev hardhat
```

---

## 📌 Setting Up the Project

1. **Clone the Repository**
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

2. **Install Dependencies**
```bash
npm install
```

3. **Initialize Hardhat** (if not already set up)
```bash
npx hardhat
```
- Select `Create a basic sample project` and follow the instructions.

---

## 📜 Writing the Smart Contract

### Token.sol (Smart Contract)
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Token {
    string public name = "Hardhat Token";
    string public symbol = "HHT";
    uint public totalSupply = 1000;

    address public owner;
    mapping(address => uint) balances;

    constructor() {
        owner = msg.sender;
        balances[owner] = totalSupply;
    }

    function transfer(address to, uint amount) external {
        require(balances[msg.sender] >= amount, "Not enough tokens!");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function balanceOf(address account) public view returns (uint) {
        return balances[account];
    }
}
```

---

## 🧪 Writing Tests

### Why Use `ethers.getContractFactory()`, `getSigner()`, and `deploy()`?

- **`ethers.getContractFactory("Token")`** ➝ Loads the smart contract.
- **`getSigner()`** ➝ Gets the Ethereum address to interact with the contract.
- **`deploy()`** ➝ Deploys the contract on a blockchain network.

### Token.test.js (Hardhat Testing)
```javascript
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token Contract", function () {
    let Token, token, owner, addr1, addr2;

    beforeEach(async function () {
        Token = await ethers.getContractFactory("Token");
        [owner, addr1, addr2] = await ethers.getSigners();
        token = await Token.deploy();
    });

    it("Should assign total supply to owner", async function () {
        expect(await token.balanceOf(owner.address)).to.equal(1000);
    });

    it("Should transfer tokens between accounts", async function () {
        await token.transfer(addr1.address, 100);
        expect(await token.balanceOf(addr1.address)).to.equal(100);
    });
});
```

**Run Tests:**
```bash
npx hardhat test
```

---

## 🚀 Deploying the Smart Contract

### Writing a Deployment Script

Create `scripts/deploy.js`:
```javascript
const hre = require("hardhat");

async function main() {
    const Token = await hre.ethers.getContractFactory("Token");
    const token = await Token.deploy();
    await token.deployed();
    console.log("Token deployed to:", token.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
```

### Deploying to Hardhat Local Network
```bash
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
```

### Deploying to a Testnet (Goerli, Sepolia, etc.)
```bash
npx hardhat run scripts/deploy.js --network goerli
```

---

## 🌐 Connecting Smart Contract to React.js Frontend

### Install Dependencies
```bash
npm install ethers
```

### Using Ethers.js to Interact with Contract
```javascript
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import contractABI from "./abi/Token.json";

const contractAddress = "0xYourDeployedContractAddress";

function App() {
    const [account, setAccount] = useState("");
    const [balance, setBalance] = useState("0");
    const [contract, setContract] = useState(null);

    useEffect(() => {
        connectWallet();
    }, []);

    const connectWallet = async () => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const accounts = await provider.send("eth_requestAccounts", []);
            setAccount(accounts[0]);

            const contractInstance = new ethers.Contract(
                contractAddress,
                contractABI.abi,
                signer
            );
            setContract(contractInstance);
        } else {
            alert("MetaMask not detected");
        }
    };

    const getBalance = async () => {
        if (!contract || !account) return;
        const bal = await contract.balanceOf(account);
        setBalance(ethers.utils.formatUnits(bal, 0));
    };

    return (
        <div>
            <h2>Token DApp</h2>
            <p>Wallet: {account}</p>
            <p>Balance: {balance}</p>
            <button onClick={getBalance}>Check Balance</button>
        </div>
    );
}

export default App;
```

---

## 🎯 Summary: Steps to Run the DApp

1. **Start Hardhat Local Network**:
```bash
npx hardhat node
```

2. **Deploy the Contract**:
```bash
npx hardhat run scripts/deploy.js --network localhost
```

3. **Start the React App**:
```bash
npm start
```

4. **Connect Wallet & Interact with the Contract**

---

## 📌 Conclusion

This project is a beginner-friendly guide to using **Hardhat, Solidity, and React.js** to build a blockchain DApp. It covers **smart contract development, testing, deployment, and frontend integration using Ethers.js**.

Happy Coding! 🚀

