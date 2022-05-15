import { OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import camelSRS from'../../assets/Camel.obj'
import camelNew from '../../assets/camelNew.json'
import {useMemo} from 'react'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'

export function Camel(){
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
    <mesh castShadow position={[0, 0, 0]}geometry={geometry} >
      <meshStandardMaterial color="purple" opacity="0.9" transparent={true}/>
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