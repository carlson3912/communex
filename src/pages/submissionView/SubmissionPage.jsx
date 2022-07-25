import axios from '../../components/navbar/axios'
import "./submissionPage.css";
import { ItemView } from '../../components/three/ItemView';
import shirtTwo from '../../assets/tshirt_obj.obj';
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import { Bounds, useBounds, Stars, useTexture, useGLTF, Sky, SpotLight, Stage} from "@react-three/drei";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { sortAndDeduplicateDiagnostics, visitNodes } from 'typescript';

import {useState,useEffect, Suspense,useMemo, React, callback} from 'react';
const Home = () => {
    var validPage;
    const [errMsg, setErrMsg] = useState(null);
    const [res, setRes] = useState();
    const user = window.location.pathname.split('/')[1];
    const ipfs = window.location.pathname.split('/')[2];
    const connection = async () => {
        try{
            console.log("connection called")
        const response = await axios.post("http://localhost:3500/ss",
                      JSON.stringify(user+'/'+ipfs),
                     JSON.stringify({
                         headers: { 'Content-Type': 'text/plain'},
                         withCredentials: true
                     })
                     );
                    setRes(response)
                    let added = document.getElementById("submis")
                  
                    let addedContent = document.createElement("div");
                    let date = new Date(response.data.date).toString()
                    addedContent.innerHTML =
                    '<div id="selectedSub"><div id ="selectedSubInner"><div id = "auto"><div id="innerSubLeft">' +
                    '</div>' +
                        "<div id='innerSubRight'>" +
                          "<h2 id = 'title'>"+response.data.title +"</h2>" +
                          "<h2 id = 'date'>"+date.slice(0)+"</h2>" +
                          "<h2 id = 'artist'>"+response.data.artist +"</h2>"+
                          "<h2 id = 'artist'> "+response.data.votes +" $silk votes</h2>"+
                          "<h2 id = 'description'>"+ '"'+response.data.description +'"'+"</h2>" +
                          "<form id='formVotes'>" +
                          "<h2 id = 'votesCast'>Votes to Cast</h2>" +
                            "<input id ='votesInput' type = 'number' min='0' max='10256'>" +
                            "</input><h2 id = 'votesCast'>Tokens to Stake</h2>" +
                            "<input id ='votesInput' type = 'number' min='0' max='10256'>" +
                            "</input><button id = 'innerVoteB'>Vote</button></form></div></div></div></div>";
                    added.appendChild(addedContent);
                    const myTableDivision = document.getElementById("innerSubLeft");
                
                    const scene = new THREE.Scene();
                    const camera = new THREE.PerspectiveCamera(80, .5, 0.1, 1200);
                    const renderer = new THREE.WebGLRenderer({ alpha: true })
                    renderer.setClearColor( 0xffffff, 0);
                    const controls = new OrbitControls( camera, renderer.domElement );
                    renderer.setSize(window.innerWidth/2, window.innerWidth/2);
                    renderer.setPixelRatio(2.86);
                  myTableDivision.appendChild(renderer.domElement) 
                  let man;
                  var loader = new OBJLoader();
                loader.load(shirtTwo, function (object, materials) {
                man = object;
                man.traverse(function (child) {
                child.material = new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load("https://ipfs.io/ipfs/"+ response.data.ipfs)
                });
                child.material.side = THREE.DoubleSide;
                });
                man.position.x = 0;
                man.position.y = -75;
                scene.add(man);
                });
                var wireframe = new THREE.Mesh(
                  new THREE.DodecahedronGeometry(80),
                  new THREE.MeshBasicMaterial({
                      color: 0xffffff,
                      wireframe: true
                  }));
                  wireframe.rotation.z = -3.14
                scene.add( wireframe );
                var geo = new THREE.EdgesGeometry( new THREE.DodecahedronGeometry(70) ); // or WireframeGeometry( geometry )
                
                var mat = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 9 } );
                
                var wireframe2 = new THREE.LineSegments( geo, mat );
                
                scene.add( wireframe2 );
                var wireframe = new THREE.Mesh(
                  new THREE.BoxGeometry(50, 50, 50),
                  new THREE.MeshBasicMaterial({
                      color: 0xffffff,
                      wireframe: true
                  }));
                  wireframe.rotation.x = -3.14/8
                  wireframe.rotation.z = -3.14/8
                scene.add( wireframe );
                  camera.position.z = 135;
                  controls.update();
                  renderer.render(scene, camera);
                  function animate(){
                    requestAnimationFrame(animate)
                    controls.update();
                    renderer.render(scene, camera)
                    wireframe.rotation.z += 0.0005
                    wireframe.rotation.y += 0.0005
                    wireframe2.rotation.z -= 0.0005
                    wireframe2.rotation.y -= 0.0005
                  }
                  animate()
                
                  document.getElementById('formVotes').addEventListener('submit', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                });
                
                     document.getElementById("innerVoteB").addEventListener("click", async function(e){
                      if(!window.ethereum){
                        document.getElementById("hiddenError").style = "display: block;";
                
                        console.log("Please install Metamask"); console.log("Window.ethereum error")
                      }
                      else{
                        const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
                        //voteDB(accounts, response.data.ipfs, document.getElementById("votesInput").value);
                      }
                      
                })
        }
        catch(err) {
            if (!err?.response) {
                setErrMsg('Server not responding. Please try again.');
            } else if (err.response?.status === 404) {
                setErrMsg('Page does not exist.');
            }
            else{
                setErrMsg('Server not functioning correctly. Please contact administrators');
            }
        }

                    }
                    useEffect(()=>{
                        connection();
    
                  },[])    
                  console.log(res)
                   
                  
    return <>
    {
        errMsg ? <><div id = "notFound"><h1>{errMsg}</h1></div></>  : 
            <> 
                <div id ="submis"></div>
            </>
    }  
    </>
    };
    
    export default Home;