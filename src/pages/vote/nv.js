import {useState,useEffect, Suspense,useMemo, React, callback} from 'react';
import './vote.css'
import {Link} from 'react-router-dom'
import Timer from '../../components/timer/timer'
import axios from "../../axios/axios"
import { ItemView } from '../../components/three/ItemView';
import shirtTwo from '../../assets/tshirt_obj.obj';
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import { Bounds, useBounds, Stars, useTexture, useGLTF, Sky, SpotLight, Stage} from "@react-three/drei";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";


export const Vote = () => {
    const[cat, setCat] = useState(null);
    const [ifcat, setifcat] = useState(false);

    const boxGeometry = new THREE.BoxGeometry(2,2,2)

const [arr, setArr] = useState("");
const [src, setSrc] = useState("");
const [texture, setTexture] = useState(null);
 const connection = async () => {
  console.log("connection called")
  const response = await axios.post("http://localhost:3500/submissions",
                JSON.stringify({}),
               JSON.stringify({
                   headers: { 'Content-Type': 'text/plain'},
                   withCredentials: true
               })
               );
       setArr(response);
       const mytable = document.getElementById("html-data-table");
       for (let i = 0; i <response.data.length; i++){
           if(i % 5 ===0 ) { mytable.appendChild(document.createElement("tr")) }
            setSrc(src => [...src, "https://ipfs.io/ipfs/"+ response.data[i].ipfs])
            console.log(response.data[i].ipfs)
          let newRow = document.createElement("td");
              newRow.innerHTML = 
              "<div id='items'>" +
               "<div class = 'thumbanil' id = 'thumbnail" + i + "'></div>" + 
               "<h2 id = 'title'>" + response.data[i].title+"</h2>"  +
               "<h2 id = 'artist'>" + response.data[i].artist+"</h2>" +
               "<button id = 'voteButton'>Vote</button>" +
                "</div>";
                  mytable.appendChild(newRow);
                  const myTableDivision = document.getElementById("thumbnail" + i);
                  const material= new THREE.MeshBasicMaterial({
                    map: new THREE.TextureLoader().load("https://ipfs.io/ipfs/"+ response.data[i].ipfs)
                  })
                    const scene = new THREE.Scene();
                                        const camera = new THREE.PerspectiveCamera(75, .5, 0.1, 1000);
                    const renderer = new THREE.WebGLRenderer({ alpha: true })
                    renderer.setClearColor( 0xffffff, 0);
                    const controls = new OrbitControls( camera, renderer.domElement );

                    renderer.setSize(250, 250);
                    renderer.setPixelRatio(2.86);
                  myTableDivision.appendChild(renderer.domElement) 
                  let man;
                  var loader = new OBJLoader();
loader.load(shirtTwo, function (object, materials) {
    console.log(object);
    man = object;
    man.traverse(function (child) {
            child.material = new THREE.MeshBasicMaterial({
              map: new THREE.TextureLoader().load("https://ipfs.io/ipfs/"+ response.data[i].ipfs)
            });
            child.material.side = THREE.DoubleSide;
    });
    man.position.x = 0;
    man.position.z = -10;
    man.position.y = -75;
    scene.add(man);
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
       }
useEffect(()=>{
      connection();
},[])
  return (
    <div >        <h1>Vote Period Ends: <Timer  date="May 15, 2022 15:00 PST"/></h1>
        <table id ="html-data-table">
        </table>
        </div>
   )
};
export default Vote;