import { OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import camelSRS from'../../assets/Camel.obj'
import camelNew from '../../assets/camelNew.json'
import {useMemo} from 'react'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import * as THREE from "three";
import palm from "../../assets/Palm1.obj"
import pillar from "../../assets/pillar.png"
import { useTexture } from '@react-three/drei'
import LightFixture from '../../assets/LightFixture.obj'
import lightFixtureG from '../../assets/LightFixture.glb'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import { Water } from "three/examples/jsm/objects/Water.js";

// export function WaterA(){
//   const waterGeometry = new THREE.PlaneGeometry( 200, 200 );
// 	// const waterG = new Water( waterGeometry, {
//   //   color: params.color,
//   //   scale: params.scale,
//   //   flowDirection: new THREE.Vector2( params.flowX, params.flowY ),
//   //   textureWidth: 1024,
//   //   textureHeight: 1024
//   // } );
//   return (
//     <Water geometry={waterGeometry} position={[0,0,0]} />
//   )
//   // water.position.y = 1;
//   // water.rotation.x = Math.PI * - 0.5;
//   // scene.add( water );
// }
export function LightFixt(){
  console.log("before gtlf: ");
  const {scene} = useLoader(GLTFLoader, lightFixtureG)
  console.log("gtlf: "+scene);
  return(
    
    <primitive position={[250,200,-250]}object={scene} scale={[10,10,10]} />

  )
}
// export function LightFixt2(){
//   const obj = useLoader(OBJLoader, LightFixture);
//   const geometry = useMemo(() => {
//     let g;
//     obj.traverse((c) => {
//       if (c.type === "Mesh") {
//         const _c = c;
//         g = _c.geometry;
//       }
//     });
//     return g;
//   }, [obj]);
//   return(
//     <>
//        <mesh name="Room Two Light Fixture"castShadow position={[125,20,-125]}geometry={geometry} scale={[0.03,0.03,0.03]}>
//       <meshStandardMaterial color="purple" />
      
//     </mesh>
//     </>
//   )
// }
// export function Computer(){

// }

export function PalmTree(props){
  const obj = useLoader(OBJLoader, palm);
  const geometry = useMemo(() => {
    let g;
    obj.traverse((c) => {
      if (c.type === "Mesh") {
        const _c = c;
        g = _c.geometry;
      }
    });
    return g;
  }, [obj]);
  const texture = useTexture(pillar);
  // I've used meshPhysicalMaterial because the texture needs lights to be seen properly.
  return (
    <mesh rotation={props.rot}name="Silk Road Swag Palm Tree"castShadow position={props.loc}geometry={geometry} scale={[30,30,30]} >
      <meshStandardMaterial  map={texture} />
      
    </mesh>
  )
}

export function Camel(props){
  console.log("camel object is reloaded");
  const obj  = useLoader(OBJLoader, camelSRS);
  // let manager = new THREE.LoadingManager(bum);
  
  let onLoad = function () {
   console.log("onload")
  };
  let onProgress = function () { console.log("onprogress")};
  let onError = function () {
    console.log("fail")
  };
  
  // let manager = new THREE.LoadingManager(onLoad, onProgress, onError);
  // const loader = new OBJLoader(manager );
  // const obj = loader.load( camelSRS)

  const geometry = useMemo(() => {
    console.log("camel object is really reloaded");
    let g;
    obj.traverse((c) => {
      if (c.type === "Mesh") {
        const _c = c;
        g = _c.geometry;
      }
    });
    return g;
  }, []);
 
  // I've used meshPhysicalMaterial because the texture needs lights to be seen properly.
  return (
    <mesh rotation={props.rot}name="Silk Road Swag Camel"castShadow position={props.loc}geometry={geometry} scale={[30,30,30]} >
      <meshStandardMaterial color="purple" opacity="0.9" transparent={true}/>
      
    </mesh>
  )
 }

 export function PurpCyliner(){
    const geometry = new THREE.CylinderGeometry( 120, 120, 1400, 32 );
    // const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );  
    return(
        <mesh position = {[0,0,-20]}  geometry={geometry}   rotation={[0,0,-Math.PI / 2]}> 
         <meshStandardMaterial color="purple" opacity={0.1} transparent={true} />
         
        </mesh>
    )
}

export function DownCylinder(props){
    console.log("DOWN WOULD BE REFRESH")
  
    // const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );  
    return(
        <mesh position = {[720,0,-20]}  geometry={props.geom}   rotation={[0,0,-Math.PI / 2]}> 
         <meshStandardMaterial color="white" visible={true}/>
         {/* <pointLight intensity={0.1} location={[720,0,-20] }   /> */}
        </mesh>
    )
}

//  export function CamelNew(){
//     const loader = new THREE.ObjectLoader();

// loader.load(
// 	// resource URL
// 	"models/json/example.json",
// )
//     const obj = useLoader(OBJLoader, camelNew);
//       const geometry = useMemo(() => {
//         let g;
//         obj.traverse((c) => {
//           if (c.type === "Mesh") {
//             const _c = c;
//             g = _c.geometry;
//           }
//         });
//         return g;
//       }, [obj]);
     
//       // I've used meshPhysicalMaterial because the texture needs lights to be seen properly.
//       return (
//         <mesh castShadow position={[0, 0, 0]}geometry={geometry} >
//           <meshStandardMaterial color="purple" opacity="0.9" transparent={true}/>
//         </mesh>
//       )
//      }