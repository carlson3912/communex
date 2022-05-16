import { OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import { Suspense} from 'react'
import {useMemo, useState} from 'react'
import { Bounds, useBounds,OrbitControls, Stars, useTexture, useGLTF, Sky, SpotLight, Stage} from "@react-three/drei";
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import {Camel} from './Assets'

// function SelectToZoom({ children }) {
//     const[nameProduct, setNameProduct] = useState("unknown")
//     const api = useBounds()
    
//     return (
//       <group onClick={e => (e.stopPropagation(),
//       setNameProduct(e.object.name),
//       // console.log(e.object),
//        setLoc([e.object.position.x, e.object.position.y+220,e.object.position.z+200]))} onPointerMissed={(e) => e.button === 0 && api.refresh().fit()}>
//         {children}
         
//         <ItemBoard loc={loc} name={nameProduct}/>
//       </group>
//     )
//   }

export const Wardrobe = () => {
    return(
        <Canvas height="100%"camera={{position: [0, 0, 100]}}>
      {/* Change the margin on the bounds in order to alter the zoom on the camera */}
      <Suspense fallback={null}>
      <Bounds fit clip margin={0.25}>   
      {/* <SelectToZoom> */}
        <Camel />
   {/* </SelectToZoom> */}
   </Bounds>
    </Suspense>
  

    <OrbitControls />
    {/* <ambientLight intensity={0.5} /> */}
    {/* <rectAreaLight
      width={700}
      height={500}
      color="white"
      brightness={100}
      position={[-20, 0, 340]}
      lookAt={[0, 0, 0]}
    //   penumbra={1}
    castShadow
    /> */}
       </Canvas>
    )
}