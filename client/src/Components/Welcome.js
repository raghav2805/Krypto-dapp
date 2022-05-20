import React, {useState, useContext, useEffect} from "react"
import './Css.css';
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { TransactionContext  } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";

const Welcome = () => {
    const {connectWallet, account,form, sendTransaction, handleChange} = useContext(TransactionContext );

    const onSubmit = (e) =>{
        const {addressTo, amount, keyword, message}= form;

        e.preventDefault();

        sendTransaction();
    }
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
                            <p>Buy and sell cryptocurrencies easily on Krypto.</p>
                        </div>
                        {!account && <button className='btn btn-wallet' onClick={connectWallet}>
                        Connect to Wallet
                        </button>
                        }

                        <div class="grid-container">
                            <div class="grid-item">Relability</div>
                            <div class="grid-item">Security</div>
                            <div class="grid-item">Ethereum</div>
                            <div class="grid-item">Web3.0</div>
                            <div class="grid-item">Low fees</div>
                            <div class="grid-item">Blockchain</div>

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
                                <input  placeholder="Address To" name="addressTo" type="text"
                                value={form.addressTo}   onChange = {handleChange} />
                                <input  placeholder="Amount (ETH)" name="amount" type="number" value={form.amount} onChange = {handleChange} />
                                <input  placeholder="Keyword (Gif)" name="keyword" type="text"  value={form.keyword} onChange = {handleChange} />
                                <input  placeholder="Enter Message" name="message" type="text"  value={form.message} onChange = {handleChange} />
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