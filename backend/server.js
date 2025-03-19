const express = require('express')
const cors = require('cors')
const {ether} = require('ether')

const app = express()
app.use(cors())
app.use(express.json())


const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
const contractABI = require("./VotingABI.json"); // Exported ABI from Hardhat

app.get('/', (req, res, next) => {
    res.send("Hello world")
})
app.get("/candidates", async (req, res) => {
    const candidates = [];
    for (let i = 0; i < 2; i++) {
        const candidate = await votingContract.candidates(i);
        candidates.push({ name: candidate.name, votes: Number(candidate.voteCount) });
    }
    res.json(candidates);
});

app.post("/vote", async (req, res) => {
    const { candidateId, walletAddress, privateKey } = req.body;
    
    const wallet = new ethers.Wallet(privateKey, provider);
    const contractWithSigner = votingContract.connect(wallet);

    try {
        const tx = await contractWithSigner.vote(candidateId);
        await tx.wait();
        res.json({ success: true, message: "Vote cast successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.listen(5000, ()=>{console.log("Server is running on 5000!")})