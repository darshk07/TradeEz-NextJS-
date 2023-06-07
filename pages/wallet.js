import { useEffect, useState } from "react";
import style from "../styles/Wallet.module.css"
import { ethers } from 'ethers';
import Sidenav from "@/Components/sidenav";
import Image from "next/image";
require('dotenv').config({ path: '/../.env' });
import Web3 from 'web3';
var Common = require('ethereumjs-common').default;
const Tx = require('ethereumjs-tx').Transaction
import Spline from '@splinetool/react-spline';

function Wallet() {

    let [account, setAccount] = useState("");
    let [contractData, setContractData] = useState("");
    const Address = "0x64889199D4761C63770b42126216637479C1d3A8";

    const ABI = [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "addressToAmountFund",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                }
            ],
            "name": "allowance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "blockReward",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "burn",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "burnFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "cap",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "decimals",
            "outputs": [
                {
                    "internalType": "uint8",
                    "name": "",
                    "type": "uint8"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "subtractedValue",
                    "type": "uint256"
                }
            ],
            "name": "decreaseAllowance",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                }
            ],
            "name": "fund",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "addedValue",
                    "type": "uint256"
                }
            ],
            "name": "increaseAllowance",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address payable",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "reward",
                    "type": "uint256"
                }
            ],
            "name": "setBlockReward",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
    const web3 = new Web3(new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545'));
    let contract = new web3.eth.Contract(ABI, Address);
    const data = contract.methods.transferFrom("0x7dED75f5F06b0318Bc6Baf1E3B23f0363B2b399F", "0xB3Ce4192E7F86f03adE237998457a278D9407F91", 10).encodeABI();

    const connectMetamask = async () => {
        if (window.ethereum !== "undefined") {
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            setAccount(accounts[0]);
        }
    }
    const connectContract = async () => {
        console.log(contract._address);
    }
    const getData = async () => {
    
        // const res = await contract.methods.transferFrom("0x7dED75f5F06b0318Bc6Baf1E3B23f0363B2b399F", "0xB3Ce4192E7F86f03adE237998457a278D9407F91", 005).call();
        const transaction = {
            "from": "0x7dED75f5F06b0318Bc6Baf1E3B23f0363B2b399F",
            "nonce": web3.utils.toHex(1),
            "gasPrice": "0x04e3b29200",
            "gasLimit": "0x7458",
            "to": Address,
            "value": "0x0",
            "data": data,
            "chainId": 0x03
        };
        const signTrx = await web3.eth.accounts.signTransaction(transaction, process.env.PRIVATE_KEY);
        web3.eth.sendSignedTransaction(signTrx.rawTransaction, function (error, hash) {
            if (error) {
                console.log(error);
            }
            else {
                console.log("Transaction submitted");
                window.alert('Alert ' + hash)
            }
        })
        // var transaction = new Tx(rawTransaction, { 'common': BSC_FORK });
        // transaction.
        // transaction.sign(process.env.PRIVATE_KEY);
        // var serializedTx = transaction.serialize();

        // web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
        //     if (!err)
        //         console.log(hash);
        //     else
        //         console.log(err);
        // });
        
    }
    const changeData = async () => {
        return;
    }
    useEffect(() => {
        connectMetamask();
    }, [])

    const clickHandler = e => {
        e.preventDefault();
    }
    return (
        <div className={style.wrapper}>
            <Sidenav />
            
            <div className={style.content}>
                <div className={style.topbar}>
                    {account ? <>
                        <div className={style.username}>{account}</div>
                        <div className={style.userpic}><Image src='/user2.png' width={60} height={60} /></div>
                    </> : <button className={style.Metamask} onClick={connectMetamask}>Connect to MetaMask</button>}
                </div>
                {/* <div className={style.body}>
                    <button className={style.button} onClick={connectContract}>Connect to Contract</button>
                    {/* <button className={style.button} onClick={changeData}>CHANGE DATA</button> */}
                    {/* <button className={style.button} onClick={getData}>Read From Contract</button> */}
                    {/* <p>{contractData}</p> */}
                {/*  */}
                <div className={style.heading}>Transfer tokens</div>
                <div className={style.payments}>
                    <input type="text" className={style.inputID} placeholder='Enter User ID' />
                    <input type="number" className={style.inputamount} placeholder='Enter Amount' />
                    <button onClick={clickHandler} className={style.pay}>Pay</button>
                </div>
            </div>
        </div>
    );
}
export default Wallet;