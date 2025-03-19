import { ethers } from "ethers";
import { getBalance } from "../utils/contract";
import React, { useEffect, useState } from 'react'

const TokenBalance = ({account}) => {
    const [balance, setBalance] = useState('0');
    useEffect(()=>{
        if(account)
            getBalance(account).then(setBalance);
    },[account])
    return (
    <div>
        <p>Balance: {balance} HHT</p>
    </div>
  )
}

export default TokenBalance