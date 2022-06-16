import React, { useState, useContext, useEffect } from "react"
import './Css.css';
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import { stackAbi, stackAddress, rewardAbi, rewardTokenAddress } from "../utils/constant";
import { ethers } from "ethers";

const { ethereum } = window;

const Welcome = () => {
    const { connectWallet, account, form, sendTransaction, handleChange } = useContext(TransactionContext);

    const [stackValue, setStackValue] = useState("");

    const [balance, setBalance] = useState("0");
    const [rtBalance, setRtBalance] = useState("0");
    const [stackAmount, setStackAmount] = useState("0");
    const [earnedAmount, setEarnedAmount] = useState("0");

    const createStackContract = () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()

        const transactionsContract = new ethers.Contract(stackAddress, stackAbi, signer);

        return transactionsContract;
    }

    const createRtContract = () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()

        const RtContract = new ethers.Contract(rewardTokenAddress, rewardAbi, signer);

        return RtContract;
    }


    const findamount = async () => {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const bal = await provider.getBalance(account);

        setBalance(bal.toString());
        const StackContract = createStackContract();

        const rtBalanceContract = createRtContract();

        const rtBal = await rtBalanceContract.balanceOf(account);

        setRtBalance(ethers.utils.formatUnits(rtBal.toString(), "ether"));

        const stacked = await StackContract.getStaked(account);

        setStackAmount(ethers.utils.formatUnits(stacked.toString(), "ether"));

        const earned = await StackContract.s_rewards(account);
        setEarnedAmount(ethers.utils.formatUnits(earned.toString(), "ether"));
    }

    const changeStack = (e) => {
        e.preventDefault();
        const val = e.target.value;
        setStackValue(val);
    }

    const stackButton = async () => {
        const rtContract = createRtContract();
        const StackContract = createStackContract();

        const stackedValue = ethers.utils.formatUnits(stackValue.toString(), "ether");

        const rtSuccess = await (await rtContract.approve(stackAddress, stackValue)).wait();
        if (!rtSuccess) {
            alert("Approval Failed due to some reason");
        }
        const success = await (await StackContract.stack(stackValue)).wait();

        if (!success) {
            alert("Transaction Failed due to some reason");
            return;
        }
        else {
            console.log("success");
            findamount();
        }
    }

    const onSubmit = (e) => {
        const { addressTo, amount, keyword, message } = form;

        e.preventDefault();

        sendTransaction();
    }

    useEffect(() => {
        if(account){
            
            findamount();
        }
        
    }, [account, stackAmount, earnedAmount]);
    return (
        <div>
            <div className='welcome' >
                <div className="flex">
                    <div className="written">
                        <div className='heading'>
                            <h1>Send Crypto</h1>
                            <h1>across the world</h1>
                        </div>
                        <div>
                            <p className=''>Explore the world of Crypto with us</p>
                            <p style={{color:"green"}}>Stake your money easily on Krypto.</p>
                        </div>

                        {account ?
                            (
                                <div>
                                    <p>Total balance this account has: {balance}</p>
                                    <p>Total Reward Token this account has: {rtBalance}</p>
                                    <p>Stack amount this account staked: {stackAmount}</p>
                                    <p>Earned profit this account earned: {earnedAmount}</p>

                                    <input type="number" name="Stacking Amount" value={stackValue} onChange={changeStack} placeholder='Enter amount to Stack' />

                                    <button className='btn' onClick={stackButton}>Stack</button>

                                </div>
                            ) :
                            (
                                <button className='btn btn-wallet' onClick={connectWallet}>
                                    Connect to Wallet
                                </button>
                            )

                        }


                        <div className="grid-container">
                            <div className="grid-item">Relability</div>
                            <div className="grid-item">Security</div>
                            <div className="grid-item">Ethereum</div>
                            <div className="grid-item">Web3.0</div>
                            <div className="grid-item">Low fees</div>
                            <div className="grid-item">Blockchain</div>

                        </div>
                    </div>
                    <div className="account">
                        <div className='test'>
                            <div>
                                <div className="color rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
                                    <div className='flex-eth'>
                                        <SiEthereum fontSize={21} color="#fff" />
                                        <BsInfoCircle fontSize={17} color="#fff" />
                                    </div>
                                    <div>
                                        <p>{shortenAddress(account)}</p>
                                        <p>Ethereum</p>
                                    </div>
                                </div>
                                <div className="inputs sm:w-96 blue-glassmorphism">
                                    <input placeholder="Address To" name="addressTo" type="text"
                                        value={form.addressTo} onChange={handleChange} />
                                    <input placeholder="Amount (ETH)" name="amount" type="number" value={form.amount} onChange={handleChange} />
                                    <input placeholder="Keyword (Gif)" name="keyword" type="text" value={form.keyword} onChange={handleChange} />
                                    <input placeholder="Enter Message" name="message" type="text" value={form.message} onChange={handleChange} />
                                    <button className='btn' onClick={onSubmit}>Send Now</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div >
    )
}

export default Welcome;