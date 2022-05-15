import {useState, useMemo} from 'react';
import { Bounds, useBounds,OrbitControls, Stars, useTexture, useGLTF, Sky, SpotLight, Stage} from "@react-three/drei";
import { OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import shirtTwo from '../../assets/tshirt_obj.obj'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { listShirts } from './Textures';
import cylinderC from '../../assets/cylinderC.obj'

function CylinderM(prop){
    const [location, setLocation] = useState(parseInt(prop.start));
  useFrame(() => {
       setLocation(location+1)
       if (location>700){
           setLocation(-700);
       }
     })
    const obj = useLoader(OBJLoader, cylinderC);
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
    <mesh name={prop.name} castShadow position={[location, -80, -20]}geometry={geometry} >
      <meshStandardMaterial color="white" opacity="0.1" transparent={true}/>
    </mesh>
  )
 }

export function BasicShirtDisplay(prop){
    const texture = useTexture(prop.itemt);
     const [location, setLocation] = useState(parseInt(prop.start));

   useFrame(() => {
        setLocation(location+1)
        if (location>700){
            setLocation(-700);
        }
      })
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
     <mesh name={prop.name} castShadow position={[location, -80, -20]}geometry={geometry} >
       <meshPhysicalMaterial name="donald" map={texture}/>
     </mesh>
     <CylinderM name={prop.name} start={location}/>
     </>
   )
 }

 