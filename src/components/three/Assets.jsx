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
import metalbase from "../../assets/metalbase.glb"
import lightB from '../../assets/LightFixtureB.glb'
import neon from '../../assets/neonsign.glb'

export function MetalBase(){
  console.log("before gtlf: ");
  const {scene} = useLoader(GLTFLoader, metalbase)
  return(
    
    <primitive position={[150,0,-375]}object={scene} scale={[10,10,10]} />

  )
}

export function LightFixt(){
  console.log("before gtlf: ");
  const {scene} = useLoader(GLTFLoader, lightFixtureG)
  console.log("gtlf: "+scene);
  return(
    
    <primitive position={[250,200,-250]}object={scene} scale={[10,10,10]} />

  )
}
export function NeonSign(){
  console.log("before gtlf: ");
  const {scene} = useLoader(GLTFLoader, neon)
  console.log("gtlf: "+scene);
  return(
    
    <primitive rotation={[0,-3.14/2,0]} position={[490,150,-250]}object={scene} scale={[5,5,5]} />

  )
}

export function LightFixtB(){
  console.log("before gtlf: ");
  const {scene} = useLoader(GLTFLoader, lightB)
  console.log("gtlf: "+scene);
  return(
    
    <primitive position={[250,100,-250]}object={scene} scale={[5,5,5]} />

  )
}


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
  
  let onLoad = function () {
   console.log("onload")
  };
  let onProgress = function () { console.log("onprogress")};
  let onError = function () {
    console.log("fail")
  };
  
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
   
    return(
        <mesh position = {[0,0,-20]}  geometry={geometry}   rotation={[0,0,-Math.PI / 2]}> 
         <meshStandardMaterial color="purple" opacity={0.1} transparent={true} />
         
        </mesh>
    )
}

export function DownCylinder(props){
    console.log("DOWN WOULD BE REFRESH")
  
   
    return(
        <mesh position = {[720,0,-20]}  geometry={props.geom}   rotation={[0,0,-Math.PI / 2]}> 
         <meshStandardMaterial color="white" visible={true}/>
         {/* <pointLight intensity={0.1} location={[720,0,-20] }   /> */}
        </mesh>
    )
}

