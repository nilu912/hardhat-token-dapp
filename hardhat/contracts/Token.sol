// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

// import "hardhat/console.sol";

contract Token {
    string public name="HardHat Toeken";
    string public symbol="HHT";
    uint public totalSupply=1000;

    address public owner;
    mapping (address => uint) balance;
    constructor() {
        owner = msg.sender;
        balance[owner] = totalSupply;
    }
    function transfer(address to, uint amount) external {
        // console.log("Sender balance is %s", balance[msg.sender]);
        // console.log("Sender is sending %s tokens to %s address", amount, to)
        require(balance[msg.sender]>=amount, "Not enough tokens!");
        balance[msg.sender]-=amount;
        balance[to]+=amount;
    }
    function balanceOf(address account) public view returns(uint){
        return balance[account];
    }
}