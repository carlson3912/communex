import { Suspense, useMemo, useState} from 'react'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { Bounds, useBounds,OrbitControls, Stars, useTexture, useGLTF, Sky, SpotLight, Stage} from "@react-three/drei";
import * as THREE from "three";

import silk from '../../assets/tryshirt3.jpeg'
import shirt from '../../assets/doubleshirts.gltf'
import { GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import { OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import {DesignThree} from './designthree'
import background from '../../assets/backgroundT.png'


import floortity from '../../assets/floortt.png'
import { DownCylinder, PurpCyliner } from './Assets';
import {BasicShirtDisplay}  from './Shirts'
import { makeList } from './Textures';
import {Camel} from './Assets';

// function ShirtO(props) {
//     const group = useRef()
//     const { nodes, materials } = useGLTF(shirt)
//     const { gl } = useThree()
//     let canvas = Array.from(document.getElementsByTagName('canvas'))[1],
//       ctx,
//       texture
  
//     ctx = canvas.getContext('2d')
//     texture = new THREE.CanvasTexture(ctx.canvas)
//     texture.anisotropy = gl.capabilities.getMaxAnisotropy()
//     texture.needsUpdate = true
//     useFrame(() => {
//       texture.needsUpdate = true
//     })
// }

// function newest(){
//     const obj = useLoader(GLTFLoader, shirt);
//   const texture = useTexture(silk);
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

//   // I've used meshPhysicalMaterial because the texture needs lights to be seen properly.
//   return (
//     <mesh geometry={geometry} scale={0.04}>
//       <meshPhysicalMaterial map={texture} />
//     </mesh>
//   )
// }

function ItemBoard(props){
  console.log(props.name)
 
  return (
    <mesh receiveShadow position={props.loc}>
      <planeBufferGeometry attach="geometry" args={[200, 200]} />
      <meshStandardMaterial color="purple"attach="material"/>
    </mesh>
  );
}

function SelectToZoom({ children }) {
  const [loc, setLoc] = useState([0,0,0])
  const[nameProduct, setNameProduct] = useState("unknown")
  const api = useBounds()
  
  return (
    <group onClick={e => (e.stopPropagation(),
    setNameProduct(e.object.name),
    // console.log(e.object),
     setLoc([e.object.position.x, e.object.position.y+220,e.object.position.z+200]))} onPointerMissed={(e) => e.button === 0 && api.refresh().fit()}>
      {children}
       
      {/* <ItemBoard loc={loc} name={nameProduct}/> */}
    </group>
  )
}

function ShirtText(){
    const { nodes, materials } = useGLTF(shirt);
     const texture = useTexture(silk);
    return(
        <mesh castShadow receiveShadow geometry={nodes.T_Shirt_male.geometry} material={materials}>
        <meshStandardMaterial attach="material" map={texture}>
          {/* <canvasTexture attach="map" image={canvas} premultiplyAlpha onUpdate={(s) => (s.needsUpdate = true)} /> */}
        </meshStandardMaterial>
      </mesh>
    )
}
function Scene() {
    // const base = new THREE.TextureLoader().load(silk);
    const gltf = useLoader(GLTFLoader, shirt)
    const texture = new THREE.CanvasTexture("hotpink")
    
    return (
        <Suspense fallback={null}>
        <mesh>
        <primitive shadows object={gltf.scene} />
        <meshStandardMaterial map={texture} attach="material" />
      </mesh>
      </Suspense>
    //   <Suspense fallback={null}>
    //     <mesh>
    //     <primitive object={gltf.scene} color={"pink"} map={base}/>
    //     <meshBasicMaterial attach = "material" />
    //     </mesh>
    //   </Suspense>
    )
  }



function Box(){
    // const colorMap = useLoader(TextureLoader, silk)
    const base = new THREE.TextureLoader().load(silk);
return(
    <mesh>
        
        <cylinderBufferGeometry args={[30, 30 ,5, 20]} />
         <meshBasicMaterial color={"pink"} attach = "material" map={base}/>
    </mesh>
)
}

// function SceneTwo() {
//     const obj = useLoader(OBJLoader, shirtTwo)
//     return <primitive object={obj} />
//   }



// function Ward(){
    
//      const obj = useLoader(OBJLoader, wardrobe);
//    const geometry = useMemo(() => {
//      let g;
//      obj.traverse((c) => {
//        if (c.type === "Mesh") {
//          const _c = c;
//          g = _c.geometry;
//        }
//      });
//      return g;
//    }, [obj]);
 
//    // I've used meshPhysicalMaterial because the texture needs lights to be seen properly.
//    return (
//      <mesh castShadow position={[0, 300, 0]}geometry={geometry} >
//        <meshPhysicalMaterial />
//      </mesh>
//    )
//  }

function GroundPlane() {
    return (
      <mesh receiveShadow rotation={[-3.14/2, 0, 0]} position={[0, -300, 0]}>
        <planeBufferGeometry attach="geometry" args={[2000,2000]} />
        <meshStandardMaterial attach="material"  transparent={true} map={useTexture(floortity)} />
      </mesh>
    );
  }
  function BackDrop() {
    return (
      <mesh receiveShadow position={[0, 0, -150]}>
        <planeBufferGeometry attach="geometry" args={[2200, 500]} />
        <meshStandardMaterial attach="material" map={useTexture(background)}/>
      </mesh>
    );
  }
  




export function Model(){
  
  const listItems = makeList();
  
  return<Canvas height="100%"camera={{position: [0, 0, 100]}}>
      {/* Change the margin on the bounds in order to alter the zoom on the camera */}
      <Suspense fallback={null}>
      <Camel loc={[700,2,310]}/>
      <Bounds fit clip margin={0.25}>   
      <SelectToZoom>
        
      {/* <SceneThree start='0' name = "shirt1" itemt={shirtThree}/> */}
      {
        
        listItems.map(shirt=>{
          const name = shirt.name;
          const posi = shirt.posi;
          const src = shirt.src;
          return(
            <BasicShirtDisplay name={name} start ={posi * -100} itemt={src} />
          )
        })
      }
    <PurpCyliner />
    <DownCylinder />
    <DesignThree />
    {/* <GroundPlane /> */}
    {/* <BackDrop /> */}
    {/* <Sphere /> */}
    {/* <mesh receiveShadow position={[0, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[500, 500]} />
      <meshStandardMaterial attach="material" color="white" />
    </mesh> */}
    {/* <Sky /> 
    <Stage /> */}
   </SelectToZoom>
   </Bounds>
    </Suspense>
  

    <OrbitControls />
    {/* <ambientLight intensity={0.5} /> */}
    {/* <rectAreaLight
      width={1000}
      height={500}
      color="white"
      brightness={100}
      position={[-20, 0, 340]}
      lookAt={[0, 0, 0]}
    //   penumbra={1}
    castShadow
    /> */}
       </Canvas>

}

export default Model;