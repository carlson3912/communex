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


// class Vote extends React.Component {

//   render() {
//     return (
//       <div>
//         <h1>A user</h1>
//       </div>
//     );
//   }
// }

// export default Vote;













export function PurpCyliner(){
  const geometry = new THREE.CylinderGeometry( 120, 120, 1400, 32 );
  // const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );  
  return(
      <mesh position = {[0,0,-20]}  geometry={geometry}   rotation={[0,0,-Math.PI / 2]}> 
       <meshStandardMaterial color="purple" opacity={0.1} transparent={true} />
       
      </mesh>
  )
}


// export async function BasicShirtDisplaySill(prop){
// //   const [ready, setready] = useState(false)
// //   console.log("SHIRT REFRESHEED: "+prop.text);
// //   const upImage = new Image();
// //   upImage.src = prop.text;
// //   // setImage(upImage);
// // //   upImage.setAttribute('crossorigin', 'anonymous');
// // // console.log("NEW IMAGE ORIGIN: "+ upImage.crossOrigin);
// // // console.log("NEW IMAGE SOURCE: "+ upImage.src);
// //   var onLoad = function() {
// //     console.log("onload");
// //     // callback(null, prop.text);
// // };

// // var onProgress = function() {
// //   console.log("onprogres");
// // };

// // var onError = function(url) {
// //     console.log("ACTUAL ERROR");
// // };

// // var manager = new THREE.LoadingManager(onLoad, onProgress, onError);

// // var loader = new THREE.TextureLoader(manager);

// // const texture = loader.loadAsync(shit);

// const geometry = new THREE.CylinderGeometry( 120, 120, 1400, 32 );
// const texture = await loadText(prop.text);
// console.log("basic texture:" + texture);

//  // I've used meshPhysicalMaterial because the texture needs lights to be seen properly.
//  return (
//      <>

//    <mesh  castShadow position={[0, -80, 0]} geometry={geometry} >
//        {/* <Sky /> */}
//      <meshPhysicalMaterial map={texture}/>
//    </mesh>
   
//    </>
//  )
// }

export const Vote = () => {

      const [arr, setArr] = useState("");
      const [src, setSrc] = useState("");
    const[cat, setCat] = useState(null);
    const [ifcat, setifcat] = useState(false);
  const [texture, setTexture] = useState(null);
  const [geometry, setGeometry] = useState(null);
    const loadText = async() =>{
      console.log("loadtext called")
          return new Promise((resolve, reject) => {
            
            let texture;
            let onLoad = function () {
              const geometry2 = new THREE.CylinderGeometry( 120, 120, 1400, 32 );
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
    setCat("https://ipfs.io/ipfs/QmfRf7oCaLVgnBkzNWfkGwEiW6A4JCgBMiZc87N8jVDuUu")
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


// console.log("basic texture:" + texture);

  return (
    <div >
      { ifcat ?
      <>
      <img src={cat}/>                

      


<Suspense fallback={null}>

        <Canvas height="500px"camera={{position: [0, 0, 150]}}>
            <mesh  castShadow position={[0, -80, 0]} geometry={geometry} >
          {/* <Sky /> */}
            <meshPhysicalMaterial map={texture}/>
          </mesh>
        <ambientLight intensity={1} />
        <OrbitControls />
    </Canvas>
  
    </Suspense>
   
    </>
    : null }



     



      <h1 >Voting has not started yet</h1>
      <button onClick={()=>loadText()}>Troll</button>
      <h1>It will open up in:</h1>

      <Timer  date="May 15, 2022 15:00 PST"/>
        <table id ="html-data-table">
        </table>
        </div>
   )
};

export default Vote;



