const { expect } = require("chai");

describe("Token contract", function () {
  let Token;
  let hardhatToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;
  beforeEach(async function () {
    Token = await ethers.getContractFactory("Token");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    hardhatToken = await Token.deploy();
  });
  describe("Deployment", function () {
    it("Should set the right owner", async () => {
      expect(await hardhatToken.owner()).to.equal(owner.address);
    });
    it("Should assign total supply of tokens to the owner", async () => {
      const ownerBalance = await hardhatToken.balanceOf(owner.address);
      expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
  });
  describe("Transactions", async function () {
    it("Should transfer tokens between accounts", async () => {
      await hardhatToken.transfer(addr1.address, 10);
      const addr1Balance = await hardhatToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(10);

      await hardhatToken.connect(addr1).transfer(addr2.address, 10);
      const addr2Balance = await hardhatToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(10);
    });
    it("Should fail if sender does not have enough tokens", async () => {
      const initialOwnerBal = await hardhatToken.balanceOf(owner.address);
      await expect(
        hardhatToken.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWith("Not enough tokens!");
      expect(await hardhatToken.balanceOf(owner.address)).to.equal(
        initialOwnerBal
      );
    });
    it("Should update the balance after transfer", async () => {
      const initialBalance = await hardhatToken.balanceOf(owner.address);
      await hardhatToken.transfer(addr1.address, 5);
      await hardhatToken.transfer(addr2.address, 10);
      const finalBalance = await hardhatToken.balanceOf(owner.address)
      expect(finalBalance).to.equal(initialBalance-15);
      
      const addr1Balance = await hardhatToken.balanceOf(addr1.address)
      expect(addr1Balance).to.equal(5)
      const addr2Balance = await hardhatToken.balanceOf(addr2.address)
      expect(addr2Balance).to.equal(10)
    })
  });
});

// describe("Token contract", function () {
//   it("Deployement should assign the total supply of token to the owner",async function () {
//     const [owner] = await ethers.getSigners(); //Returns all owner information

//     const Token = await ethers.getContractFactory("Token"); //creating instance of contract
//     console.log(Token);
//     const hardhatToken = await Token.deploy(); //Deploy contract

//     const ownerBalance = await hardhatToken.balanceOf(owner.address); // getting owner balance

//     expect(await hardhatToken.totalSupply()).to.equal(ownerBalance); // ownerBalance === 10000, pass or fail
//   });
//   it("Should transfet tocken between accounts", async function(){
//     const [owner, addr1, addr2] = await ethers.getSigners();

//     const Token = await ethers.getContractFactory("Token");
//     const hardhatToken = await Token.deploy();

//     await hardhatToken.transfer(addr1.address, 10);
//     expect(await hardhatToken.balanceOf(addr1.address)).to.equal(10);

//     await hardhatToken.connect(addr1).transfer(addr2.address, 5);
//     expect(await hardhatToken.balanceOf(addr2.address)).to.equal(5);
//   });
// });
