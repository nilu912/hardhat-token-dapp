import { ethers } from "ethers";
import { transferTokens } from "../utils/contract";
import React, { useState } from "react";

const TransferToken = (account, updateBalance) => {
  const [formData, setFormData] = useState({
    recipient: "",
    tokenAm: "",
  });
  const onChangeHandller = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleTransfer = async (e) => {
    e.preventDefault();
    if (!formData.recipient || !formData.tokenAm) {
      alert("Enter Recipient and Token amount!");
      return;
    }
    try{
        await transferTokens(formData.recipient, formData.tokenAm);
        alert("Transfer Successfull!");
        // updateBalance();
    }catch(error){
        console.error(error);
        alert("Transfer Faild!");
    }
  };
  return (
    <div>
      <form onSubmit={handleTransfer}>
        <p>Enter recipient address:</p>
        <input
          type="text"
          name="recipient"
          onChange={onChangeHandller}
          placeholder="enter address"
        />
        <p>Enter Token Amount</p>
        <input
          type="number"
          name="tokenAm"
          onChange={onChangeHandller}
          placeholder="enter Token value"
        />
        <button>Send Token</button>
      </form>
    </div>
  );
};

export default TransferToken;
