import React from 'react';
import {useState} from 'react';
import './navbar.css'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import seller1 from '../../assets/seller1.png'
import {  Link } from "react-router-dom";
import Web3 from "web3";
import axios from "./axios";
const Menu = () => (
  <>
     <Link to="/"><p>Explore</p> </Link>
     <Link to ="Product"><p>Product</p></Link>
     <Link to ="Vote"><p>Vote</p></Link>
     <Link to ="Submit"><p>Submit</p></Link>
     <Link to ="About"><p>Our Mission</p></Link>
  </>
 )

 const Navbar = () => {
  const [toggleMenu,setToggleMenu] = useState(false)
   const [user,setUser] = useState(false)
   const [userAddress, setUserAddress] = useState(null)
   const [userID, setUserID] = useState("Connect Wallet")
   const [wallet, setWallet] = useState('');
   const [username, setUsername] = useState('');
   const [link, setLink] = useState('Connect');
    const handleSubmit = async (e) => {
         e.preventDefault();
         const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
         console.log(accounts)
         setUserAddress(accounts[0])
         window.accounts = accounts
         setWallet(accounts[0]);
         setLink("Log In");
         connectionProxy();
     }
     const connectionProxy = async () => {connection()}
     const connection = async () => {
       const response = await axios.post("http://localhost:3500/auth",
                    JSON.stringify({wallet}),
                   JSON.stringify({
                       headers: { 'Content-Type': 'text/plain'},
                       withCredentials: true
                   })
                   );
           console.log(response);
         await setUsername(response.data.name);
         setLink("Connected");
     }
  const handleLogout = () => {
    setUser(false);
  }

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
      {!username ? (
        <>
        {/* <button>Temp</button> */}
        
         <button type='button' className='primary-btn' onClick={handleSubmit} >{link}</button>
        <Link to="/register">
            <button className='login-reg-writeButton' type='submit'>Register</button>
          </Link>
        </>) : <Link to="/profile">
            <button className='primary-btn' type='submit'>{username+"'s profile"}</button>
          </Link>


  }
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
              </>
            ): (
              <>
              {/* <Link to="/login">  */}
              <button type='button' className='primary-btn' onClick={handleSubmit} >Sign In</button>
              {/* </Link> */}
              <Link to="/register"> 
                <button type='button' className='secondary-btn'>Register</button>
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
