import { Suspense, useEffect, useMemo, useState} from 'react'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { Html, Bounds, useBounds,OrbitControls, Stars, useTexture, useGLTF, Sky, SpotLight, Stage} from "@react-three/drei";
import * as THREE from "three";
import shirtTwo from '../../assets/tshirt_obj.obj'
import silk from '../../assets/tryshirt3.jpeg'
import shirt from '../../assets/doubleshirts.gltf'
import { GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import { OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import './three.css'
import background from '../../assets/backgroundT.png'

import joker from '../../assets/jokerdiscord.jpeg'
import floortity from '../../assets/floortt.png'


import { makeList } from './Textures';



function GroundPlane() {
    return (
      <mesh receiveShadow rotation={[-3.1415/2, 0, 0]} position={[0, -1, 0]}>
        <planeBufferGeometry attach="geometry" args={[500, 500]} />
        <meshStandardMaterial attach="material" color="purple" />
      </mesh>
    );
  }

  function BackDrop() {
    return (
      <mesh receiveShadow position={[0, 0, 0]}>
        <planeBufferGeometry attach="geometry" args={[500, 500]} />
        <meshStandardMaterial attach="material" color="blue" />
       
      </mesh>
    );
  }
  function BackDropb() {
    return (
      <mesh receiveShadow position={[0, 0, 0]} rotation={[3.14,0,0]}>
        <planeBufferGeometry attach="geometry" args={[500, 500]} />
        <meshStandardMaterial attach="material" color="blue" />
      </mesh>
    );
  }

//   function BackDrop2() {
//     return (
//       <mesh receiveShadow rotation = {[3.14,0,0]}position={[0, 0, 0]}>
//         <planeBufferGeometry attach="geometry" args={[500, 500]} />
//         <meshStandardMaterial attach="material" color="blue" />
//       </mesh>
//     );
//   }


  function BackDrop3() {
    return (
      <mesh receiveShadow rotation = {[0,3.14/2,3.14/2]}position={[0, 0, 0]}>
        <planeBufferGeometry attach="geometry" args={[500, 500]} />
        <meshStandardMaterial attach="material" color="green" />
      </mesh>
    );
  }

  function BackDrop3b() {
    return (
      <mesh receiveShadow rotation = {[0,-3.14/2,3.14/2]}position={[0, 0, 0]}>
        <planeBufferGeometry attach="geometry" args={[500, 500]} />
        <meshStandardMaterial attach="material" color="pink" />
      </mesh>
    );
  }

  function Startbuttone(){
      console.log("start");
    return (
        
        <mesh position={[500,30,0]}>
            <Html transform position={[0,0,0]} height={400} width={200}>
            <div>
                <div id="startbuttonDiv">
                    <h1 id="startbuttonscript">Pick Your Shirt Color</h1>
                </div>
            </div>
        </Html >
        </mesh>
      );
  }

  function Startbuttone2(){
    console.log("start");
  return (
      
      <mesh position={[0,30,-500]}  rotation={[0,3.14/2,0]}>
          <Html transform position={[0,0,0]} height={400} width={200} >
          <div>
              <div id="startbuttonDiv">
                  <h1 id="startbuttonscript">Style your shirt</h1>
              </div>
          </div>
      </Html >
      </mesh>
    );
}

function Startbuttone3(){
    console.log("start");
  return (
      
      <mesh position={[-500,30,0]}  rotation={[0,3.14,0]}>
          <Html transform position={[0,0,0]} height={400} width={200} >
          <div>
              <div id="startbuttonDiv">
                  <h1 id="startbuttonscript">Time to submit</h1>
                  <h1 id="startbuttonscript">Add a watermark?</h1>
              </div>
          </div>
      </Html >
      </mesh>
    );
}

export function BasicShirtDisplaySill(prop){
    const [yrot, setYRot] = useState(1);
    const texture = useTexture(prop.itemt);
    const [x, setx] = useState(125);
    const [y, sety] = useState(10);
    const [z, setz] = useState(125);

    useFrame(() => {
        setYRot(yrot+1);
        if(prop.move && prop.scene==1 && z>-125){setz(z-1);}
        if(prop.move && prop.scene==2 && x>-125){setx(x-1);}

    });
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
     <mesh rotation-y={Math.PI * 0.005*yrot} name={prop.name} castShadow position={[x ,y, z]}geometry={geometry} >
         {/* <Sky /> */}
       <meshPhysicalMaterial map={texture}/>
     </mesh>
     </>
   )
 }

export const InsideDesigner= (props) => {
    const [zinner, zinnerset] = useState(500);
  console.log("props:" + props.src);

 if (props.z != zinner){zinnerset(-500)};
 console.log("z: "+zinner);

// var x = 0;
// var y = 0;
// var z = 0;
// window.addEventListener("keydown", function (event) {
//     if (event.defaultPrevented) {
//       return; // Do nothing if the event was already processed
//     }
  
//     switch (event.key) {
//       case "ArrowDown":
//           x=x-100
//         // code for "down arrow" key press.
//         break;
//       case "ArrowUp":
//        x=x+100
//         // code for "up arrow" key press.
//         break;
//       case "ArrowLeft":
//         y= y -100;
//         // code for "left arrow" key press.
//         break;
//       case "ArrowRight":
//         y=y+100
//         // code for "right arrow" key press.
//         break;
//       default:
//         return; // Quit when this doesn't handle the key event.
//     }
  
    // Cancel the default action to avoid it being handled twice
//     event.preventDefault();
//   }, true);


    return<Suspense fallback={null}>
       
        
       
    
        <Canvas height="500px"camera={{position:[500,10,props.z]}}>
        {props.scene==0?
        <Startbuttone />
        : null}
         {props.scene==1?
        <Startbuttone2 />
        : null}
        {props.scene==2?
        <Startbuttone3 />
        : null}
        <GroundPlane />
        <BackDrop />
        <BackDropb />
        <BackDrop3b />
        <BasicShirtDisplaySill move={props.move} scene={props.scene} itemt={props.src} name="joker design"/>
        {/* <BackDrop2/> */}
        <ambientLight intensity={1} />
        <BackDrop3/>
       <OrbitControls/>
       
    </Canvas>
    </Suspense>

    
}

