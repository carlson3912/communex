import { Suspense } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { OrbitControls, Stars} from "@react-three/drei";
import * as THREE from "three";


import { OBJLoader } from 'three/examples/jsm/loaders/GLTFLoader'

function Ship() {
    const gltf = useLoader(OBJLoader, file)
    return (
      <Suspense fallback={null}>
        <mesh>
        <primitive object={gltf.scene} />
        <meshBasicMaterial color={"pink"} attach = "material"/>
        </mesh>
      </Suspense>
    )
  }

export function Model(){
return<Canvas camera={{position: [100, 0, 0]}}>
    
    <Suspense fallback={null}>
    <Ship/>
    </Suspense>
    <OrbitControls />
    {/* <Stars /> */}
       </Canvas>

}

export default Model;