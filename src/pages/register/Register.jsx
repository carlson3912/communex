import React from 'react';
import {useState, useRef,useEffect} from 'react';
import axios from './axios';

import './register.css'
import {Link} from 'react-router-dom'
import Image from '../../assets/Image.png'
import Web3 from "web3";

const USER_REGEX = /^[A-z][A-z0-9-_]{1,32}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const Register = () => {
  const [address, setAddress] = useState("");
  const [connected,setConnected] = useState("Connect Metamask");
  const [wallet, setWallet] = useState("undefined");
  async function getAccount(){
    if(!window.ethereum){setConnected("Please install Metamask"); console.log("Window.ethereum error")}
    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
    window.accounts = accounts;
    setWallet(window.accounts);
    window.web3 = new Web3(window.ethereum)
          const addy = accounts[0][0] + accounts[0][1] + accounts[0][2]+ + accounts[0][3]+accounts[0][4]+accounts[0][5]+"..."+accounts[0][38]+accounts[0][39]+accounts[0][40]+accounts[0][41];
        setAddress(addy);
  setConnected("Connected  to " + addy);
    }
    const userRef = useRef();
    const errRef = useRef();
    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);
	  const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])
    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])
	useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])
    useEffect(() => {
        setErrMsg('');
    }, [user, email])
    const handleSubmit = async () => {
      // if button enabled with JS hack
      const v1 = USER_REGEX.test(user);
      const v2 = EMAIL_REGEX.test(email);
      const v3 = wallet == "undefined";
      if (!v1) {
          setErrMsg("Username must begin with a letter. Letters, numbers, underscores, and hyphens are allowed.");
          return;
      }
  if (!v2) {
          setErrMsg("Invalid Email");
          return;
      }
      if (v3) {
        setErrMsg("Must connect to Metamask");
        setConnected("Please install Metamask");
        return;
    }
      const reg = user + "," + email + "," + wallet;
      const rex = JSON.stringify(reg);
      try {
          const response = await axios.post('/register',
              JSON.stringify(reg),
              JSON.stringify({
                headers: { 'Content-Type': 'application/json'},
                  withCredentials: true
              })
            );
          console.log(response?.data); //remove
          console.log(response?.accessToken);
          console.log(JSON.stringify(response)) //remove
          setSuccess(true);
          setUser('');
          setEmail('');
      } catch (err) {
          if (!err?.response) {
              setErrMsg('Server not responding. Please try again.');
          } else if (err.response?.status === 409) {
              setErrMsg('Username Taken');
    }
      else if (err.response?.status === 410) {
              setErrMsg('Email already in use');
          }
      else if (err.response?.status === 411) {
              setErrMsg('Wallet already in use');
          }
      
           else {
              setErrMsg('Error Z')
      console.log(err)
          }
          errRef.current.focus();
      }
  }
  return (
    <div className='register section__padding'>
      <div className="register-container">
        <h1>register</h1>
        {success ? (<div><p id = "successReg">Registration Successful</p><p id = "successReg">Welcome to the SRS community!</p></div>):(<>
        <form className='register-writeForm' autoComplete='off' method="POST" action="#" >
          <div className="register-formGroup">
            <input
            placeholder="Username"
            type="text"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
            />
          </div>
          <div className="register-formGroup">
            <input
            placeholder='Email' 
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            aria-describedby="pwdnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}/>
          </div>
          </form>
          <div className="register-formGroup">
            <button className='reg-login-writeButton' onClick = {() => getAccount()}>{connected}</button>
          </div>
         <div className="register-button">
          <button className='register-writeButton' onClick = {() => handleSubmit()}>Create Account</button>
         </div>
         <p id = "error" ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
</>)}
      </div>
    </div>
   )
};
export default Register;
