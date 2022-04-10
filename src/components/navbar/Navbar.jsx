import React,{ useState} from 'react'
import './navbar.css'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import logo from '../../assets/logo.png'
import {  Link } from "react-router-dom";
const web3 = new Web3("http://localhost:8545")

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

  const NFTabi = require('./nft.json')
  
  async function metamaskLogin(){
    if(!window.ethereum){console.log("Window.ethereum error")}
    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
    setUserAddress(accounts[0])
    setUserID(userAddress.slice(0,6) +'...'+userAddress.slice(38,41))
  }
  async function buyNFT(){
    // params: [
    //   {
    //     from:userAddress ,
    //     to: '0xd46e8dd67c5d32be8058bb8eb970870f07244567',
    //     gas: '0x76c0', // 30400
    //     gasPrice: '0x9184e72a000', // 10000000000000
    //     value: '0x9184e72a', // 2441406250
    //     data:
    //       '0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675',
    //   },
    // ];
    
    window.ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [
          {
            from:userAddress ,
            to: '0xE2687F6DfB3f330b8b4D2717dF2A3dC3E82531e1',
            gas: '0x186A0', // 60,000 
            gasPrice: '0x1BF08EB000', // 10000000000000
            value: '56BC75E2D63100', // 2441406250
          },
        ],
      })
      .then((result) => {
        // The result varies by RPC method.
        // For example, this method will return a transaction hash hexadecimal string on success.
      })
      .catch((error) => {
        // If the request fails, the Promise will reject with an error.
      });
  }

  return (
    <div className='navbar'>
      <div className="navbar-links">
        <div className="navbar-links_logo">
          <img src={logo} alt="logo" />
          <Link to="/"> 
            <h1>CommuneX</h1>
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
        <button onClick={buyNFT}>Temp</button>
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
