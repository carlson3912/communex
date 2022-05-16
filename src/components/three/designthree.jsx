import { OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import camelSRS from'../../assets/Camel.obj'
import camelNew from '../../assets/camelNew.json'
import {useMemo} from 'react'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import * as THREE from "three";
export const DesignThree = () => {
    const geometry = new THREE.BoxGeometry(200, 500, 500 );
    return(
        <mesh position = {[-1000,0,-20]}  geometry={geometry} > 
        <meshStandardMaterial color="blue"  emissive={0.7}/>
        
       </mesh>

    )
}
