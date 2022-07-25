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
    <div>
     <Link to="/"><p className = "glitch" data-glitch="MarketPlace" id="navItems"> Marketplace </p> </Link>
     </div>
     <Link to ="Vote"><p className = "glitch" data-glitch="Vote" id="navItems"> Vote </p></Link>
     <Link to ="Design"><p className = "glitch" data-glitch="Design Studio" id="navItems"> Design Studio </p></Link>
     <Link to ="About"><p className = "glitch" data-glitch="Our Mission" id="navItems"> Information </p></Link>  </>
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
       const response = await axios.post("http://74.208.187.32/auth",
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
          <div id="col">
            <h1 id="navTitle">Silk Road Swag</h1>
            <h1 id="navSubTitle">from the Metaverse to your wardrobe</h1>
            </div>
          </Link>
        </div>
        <div className="navbar-links_container">
          {/* <input type="text" placeholder='Search Item Here' autoFocus={true} /> */}
         <Menu />
         {user && <Link to="/"><p onClick={handleLogout}>Logout</p></Link> }
        </div>
      </div>
      <div className="navbar-sign">
      {!username ? (
        <>
        {/* <button>Temp</button> */}
        
         <button type='button' className='primary-btn' onClick={handleSubmit} id="navItems2">{link}</button>
        <Link to="/register">
            <button className='login-reg-writeButton' type='submit' id="navItems2">Register</button>
          </Link>
        </>) : <Link to="/profile">
            <button className='primary-btn' type='submit'id="navItems2">{username+"'s profile"}</button>
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
