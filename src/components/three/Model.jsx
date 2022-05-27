import { Suspense, useState, useMemo, useEffect} from 'react'
import { Canvas,} from '@react-three/fiber'
import { Html, Bounds, useBounds,OrbitControls, Stars, useTexture, useGLTF, Sky, SpotLight, Stage} from "@react-three/drei";
// import { GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
// import { OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import {DesertBiome, DesignThree} from './DesertBiome'
import background from '../../assets/backgroundT.png'
import floortity from '../../assets/floortt.png'
import { DownCylinder, PurpCyliner, LightFixt, MetalBase, LightFixtB } from './Assets';
import {BasicShirtDisplay}  from './Shirts'
import { makeList } from './Textures';
import {Camel} from './Assets';
import * as THREE from "three";
import camelSRS from'../../assets/Camel.obj'
import { OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import { useLoader} from '@react-three/fiber'


function ItemBoard(props){
  console.log(props.name)
 
  return (
    <mesh receiveShadow position={props.loc}>
      <Html transform>
        <div id="itemboardpop">
          <h1>{props.name}</h1>
        </div>
      </Html>
      <planeBufferGeometry attach="geometry" args={[50, 100]} />
      <meshStandardMaterial color="purple"attach="material"/>
    </mesh>
  );
}

function SelectToZoom({ children }) {
  const [loc, setLoc] = useState([0,0,0])
  const[nameProduct, setNameProduct] = useState("unknown")
  const api = useBounds()
  
  return (
    <group onClick={e => (e.stopPropagation(),
    setNameProduct(e.object.name),
    console.log(e.object.name),
     setLoc([e.object.position.x, e.object.position.y+100,e.object.position.z]))} onPointerMissed={(e) => e.button === 0 && api.refresh().fit()}>
      {children}
       
      <ItemBoard loc={loc} name={nameProduct}/>
    </group>
  )
}


function GroundPlane() {
    return (
      <mesh receiveShadow rotation={[-3.14/2, 0, 0]} position={[0, -300, 0]}>
        <planeBufferGeometry attach="geometry" args={[2000,2000]} />
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
  




export const Model = (props) =>{

  console.log("MODEL REFRESH");
  const listItems = makeList();
  const [camelo, setcamelo] = useState(null);
  const portalGeo = new THREE.CylinderGeometry( 120, 120, 20, 32 );
  const[ready, setready] = useState(false);
  const [randb, setrandb] = useState(1);

//   function bum(){
//     console.log("bum");
//   }
//   useEffect(() => {
//     console.log("Use effect called");
//     const loadAll = () =>{
//     const promise1 = new Promise((resolve, reject) => {
     
//             // let onLoad = function () {
//             //   console.log("about to resolve")
//             //  resolve(answer);
//             // };
//             let onProgress = function () { };
//             let onError = function () {
//                 console.log("failure");
//             };
//             console.log("loading all")
//             let manager = new THREE.LoadingManager(bum);
            
//             const loader = new OBJLoader( manager );
// 				loader.load( camelSRS, function ( obj ) {
//           console.log("inside load");
//           console.log("object: " +obj)
// 					setcamelo(obj)

// 				}, onProgress, onError );
//           //   const answer =loader.loadAsync(camelSRS, onLoad, onProgress, onError).then((value)=>{console.log("async thened:" +answer)});
//           // console.log("answer: " + answer);

//       // console.log("Loading All");
      
//       // // const loader = new OBJLoader();
//       // // const objCamel = loader.load(camelSRS)
//       // const objCamel = new useLoader(OBJLoader, camelSRS);
//       // console.log("Loading All2");
     

 
//       // resolve(objCamel);

      
//     });
//     return promise1;
//   }
//   loadAll().then((value) => {
//       console.log("success");
//       console.log("value:"+ value);
//       console.log("load all done");
//       setcamelo(value);
//       console.log("camelo:" +camelo)
//       // setready(true);
//       // expected output: "Success!"
//     });
//     // promise1.then((value) => {
//     //   console.log(value);
//     //   // expected output: "Success!"
//     // });
    
   
// }, [])
  // const objCamel = useLoader(OBJLoader, camelSRS);
  // const geomCamel = useMemo(() => {
  //   let g;
  //   objCamel.traverse((c) => {
  //     if (c.type === "Mesh") {
  //       const _c = c;
  //       g = _c.geometry;
  //     }
  //   });
  //   return g;
  // }, [objCamel]);
 
  return(
  <>
 
  <button onClick={e=>setrandb(randb+1)}>Temp</button>
  {/* { ready ?  */}
  <Canvas height="100%"camera={{position: props.cam, rotation:[3.14/2,0,3.14/2]}}>
      {/* Change the margin on the bounds in order to alter the zoom on the camera */}
      <Suspense fallback={null}>
      <Camel loc={[700,2,310]} rot={[0,-Math.PI / 1.2,0]}/>
      <Camel loc={[640,2,-330]} rot={[0,-Math.PI /7,0]}/>
      <MetalBase />
      <Bounds fit clip margin={0.25}>   
      <SelectToZoom>
        
      {/* <SceneThree start='0' name = "shirt1" itemt={shirtThree}/> */}
      {
        
        listItems.map(shirt=>{
          const name = shirt.name;
          const posi = shirt.posi;
          const src = shirt.src;
          return(
            <BasicShirtDisplay name={name} start ={posi * -100} itemt={src} />
          )
        })
      }
    {/* <PurpCyliner /> */}
    <DownCylinder geom={portalGeo}/>
    <LightFixtB />
    {/* <GroundPlane /> */}
    {/* <BackDrop /> */}
    {/* <Sphere /> */}
    {/* <mesh receiveShadow position={[0, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[500, 500]} />
      <meshStandardMaterial attach="material" color="white" />
    </mesh> */}
    {/* <Sky /> 
    <Stage /> */}
      <DesertBiome />
   </SelectToZoom>
   </Bounds>
    
    </Suspense>
  

    <OrbitControls target={props.loc}/>
    <ambientLight intensity={0.5} />
    <pointLight position={[-2040,0,-20]}/>
    {/* <rectAreaLight
      width={100}
      height={800}
      color="red"
      brightness={100}
      position={[-1140,0,-20]}
      lookAt={[0, 0, 0]}
    //   penumbra={1}
    castShadow
    /> */}
       </Canvas>
       {/* : null } */}
       </>
       )
}

export default Model;