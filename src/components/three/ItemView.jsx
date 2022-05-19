import { Suspense, useMemo, useState} from 'react'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { Bounds, useBounds,OrbitControls, Stars, useTexture, useGLTF, Sky, SpotLight, Stage} from "@react-three/drei";
import * as THREE from "three";
import shirtTwo from '../../assets/tshirt_obj.obj'
import silk from '../../assets/tryshirt3.jpeg'
import shirt from '../../assets/doubleshirts.gltf'
import { GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import { OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'

import background from '../../assets/backgroundT.png'


import floortity from '../../assets/floortt.png'


import { makeList } from './Textures';

export function BasicShirtDisplaySill(prop){
  console.log("itemt:" + prop.itemt);
    const texture = useTexture(prop.itemt);

  
     const obj = useLoader(OBJLoader, shirtTwo);
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
       <>
     <mesh name={prop.name} castShadow position={[0, -80, 0]}geometry={geometry} >
         {/* <Sky /> */}
       <meshPhysicalMaterial map={texture}/>
     </mesh>
     </>
   )
 }

export const ItemView = (props) => {
  console.log("props:" + props.src);
    return<Suspense fallback={null}>
        <Canvas height="500px"camera={{position: [0, 0, 150]}}>
        <BasicShirtDisplaySill  name={props.name} start ={0} itemt={props.src}/>
        <ambientLight intensity={1} />
        <OrbitControls />
        <Stars />
    </Canvas>
    </Suspense>

    
}

