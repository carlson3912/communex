import { OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import camelSRS from'../../assets/Camel.obj'
import camelNew from '../../assets/camelNew.json'
import {useEffect, useMemo, useState} from 'react'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import * as THREE from "three";
import palm from "../../assets/Palm1.obj"
import pillar from "../../assets/pillar.png"
import { useTexture } from '@react-three/drei'
import LightFixture from '../../assets/LightFixture.obj'
import lightFixtureG from '../../assets/LightFixture.glb'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import metalbase from "../../assets/metalbase.glb"
import lightB from '../../assets/LightFixture6.glb'
import neon from '../../assets/neonsign.glb'

export function MetalBase(){
  
  const {scene} = useLoader(GLTFLoader, metalbase)
  return(
    <>
    <primitive position={[150,0,-375]}object={scene} scale={[10,10,10]} />
    {/* <rectAreaLight 
    color="red" 
                intensity={5} 
                rotation={[-3.14/2,0,3.14/4]}
                position={[150,100,-375]}
                // lookAt = {[250, 0, -255]}
                width={50}
                height={50}
                visible={true}/*/}


    </> 
  )
}

export function LightFixt(){

  const {scene} = useLoader(GLTFLoader, lightFixtureG)

  return(
    <>
    <primitive position={[250,200,-250]}object={scene} scale={[10,10,10]} />
    
    
  </>
  )

}
export function NeonSign(){
 
  const {scene} = useLoader(GLTFLoader, neon)

  return(
    
    <primitive rotation={[0,-3.14/2,0]} position={[490,150,-250]}object={scene} scale={[5,5,5]} />

  )
}

export function LightFixtB(props){
  const [c1, setc1] = useState("white");
  const [c2, setc2] = useState("white");
  const [c3, setc3] = useState("white");
  const [c4, setc4] = useState("white");
  const[ct, setct] = useState(0)
  const [count, setcount] = useState(0);
  const {scene} = useLoader(GLTFLoader, lightB);
  
//   useEffect(()=>{
//     console.log(props.scene);
//     if(props.scene==3){
//       console.log("finished");
//       setc1("red");
//       setc2("blue");
//       setc3("red");
//       setc4("blue");
// }}, [])

  useFrame((state) => {
    
    if(props.scene==2){
    setcount(count+1);
  //   if(count%22==0){
  //   if(ct==0){
  //   setc1("Blue");
  //   setc2("Red");
  //   setc3("Blue");
  //   setc4("Red");
  //   setct(1);
  //   }
  
  // if(ct==1){
  //   setc2("Blue");
  //   setc1("Red");
  //   setc4("Blue");
  //   setc3("Red");
  //   setct(0);
  //   }
  // }
    }
  })


  return(
    <>
    <rectAreaLight 
    color={c1}
    position={[250,175,-325]}
    rotation={[-3.14/2 * 1.5,0,0]}
    args={[5, 100]}
    castShadow
    
    />
    <rectAreaLight 
    color={c3}
    rotation={[-3.14/4 + 3.14,3.14,0]} position={[250,175,-200]}
    args={[5, 100]}
    castShadow
    
    />
    <rectAreaLight 
    color={c2}
    
    rotation={[0,3.14/2,3.14/4]} position={[310,175,-250]}
    args={[5, 200]}
    castShadow
  
    />

<rectAreaLight 
    color={c4}
    
    rotation={[0,-3.14/2,3.14/4]} position={[310-140,175,-250]}
    args={[5, 100]}
    castShadow
    />
      <primitive position={props.center} object={scene} scale={[5,5,5]} />
    
    </>
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

  const obj  = useLoader(OBJLoader, camelSRS);
  
  let onLoad = function () {
   
  };
  let onProgress = function () { console.log("onprogress")};
  let onError = function () {
    
  };
  
  const geometry = useMemo(() => {
    
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

