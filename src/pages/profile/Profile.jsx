import {React, useState}  from 'react';
import axios from '../../components/navbar/axios'
import "./profile.css";
const Home = () => {
  const handleSubmit = async () => {
    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
    setWallet(accounts[0]);
    connection();
}
  const [wallet, setWallet] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('Connect');
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
      await setEmail(response.data.email);
      await setWallet(response.data.wallet);
  }
  return <><div onLoad={handleSubmit()}>
    </div><div>
    <h1 id = "one">Welcome back, {username}</h1>
    <h1 id = "three">{wallet}</h1>
    <h1 id ="two">{"    " +email}</h1>
    </div>
    <div id = "neg">
    <h1 id = "negativo">{username}'s Wardrobe</h1>

    </div>
    <div id ="uno">
      <div id = "dos"><h1>Orders</h1>
      <h1 id ="two">No orders.</h1></div>

      <div id = "dos"><h1>Submissions</h1>
      <h1 id ="two">No submissions.</h1></div>

      <div id = "dos"><h1>Vote History</h1>
      <h1 id ="two">No votes.</h1></div>

    </div>

  </>
};

export default Home;
