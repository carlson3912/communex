import React from 'react';
import {useState} from 'react';

import './register.css'
import {Link} from 'react-router-dom'
import Image from '../../assets/Image.png'
import Web3 from "web3";





const Register = () => {
  const [address, setAddress] = useState("");
  const [connected,setConnected] = useState("Connect Metamask");

  async function handleLogin(){
    
    if(!window.ethereum){console.log("Window.ethereum error")}
    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
    window.accounts = accounts
    window.web3 = new Web3(window.ethereum)
          const addy = accounts[0][0] + accounts[0][1] + accounts[0][2]+ + accounts[0][3]+accounts[0][4]+accounts[0][5]+"..."+accounts[0][38]+accounts[0][39]+accounts[0][40]+accounts[0][41];
        setAddress(addy);
  setConnected("Connected  to " + addy);
    }
  async function handleNewAccount(){
    console.log(address);
  }
  return (
    <div className='register section__padding'>
      <div className="register-container">
        <h1>register</h1>
        <form className='register-writeForm' autoComplete='off' >
          <div className="register-formGroup">
            <input type="text" placeholder='Username'  />
          </div>
          <div className="register-formGroup">
            <input type="email" placeholder='Email' />
          </div>
          </form>
          <div className="register-formGroup">
            <button className='reg-login-writeButton' onClick = {() => handleLogin()}>{connected}</button>
          </div>
         <div className="register-button">
          <button className='register-writeButton' onClick = {() => handleNewAccount()}>Create Account</button>
         </div>
      </div>
    </div>
   )
};
export default Register;
