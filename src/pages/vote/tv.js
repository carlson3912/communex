import {useState,useEffect, Suspense,useMemo, React, callback} from 'react';
import './vote.css'
import {Link} from 'react-router-dom'
import Timer from '../../components/timer/timer'
import axios from "../../axios/axios"
import shit from "../../assets/shirttemplate.png"
import { ItemView } from '../../components/three/ItemView';
import shirtTwo from '../../assets/tshirt_obj.obj';
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import { Bounds, useBounds,OrbitControls, Stars, useTexture, useGLTF, Sky, SpotLight, Stage} from "@react-three/drei";
import * as THREE from "three";
import srs from "../../assets/circle1.png"




export function PurpCyliner(){
  const geometry = new THREE.CylinderGeometry( 120, 120, 1400, 32 );
  // const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );  
  return(
      <mesh position = {[0,0,-20]}  geometry={geometry}   rotation={[0,0,-Math.PI / 2]}> 
       <meshStandardMaterial color="purple" opacity={0.1} transparent={true} />
       
      </mesh>
  )
}
export const Vote = () => {
    const[cat, setCat] = useState(null);
    const [ifcat, setifcat] = useState(false);
  const [texture, setTexture] = useState(null);
  const [geometry, setGeometry] = useState(null);

  const [arr, setArr] = useState("");
  const [src, setSrc] = useState("");


 const connection = async () => {
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
          let newRow = document.createElement("td");
              newRow.innerHTML = 
              "<div id='items'> <img id = 'thumbnail' src=https://ipfs.io/ipfs/"+ response.data[i].ipfs+"/>" + 
               "<h2 id = 'title'>" + response.data[i].title+"</h2>" +
               "<h2 id = 'artist'>" + response.data[i].artist+"</h2>" +
               "<button id = 'voteButton'>Vote</button>" +
                "</div>";
                  mytable.appendChild(newRow)
         }    
       }


    const loadText = async() =>{
      console.log("loadtext called")
          return new Promise((resolve, reject) => {
            
            let texture;
            let onLoad = function () {
              const geometry2 = new THREE.CylinderGeometry( 120, 120, 100, 32 );
              setGeometry(geometry2);
              setTexture(textureIn);
              setifcat(true);
              console.log('textures 0', textureIn)
              resolve(texture);
            };
            let onProgress = function () { };
            let onError = function () {
                resolve(false);
            };
            
            let manager = new THREE.LoadingManager(onLoad, onProgress, onError);
            let loader = new THREE.TextureLoader(manager);
            const textureIn = loader.load(cat);
            
    
})};
     
    useEffect(()=>{
      connection().then(
        setCat(src[0])
      )
    
    console.log(src[0])
  // const Http = new XMLHttpRequest();
  // const url='https://api.thecatapi.com/v1/images/search';
  // Http.open("GET", url);
  // Http.send();
  // console.log(Http.responseText[0])
  
  // Http.onreadystatechange = (e) => {
  //   const jsonc = JSON.parse(Http.responseText)
  //   console.log(Http.responseText)
  //     setCat(jsonc[0].url);
      
  //     console.log("cat: " + jsonc[0].url);
},[])

  return (
    <div >
      { ifcat ?
      <>
<Suspense fallback={null}>

        <Canvas height="500px"camera={{position: [0, 0, 50]}}>
            <mesh  castShadow position={[0, -80, 0]} geometry={geometry} >
            <meshPhysicalMaterial map={texture}/>
          </mesh>
        <ambientLight intensity={1} />
        <OrbitControls />
    </Canvas>
  
    </Suspense>
   
    </>
    : null }

      <h1 >Voting has not started yet</h1>
      <button onClick={()=>loadText()}>Troll</button>      <h1>It will open up in:</h1>

      <Timer  date="May 15, 2022 15:00 PST"/>
        <table id ="html-data-table">
        </table>
        </div>
   )
};

export default Vote;