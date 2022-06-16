import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

import { contractAddress, contractABI } from "../utils/constant";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

  return transactionsContract;
}

export const TransactionProvider = ({ children }) => {

  const [account, setAccount] = useState("");
  const [form, setForm] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: ""
  });

  const [transactions, setTransactions] = useState([]);
  const [reload, setReload] = useState(false);

  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));

  const handleChange = (e) => {
    setForm(prevForm => ({ ...prevForm, [e.target.name]: e.target.value }));
  }

  useEffect(() => {
    setReload(false);
  }, [reload])

  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const availableTransactions = await transactionsContract.getAllTransactions();

        const structuredTransactions = availableTransactions.map((transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amount: parseInt(transaction.amount._hex) / (10 ** 18)
        }));

        setTransactions(structuredTransactions);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) alert("Install metamask");
      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length) {
        setAccount(accounts[0]);
      }
      else {
        console.error("No accounts found");
      }
    } catch (error) {
      console.error(error);

      throw new Error("No ethereum object");
    }
  }

  const checkIfTransactionsExists = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const currentTransactionCount = await transactionsContract.getTransactionCount();

        window.localStorage.setItem("transactionCount", currentTransactionCount);
        transactionsContract.getAllTransactions()
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) alert("Install metamask");

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

      setAccount(accounts[0]);
    } catch (error) {
      console.error(error);

      throw new Error("No ethereum object");
    }
  }

  const sendTransaction = async () => {
    try {
      if (!ethereum) alert("Install metamask");
      const { addressTo, amount, keyword, message } = form;

      const transactionContract = createEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [{
          from: account,
          to: addressTo,
          gas: "0x5208",
          value: parsedAmount._hex,
        }],
      });

      const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

      await transactionHash.wait();

      const transactionsCount = await transactionContract.getTransactionCount();

      setTransactionCount(transactionsCount.toNumber());


    }
    catch (error) {
      console.error(error);

      throw new Error("No ethereum object");
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfTransactionsExists();
    getAllTransactions();
  }, [transactionCount]);

  return (
    <TransactionContext.Provider value={{ connectWallet, account, form, sendTransaction, handleChange, transactions }}>
      {children}
    </TransactionContext.Provider>
  )
}

