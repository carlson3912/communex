import { OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import { Camel } from './Assets';
import {useMemo} from 'react'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei';
import * as THREE from "three";
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import {useState} from 'react';
import fontSRS from "../../assets/fonts/kumar.json";
import { PalmTree } from './Assets';
import { WaterA } from './Assets';
import bird from "../../assets/bird.png"

const TextThree = () =>{
    console.log("dorid: ");
    const [geo, setGeo] = useState(null);
    const fontLoader = new FontLoader();
    fontLoader.load(
       fontSRS,
      (droidFont) => {
        const text = new TextGeometry('three.js', {
          size: 20,
          height: 4,
          font: droidFont,
        });
        setGeo(text);
        console.log("dorid: "+droidFont);
      })
   
return(
    <mesh position = {[-1000,0,-20]}  geometry={geo} > 
        <meshStandardMaterial color="blue"  emissive={0.7}/>
        
       </mesh>
)
}

export const DesertBiome = () => {
    const geometry = new THREE.BoxGeometry(50, 1000, 200 );
    const texture = useTexture(bird)
    return(
        <>
        <mesh position = {[-730,0,-20]}  geometry={geometry} > 
        <meshStandardMaterial color="blue"  emissive={0.7}/>
       </mesh>
       <mesh position = {[-740,0,-20]} scale={[1,5,10]} geometry={geometry} > 
        <meshStandardMaterial color="rgb(186,149,97)"  emissive={0.7}/>
       </mesh>
       {/* <Camel loc = {[-550,150,-250]} rot={[0,0,-3.1415/2]}/> */}
       {/* <TextThree /> */}
      <PalmTree loc = {[-750,700,-220]} rot={[0,0,3.1415/2]} />
      <PalmTree loc = {[-750,-650,180]} rot={[0,0,3.1415/2]} />
      <mesh name="studio" position = {[-980,0,0]} scale={[10 ,0.75,5]} geometry={geometry} > 
        <meshStandardMaterial  color="purple" map={texture} emissive={0.7}/>
       </mesh>
       {/* <Water /> */}
       </>
    )
}

export default DesertBiome;
