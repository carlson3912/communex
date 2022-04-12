import React,{ useState} from 'react'
import './navbar.css'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import seller1 from '../../assets/seller1.png'
import {  Link } from "react-router-dom";
import Web3 from "web3";

const Menu = () => (
  <>
     <Link to="/"><p>Explore</p> </Link>
     <p>My Items</p>
     <Link to ="About"><p>About us</p></Link>
     
    
  </>
 )

 const Navbar = () => {
  const [toggleMenu,setToggleMenu] = useState(false)
   const [user,setUser] = useState(false)
   const [userAddress, setUserAddress] = useState(null)
   const [userID, setUserID] = useState("Connect Wallet")

  const handleLogout = () => {
    setUser(false);
  }
  const handleLogin = () => {
    setUser(true);
  }

  //const NFTabi = require('./nft.json')
  
  async function metamaskLogin(){
    console.log("Login started")
    if(!window.ethereum){console.log("Window.ethereum error")}
    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
    console.log(accounts)
    setUserAddress(accounts[0])
    window.accounts = accounts
    setUserID(accounts[0][0] + accounts[0][1] + accounts[0][2]+ + accounts[0][3]+accounts[0][4]+accounts[0][5]+"..."+accounts[0][38]+accounts[0][39]+accounts[0][40]+accounts[0][41])
    // setUserID(userAddress.slice(0,6) +'...'+userAddress.slice(38,41))
    window.web3 = new Web3(window.ethereum)
   
    // console.log(result)
  //     })
   }

  // async function buyNFT(){
  //   var Contract = require('web3-eth-contract');
    
  //   const abi =  [
  //     {
  //       "inputs": [],
  //       "stateMutability": "nonpayable",
  //       "type": "constructor"
  //     },
  //     {
  //       "anonymous": false,
  //       "inputs": [
  //         {
  //           "indexed": true,
  //           "internalType": "address",
  //           "name": "owner",
  //           "type": "address"
  //         },
  //         {
  //           "indexed": true,
  //           "internalType": "address",
  //           "name": "approved",
  //           "type": "address"
  //         },
  //         {
  //           "indexed": true,
  //           "internalType": "uint256",
  //           "name": "tokenId",
  //           "type": "uint256"
  //         }
  //       ],
  //       "name": "Approval",
  //       "type": "event"
  //     },
  //     {
  //       "anonymous": false,
  //       "inputs": [
  //         {
  //           "indexed": true,
  //           "internalType": "address",
  //           "name": "owner",
  //           "type": "address"
  //         },
  //         {
  //           "indexed": true,
  //           "internalType": "address",
  //           "name": "operator",
  //           "type": "address"
  //         },
  //         {
  //           "indexed": false,
  //           "internalType": "bool",
  //           "name": "approved",
  //           "type": "bool"
  //         }
  //       ],
  //       "name": "ApprovalForAll",
  //       "type": "event"
  //     },
  //     {
  //       "anonymous": false,
  //       "inputs": [
  //         {
  //           "indexed": true,
  //           "internalType": "address",
  //           "name": "from",
  //           "type": "address"
  //         },
  //         {
  //           "indexed": true,
  //           "internalType": "address",
  //           "name": "to",
  //           "type": "address"
  //         },
  //         {
  //           "indexed": true,
  //           "internalType": "uint256",
  //           "name": "tokenId",
  //           "type": "uint256"
  //         }
  //       ],
  //       "name": "Transfer",
  //       "type": "event"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "to",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "uint256",
  //           "name": "tokenId",
  //           "type": "uint256"
  //         }
  //       ],
  //       "name": "approve",
  //       "outputs": [],
  //       "stateMutability": "nonpayable",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "owner",
  //           "type": "address"
  //         }
  //       ],
  //       "name": "balanceOf",
  //       "outputs": [
  //         {
  //           "internalType": "uint256",
  //           "name": "",
  //           "type": "uint256"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function",
  //       "constant": true
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "uint256",
  //           "name": "tokenId",
  //           "type": "uint256"
  //         }
  //       ],
  //       "name": "getApproved",
  //       "outputs": [
  //         {
  //           "internalType": "address",
  //           "name": "",
  //           "type": "address"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function",
  //       "constant": true
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "owner",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "address",
  //           "name": "operator",
  //           "type": "address"
  //         }
  //       ],
  //       "name": "isApprovedForAll",
  //       "outputs": [
  //         {
  //           "internalType": "bool",
  //           "name": "",
  //           "type": "bool"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function",
  //       "constant": true
  //     },
  //     {
  //       "inputs": [],
  //       "name": "name",
  //       "outputs": [
  //         {
  //           "internalType": "string",
  //           "name": "",
  //           "type": "string"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function",
  //       "constant": true
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "uint256",
  //           "name": "tokenId",
  //           "type": "uint256"
  //         }
  //       ],
  //       "name": "ownerOf",
  //       "outputs": [
  //         {
  //           "internalType": "address",
  //           "name": "",
  //           "type": "address"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function",
  //       "constant": true
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "from",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "address",
  //           "name": "to",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "uint256",
  //           "name": "tokenId",
  //           "type": "uint256"
  //         }
  //       ],
  //       "name": "safeTransferFrom",
  //       "outputs": [],
  //       "stateMutability": "nonpayable",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "from",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "address",
  //           "name": "to",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "uint256",
  //           "name": "tokenId",
  //           "type": "uint256"
  //         },
  //         {
  //           "internalType": "bytes",
  //           "name": "_data",
  //           "type": "bytes"
  //         }
  //       ],
  //       "name": "safeTransferFrom",
  //       "outputs": [],
  //       "stateMutability": "nonpayable",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "operator",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "bool",
  //           "name": "approved",
  //           "type": "bool"
  //         }
  //       ],
  //       "name": "setApprovalForAll",
  //       "outputs": [],
  //       "stateMutability": "nonpayable",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "bytes4",
  //           "name": "interfaceId",
  //           "type": "bytes4"
  //         }
  //       ],
  //       "name": "supportsInterface",
  //       "outputs": [
  //         {
  //           "internalType": "bool",
  //           "name": "",
  //           "type": "bool"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function",
  //       "constant": true
  //     },
  //     {
  //       "inputs": [],
  //       "name": "symbol",
  //       "outputs": [
  //         {
  //           "internalType": "string",
  //           "name": "",
  //           "type": "string"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function",
  //       "constant": true
  //     },
  //     {
  //       "inputs": [],
  //       "name": "tokenCounter",
  //       "outputs": [
  //         {
  //           "internalType": "uint256",
  //           "name": "",
  //           "type": "uint256"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function",
  //       "constant": true
  //     },
  //     {
  //       "inputs": [],
  //       "name": "tokenURI",
  //       "outputs": [
  //         {
  //           "internalType": "string",
  //           "name": "",
  //           "type": "string"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function",
  //       "constant": true
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "uint256",
  //           "name": "tokenId",
  //           "type": "uint256"
  //         }
  //       ],
  //       "name": "tokenURI",
  //       "outputs": [
  //         {
  //           "internalType": "string",
  //           "name": "",
  //           "type": "string"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function",
  //       "constant": true
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "from",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "address",
  //           "name": "to",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "uint256",
  //           "name": "tokenId",
  //           "type": "uint256"
  //         }
  //       ],
  //       "name": "transferFrom",
  //       "outputs": [],
  //       "stateMutability": "nonpayable",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [],
  //       "name": "createCollectible",
  //       "outputs": [
  //         {
  //           "internalType": "uint256",
  //           "name": "",
  //           "type": "uint256"
  //         }
  //       ],
  //       "stateMutability": "nonpayable",
  //       "type": "function"
  //     }
  //   ]
            
  //   const inst = new window.web3.eth.Contract(abi, '0xE2687F6DfB3f330b8b4D2717dF2A3dC3E82531e1')
  //   inst.methods.createCollectible().send({from: userAddress}).on('receipt', function(){console.log("yuh")});
   
  // }

  return (
    <div className='navbar'>
      <div className="navbar-links">
        <div className="navbar-links_logo">
          <img src={seller1} alt="logo" />
          <Link to="/"> 
            <h1>Silk Road Swag</h1>
          </Link>
        </div>
        <div className="navbar-links_container">
          <input type="text" placeholder='Search Item Here' autoFocus={true} />
         <Menu />
         {user && <Link to="/"><p onClick={handleLogout}>Logout</p></Link> }
        
        </div>
      </div>
      <div className="navbar-sign">
      {user ? (
        <>
         <Link to="/create"> 
          <button type='button' className='primary-btn' >Create</button>
        </Link>
        <button type='button' className='secondary-btn'>Connect</button>
        </>
      ): (
        <>
        {/* <button>Temp</button> */}
        <Link to="/login"> 
         <button type='button' className='primary-btn' onClick={handleLogin} >Sign In</button>
        </Link>
        {/* <Link to="/register">  */}
          <button type='button' className='secondary-btn' onClick={metamaskLogin}>{userID}</button>
        {/* </Link> */}
        </>
      )}
       

       
      </div>
      <div className="navbar-menu">
        {toggleMenu ? 
        <RiCloseLine  color="#fff" size={27} onClick={() => setToggleMenu(false)} /> 
        : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
          <div className="navbar-menu_container scale-up-center" >
            <div className="navbar-menu_container-links">
             <Menu />
            </div>
            <div className="navbar-menu_container-links-sign">
            {user ? (
              <>
              <Link to="/create"> 
                <button type='button' className='primary-btn' >Create</button>
              </Link>
              <button type='button' className='secondary-btn'>Connect</button>
              </>
            ): (
              <>
            
              {/* <Link to="/login">  */}
              <button type='button' className='primary-btn' onClick={handleLogin} >Sign In</button>
              {/* </Link> */}
              <Link to="/register"> 
                <button type='button' className='secondary-btn'>Sign Up</button>
              </Link>
              </>
            )}
           
            </div>
            </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
