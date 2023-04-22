import {React, useState, useEffect}  from 'react';
import axios from '../../components/navbar/axios'
import "./profile.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import shirtTwo from '../../assets/tshirt_obj.obj';
import { OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
const Home = () => {
  const handleSubmit = async () => {
    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
    setWallet(accounts[0]);
    connection();
}
  const [wallet, setWallet] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('Connect');
  const [role, setRole] = useState('Connect');
  const [silk, setSilk] = useState('0');

  const [votes, setVotes] = useState([]);
  const [orders, setOrders] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const connection = async () => {
    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});

    const wallet = accounts[0]
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
       setRole(response.data.role);
                var arr = [];
                var arr2 = [];
    for (let i = 0; i < response.data.votes.length; i ++)
    {
      setVotes(src =>[ ...src, response.data.votes[i]])
      arr2[i] = response.data.votes[i];
    }
    for (let i = 0; i < response.data.orders.length; i ++)
    {
      setOrders(src =>[ ...src, response.data.orders[i]])
    }
    for (let i = 0; i < response.data.submissions.length; i ++)
    {
      setSubmissions(src =>[ ...src, response.data.submissions[i]])
      arr[i] = response.data.submissions[i]
    }
    const myTable = document.getElementById("submissionsOfUser")
    for (let i = 0; i < response.data.submissions.length; i ++)
    {
        let newColumn= document.createElement("tr");
          newColumn.innerHTML = "<h1>" + arr[i].title + "</h1><div id = 'thumbnail" + i + "'></div>";
          myTable.appendChild(newColumn)
          const myTableDivision = document.getElementById("thumbnail" + i);
          const scene = new THREE.Scene();
          const camera = new THREE.PerspectiveCamera(75, .5, 0.2, 1000);
          const renderer = new THREE.WebGLRenderer({ alpha: true })
          renderer.setClearColor( 0xffffff, 0);
          const controls = new OrbitControls( camera, renderer.domElement );
          renderer.setSize(218, 218);
          renderer.setPixelRatio(16/9);
        myTableDivision.appendChild(renderer.domElement) 
        let shirt;
        var loader = new OBJLoader();
  loader.load(shirtTwo, function (object, materials) {
shirt = object;
shirt.traverse(function (child) {
  child.material = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("https://ipfs.io/ipfs/"+ arr[i].ipfs)
  });
  child.material.side = THREE.DoubleSide;
});
shirt.position.x = 0;
shirt.position.y = -65;
scene.add(shirt);
});

        camera.position.z = 135;
        controls.update();
        renderer.render(scene, camera);
        function animate(){
          requestAnimationFrame(animate)
          controls.update();
          renderer.render(scene, camera)
        }
        animate()
    }
    const myTable2 = document.getElementById("votesOfUser")
    for (let i = 0; i < response.data.votes.length; i ++)
    {
      let newColumn= document.createElement("tr");
      newColumn.innerHTML = "<h2 id = 'voteList'>" + arr2[i].votes + " $SILK votes placed on " + arr2[i].title +"</h2>" 
      myTable2.appendChild(newColumn);
    }
  }
  useEffect(()=>{
    connection()
},[])

  return <>
  <div id = "container1">
      <div id="nameBox"><h1 id = "one">{username + ' *' + role}</h1>
      <h1 id ="two">{"    " +email}</h1>
    <h1 id = "three">{wallet}</h1>
    <h1 id = "four">$silk {silk}</h1>
    
    </div>
    <div id = "wardrobe">
    <h1 id = "negativo">{username}'s Wardrobe</h1>

    </div>
    </div>
    
    <div id ="uno">
      <div id = "dos"><h1>Orders</h1>
      <h1 id ="two">No orders.</h1></div>

      <div id = "dos"><h1>Submissions</h1>
      <div id ="submissionsOfUser"></div></div>

      <div id = "dos"><h1>Vote History</h1>
      <div id ="votesOfUser"></div></div>

    </div>

  </>
};

export default Home;
