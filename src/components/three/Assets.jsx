import { OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import camelSRS from'../../assets/Camel.obj'
import camelNew from '../../assets/camelNew.json'
import {useMemo} from 'react'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import * as THREE from "three";

export function Camel(props){
const obj = useLoader(OBJLoader, camelSRS);
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
 
  // I've used meshPhysicalMaterial because the texture needs lights to be seen properly.
  return (
    <mesh rotation={[0,-Math.PI / 1.2,0]}name="Silk Road Swag Camel"castShadow position={props.loc}geometry={geometry} scale={[30,30,30]} >
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

export function DownCylinder(){
    const geometry = new THREE.CylinderGeometry( 120, 120, 20, 32 );
    // const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );  
    return(
        <mesh position = {[720,0,-20]}  geometry={geometry}   rotation={[0,0,-Math.PI / 2]}> 
         <meshStandardMaterial color="white" visible={true}/>
         <pointLight intensity={2} location={[720,0,-20]}  />
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