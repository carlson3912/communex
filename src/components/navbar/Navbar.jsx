import React from 'react';
import {useState} from 'react';
import './navbar.css'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import seller1 from '../../assets/seller1.png'
import {  Link } from "react-router-dom";
import Web3 from "web3";

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

  const handleLogout = () => {
    setUser(false);
  }
  async function handleLogin(){
    console.log("Login started")
    if(!window.ethereum){console.log("Window.ethereum error")}
    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
    console.log(accounts)
    setUserAddress(accounts[0])
    window.accounts = accounts
    setUserID(accounts[0][0] + accounts[0][1] + accounts[0][2]+ + accounts[0][3]+accounts[0][4]+accounts[0][5]+"..."+accounts[0][38]+accounts[0][39]+accounts[0][40]+accounts[0][41])
    window.web3 = new Web3(window.ethereum)
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
         <button type='button' className='primary-btn' onClick={handleLogin} >Connect</button>
        <Link to="/register">
            <button className='login-reg-writeButton' type='submit'>Register</button>
          </Link>
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
