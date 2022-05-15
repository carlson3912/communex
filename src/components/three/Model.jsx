import { Suspense, useMemo, useState} from 'react'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { Bounds, useBounds,OrbitControls, Stars, useTexture, useGLTF, Sky, SpotLight, Stage} from "@react-three/drei";
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
import saleBanner from '../../assets/saleBanner.png'
import background from '../../assets/backgroundT.png'
import cylinderC from '../../assets/cylinderC.obj'
import floor from '../../assets/floor.png'
import floortity from '../../assets/floortt.png'
import realShirt from '../../assets/firstreal.jpeg'
import secondreal from '../../assets/secondreal.png'
import {FirstShirt}  from './Shirts'
import { makeList } from './Textures';


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
  return (
    <mesh receiveShadow position={props.loc}>
      <planeBufferGeometry attach="geometry" args={[200, 200]} />
      <meshStandardMaterial attach="material"/>
    </mesh>
  );
}

function SelectToZoom({ children }) {
  const [loc, setLoc] = useState([0,0,0])
  const api = useBounds()
  
  return (
    <group onClick={e => (e.stopPropagation(),
    console.log(e.object.name),
     e.delta <= 2 && api.refresh(e.object).fit(), 
     setLoc([e.object.x, e.object.y],e.object.z))} onPointerMissed={(e) => e.button === 0 && api.refresh().fit()}>
      {children}
       
      <ItemBoard loc={loc}/>
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
   <mesh castShadow position={[location, -80, -20]}geometry={geometry} >
     <meshStandardMaterial color="white" opacity="0.1" transparent={true}/>
   </mesh>
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
      <mesh receiveShadow rotation={[-3.14/2, 0, 0]} position={[0, -150, 0]}>
        <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
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

 async function Model() {
  const listItems = await makeList();
  return<Canvas height="100%"camera={{position: [0, 0, 300]}}>
      
      <Suspense fallback={null}>
      <Bounds fit clip margin={1.2}>
      <SelectToZoom>
      {
        
        listItems.map(shirt=>{
          const name = shirt.name;
          const posi = shirt.posi;
          const src = shirt.src;
          return(
            <FirstShirt name={name} start ={posi * -100} itemt={src} />
          )
        })
      }
    {/* <CylinderM start='0'/>
    <SceneThree name = "shirt2" start='-100' itemt={silk}/>
    <CylinderM start='-100'/>
    <SceneThree name = "shirt3" start='-200' itemt={matlab}/>
    <CylinderM start='-200'/>
    <SceneThree name = "shirt4" start='-300' itemt={camel}/>
    <CylinderM start='-300'/>
    <SceneThree start='-400' itemt={moneyFace}/>
    <CylinderM start='-400'/>
    <SceneThree start='-500' itemt={longLine}/>
    <CylinderM start='-500'/>
    <SceneThree start='-600' itemt={mateoTwo}/>
    <CylinderM start='-600'/>
    <SceneThree start='-700' itemt={realShirt}/>
    <CylinderM start='-700'/>
    <SceneThree start='-800' itemt={secondreal}/>
    <CylinderM start='-800'/>
    <SceneThree start='-900' itemt={matlab}/>
    <CylinderM start='-900'/>
    <SceneThree start='-1000' itemt={moneyFace}/>
    <CylinderM start='-1000'/>
    <SceneThree start='-1100' itemt={longLine}/>
    <CylinderM start='-1100'/>
    <SceneThree start='-1200' itemt={mateoTwo}/>
    <CylinderM start='-1200'/>
    <SceneThree start='-1300' itemt={matlab}/>
    <CylinderM start='-1300'/>
    <SceneThree start='-1400' itemt={matlab}/>
    <CylinderM start='-1400'/>
     */}
    
    <GroundPlane />
    <BackDrop />
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
    <rectAreaLight
      width={700}
      height={500}
      color="white"
      brightness={100}
      position={[-20, 0, 340]}
      lookAt={[0, 0, 0]}
    //   penumbra={1}
    castShadow
    />
       </Canvas>

}

export default Model;