import { Suspense, useMemo, useState} from 'react'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { OrbitControls, Stars, useTexture, useGLTF, Sky, SpotLight, Stage} from "@react-three/drei";
import * as THREE from "three";
import fire from '../../assets/fire.png'
import silk from '../../assets/tryshirt3.jpeg'
import shirt from '../../assets/doubleshirts.gltf'
import { GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import { OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import shirtTwo from '../../assets/tshirt_obj.obj'
import shirtThree from '../../assets/shirtFour.jpeg'
import matlab from '../../assets/matlab2.jpeg'
import wardrobe from '../../assets/model.obj'
import camel from '../../assets/camelShirt.jpeg'
import moneyFace from '../../assets/monetFace.JPG'
import longLine from '../../assets/longLine.JPG'
import mateoTwo from '../../assets/mateoTwo.jpeg'
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

function SceneThree(prop){
   const texture = useTexture(prop.itemt);
    const [location, setLocation] = useState(parseInt(prop.start));
    console.log("scene: "+location)
  useFrame(() => {
       setLocation(location+1)
       if (location>500){
           setLocation(-500);
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
    <mesh castShadow position={[location, -80, -20]}geometry={geometry} >
      <meshPhysicalMaterial  map={texture}/>
    </mesh>
  )
}

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
      <mesh receiveShadow rotation={[5, 0, 0]} position={[0, -1, 0]}>
        <planeBufferGeometry attach="geometry" args={[500, 500]} />
        <meshStandardMaterial attach="material" map={useTexture(fire)} />
      </mesh>
    );
  }
  function BackDrop() {
    return (
      <mesh receiveShadow position={[0, -1, -5]}>
        <planeBufferGeometry attach="geometry" args={[500, 500]} />
        <meshStandardMaterial attach="material" color="blue" />
      </mesh>
    );
  }
  function Sphere() {
    return (
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <sphereGeometry attach="geometry" args={[1, 16, 16]} />
        <meshStandardMaterial
          attach="material"
          color="white"
          transparent
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>
    );
  }
export function Model(){
return<Canvas height="100%"camera={{position: [0, 0, 150]}}>
    
    <Suspense fallback={null}>
    
    <SceneThree start='0' itemt={shirtThree}/>
    <SceneThree start='-100' itemt={silk}/>
    <SceneThree start='-200' itemt={matlab}/>
    <SceneThree start='-300' itemt={camel}/>
    <SceneThree start='-400' itemt={moneyFace}/>
    <SceneThree start='-500' itemt={longLine}/>
    <SceneThree start='-600' itemt={mateoTwo}/>
    <SceneThree start='-700' itemt={matlab}/>
    <SceneThree start='-800' itemt={matlab}/>
    <SceneThree start='-900' itemt={matlab}/>
    
    {/* <GroundPlane /> */}
    {/* <BackDrop /> */}
    {/* <Sphere /> */}
    {/* <mesh receiveShadow position={[0, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[500, 500]} />
      <meshStandardMaterial attach="material" color="white" />
    </mesh> */}
    {/* <Sky /> 
    <Stage /> */}
   
    </Suspense>
    <OrbitControls />
    <ambientLight intensity={0.5} />
    {/* <rectAreaLight
      width={500}
      height={500}
      color="white"
      brightness={100}
      position={[4, 4, 0]}
      lookAt={[0, 0, 0]}
    //   penumbra={1}
    //   castShadow
    /> */}
       </Canvas>

}

export default Model;