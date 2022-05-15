import { React, useRef, useState, useEffect } from "react";
import axios from './axios';
import Web3 from "web3";

import './submit.css'
import {  Link } from "react-router-dom";
const TITLE_REGEX = /^[A-z][A-z0-9- ]{2,32}$/;
const IPFS_REGEX = /^Qm[1-9A-HJ-NP-Za-km-z]{44,}|b[A-Za-z2-7]{58,}|B[A-Z2-7]{58,}|z[1-9A-HJ-NP-Za-km-z]{48,}|F[0-9A-F]{50,}$/;
const DESCRIPTION_REGEX = /^[A-z][A-z0-9- ]{2,99}$/;
const Submit = () => {
  const [wallet, setWallet, setHandle] = useState();
  const handleSubmitProxy= async() => {
    if(!window.ethereum){setErrMsg("Please install Metamask."); console.log("Window.ethereum error")}
    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
    window.accounts = accounts;
  const addy = accounts[0][0] + accounts[0][1] + accounts[0][2]+ + accounts[0][3]+accounts[0][4]+accounts[0][5]+"..."+accounts[0][38]+accounts[0][39]+accounts[0][40]+accounts[0][41];
  setErrMsg(addy +" " + title + " Submitting....");
  setHandle(handleSubmit());
}
    const userRef = useRef();
    const errRef = useRef();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [validTitle, setValidTitle] = useState(false);
	  const [ipfs, setIpfs] = useState('');
    const [validIpfs, setValidIpfs] = useState(false);
    const [royalty, setRoyalty] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    
    useEffect(() => {
        setValidTitle(TITLE_REGEX.test(title));
    }, [title])
	useEffect(() => {
        setValidIpfs(IPFS_REGEX.test(ipfs));
    }, [ipfs])
    useEffect(() => {
        setErrMsg('');
    }, [title, ipfs])

    const handleSubmit = async () => {
      console.log(wallet);
      // if button enabled with JS hack
      const v1 = TITLE_REGEX.test(title);
      const v2 = IPFS_REGEX.test(ipfs);
      const v3 = !(parseInt(royalty) > 40 || parseInt(royalty) <= 0);
      const v4 = DESCRIPTION_REGEX.test(description);

      if (!v1) {
          setErrMsg("Title must begin with a letter, and be at least 3 characters, and up to 40. Numbers, spaces, and hyphens are allowed.");
          return;
      }
  else if (!v2) {
          setErrMsg("Invalid IPFS CID. Please provide only the part after the 'ipfs://'");
          return;
      }
      else if (!v3) {
        setErrMsg("Royalty percentage must be between 1 and 40.");
        return;
    }
    else if (!v4) {
      setErrMsg("Description must begin with a letter, and be at least 3 characters, and up to 100. Numbers, spaces, and hyphens are allowed.");
      return;
  }
  console.log(sessionStorage.getItem("designSubmission"));
      const reg = window.accounts[0] + "§" + title + "§" + description + "§" + ipfs + "§" + royalty + "§"  + "1";
      const rex = JSON.stringify(reg);
      try {
          const response = await axios.post('http://localhost:3500/submit',
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
      } catch (err) {
          if (!err?.response) {
              setErrMsg('Server not responding. Please try again.');
          } else if (err.response?.status === 409) {
              setErrMsg('Title taken.');
    }
      else if (err.response?.status === 410) {
              setErrMsg('Ipfs CID already in use.');
          }
          else if (err.response?.status === 411) {
            setErrMsg('Please sign in.');
        }
           else {
              setErrMsg('Error Z')
      console.log(err)
          }
          errRef.current.focus();
      }
  }


    return(
    <>{success ?(<div>
      <div id ="spacer"></div>
          <h1> Submission Successful! </h1>
          <p1 id ="t">Be sure to tell everyone to vote for your design!</p1>
          <div id ="spacer"></div>

    </div>) : ( <>
            <div >
            <div id ="spacer2"></div>
        <h1> Submit your art </h1>
        <p1 id ="t">Receive royalty, publicity, and glory.</p1>
        <div id = "linkspecs">
        <p id = "sex">See our submission standards  </p>
          <Link to='Guidelines'>
          <span id = "l"> here. </span>
         </Link>
         </div>
        </div>
        <div id = "linkspecs"><p id = "sex">{errMsg} </p></div>
        <form id = "form" autoComplete="off" method="POST" class="showForm">
          <br />
          <input 
          placeholder="Title of your work:" 
          id = "in" 
          type="text" 
          name="designTitle"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
          ></input>
          <br />
          <input 
          placeholder="Short Description:" 
          id = "in" 
          type="text" 
          name="designTitle"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          required
          ></input>
          <br />
          
          <input
           placeholder="Royalty % (1-40):" 
           id = "in" 
           type="number" 
           min="1" 
           max="40" 
           name="designTitle"
           onChange={(e) => setRoyalty(e.target.value)}
          value={royalty}
          required 
           ></input>
          <br />
          </form>
          <div id="submissionDisplayedInPageDiv">    
                  <img onLoad = { () => setIpfs(sessionStorage.getItem("designSubmission"))} id = "submissionDisplayedInSubmitPage" src = { "https://ipfs.io/ipfs/" + sessionStorage.getItem("designSubmission")}></img>
          </div>
          <button id = "ni" onClick={() => handleSubmitProxy()}>Submit</button>
           </>
    )}
        </>
        )};
export default Submit