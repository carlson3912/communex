import { Suspense, useEffect, useMemo, useState} from 'react'
import { Canvas, useLoader, useFrame, useThree  } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { Html, Bounds, useBounds, Stars, useTexture, useGLTF, Sky, SpotLight, Stage, FlyControls} from "@react-three/drei";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
import shirtTwo from '../../assets/tshirt_obj.obj'
import silk from '../../assets/tryshirt3.jpeg'
import shirt from '../../assets/doubleshirts.gltf'
import { GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import { OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import './three.css'
import background from '../../assets/backgroundT.png'
import colorBack from '../../assets/colorback.png'
import joker from '../../assets/jokerdiscord.jpeg'
import floortity from '../../assets/floortt.png'
import { LightFixt } from './Assets';

import { makeList } from './Textures';

function RGBBars(props){
    const rV = parseInt(props.color[1]+props.color[2],16) / 255.0;
    const gV = parseInt(props.color[3]+props.color[4],16) / 255.0;
    const bV = parseInt(props.color[5]+props.color[6],16) / 255.0;
    // console.log("rv: "+rV);
        const Rgeometry = new THREE.CylinderGeometry( 20, 20, rV * 175, 32 );
        const Bgeometry = new THREE.CylinderGeometry( 20, 20, gV * 175, 32 );
        const Ggeometry = new THREE.CylinderGeometry( 20, 20, bV * 175, 32 );
        // const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );  
        return(
            <>
            <mesh position = {[70,rV * 87.5 + 50,200+75]}  geometry={Rgeometry}   rotation={[0,0,0]}> 
             <meshStandardMaterial color="red" emissive={"red"}
        emissiveIntensity={1}/>
             
            </mesh>
            <mesh position = {[115,gV * 87.5 + 50,225+75]}  geometry={Bgeometry}   rotation={[0,0,0]}> 
            <meshStandardMaterial color="green" emissive={"green"}
        emissiveIntensity={1}/>
            
           </mesh>
           <mesh position = {[70,bV * 87.5 + 50, 250+75]}  geometry={Ggeometry}   rotation={[0,0,0]}> 
           <meshStandardMaterial color="blue" emissive={"blue"}
        emissiveIntensity={1}/>
           
          </mesh>
          </>
        )

}

function GroundPlane() {
    return (
      <mesh receiveShadow rotation={[-3.1415/2, 0, 0]} position={[0, -1, 0]}>
        <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
        <meshStandardMaterial attach="material" color="grey"  />
      </mesh>
    );
  }

  function Roof() {
    return (
      <mesh receiveShadow rotation={[3.1415/2, 0, 0]} position={[0, 249, 0]}>
        <planeBufferGeometry attach="geometry" args={[2000, 1000]} />
        <meshStandardMaterial attach="material" color="white"  />
      </mesh>
    );
  }

  function BackDrop(props) {
    var temp = colorBack;
    if (props.scene == 1){
        temp = silk;
      }
      const colorBackT = useTexture(temp);
    return (
      <mesh receiveShadow position={[0, 0, 0]}>
        <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
        <meshStandardMaterial attach="material" map={colorBackT} />
       
      </mesh>
    );
  }
  function BackDropb() {
    return (
      <mesh receiveShadow position={[0, 0, 0]} rotation={[3.14,0,0]}>
        <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
        <meshStandardMaterial attach="material" color="purple" />
      </mesh>
    );
  }

  

  function BottomC(){
    const geometry = new THREE.CylinderGeometry( 75, 75, 10, 32 );
      return(
        <mesh position={[92.5, 50, 225+75]} geometry={geometry}   rotation={[0,0,0]}> 
             <meshStandardMaterial color="pink" />
             
            </mesh>
      )
  }

  function BottomC2(){
    const geometry = new THREE.CylinderGeometry( 75, 75, 10, 32 );
      return(
        <mesh position={[92.5, 60+87.5 *2, 225+75]} geometry={geometry}   rotation={[0,0,0]}> 
             <meshStandardMaterial color="pink"   />
             
            </mesh>
      )
  }

  function BottomC3(){
    const geometry = new THREE.CylinderGeometry( 75, 75, 87.5*2, 32 );
      return(
        <mesh position={[92.5, 60+87.5, 225+75]} geometry={geometry}   rotation={[0,0,0]}> 
             <meshStandardMaterial color="blue" opacity="0.4" transparent={true}/>
             
            </mesh>
      )
  }

  function BottomC4(props){
    // const base = useLoader(THREE.TextureLoader, joker);
    const geometry = new THREE.CylinderGeometry( 75, 75, 50, 32 );
      return(
        <mesh position={[92.5, 50-35, 225+75]} geometry={geometry}   rotation={[0,0,0]}> 
             <meshStandardMaterial color={props.color} emissive={props.color}
        emissiveIntensity={1} />
             
            </mesh>
      )
  }

//   function BackDrop2() {
//     return (
//       <mesh receiveShadow rotation = {[3.14,0,0]}position={[0, 0, 0]}>
//         <planeBufferGeometry attach="geometry" args={[500, 500]} />
//         <meshStandardMaterial attach="material" color="blue" />
//       </mesh>
//     );
//   }


  function BackDrop3(props) {
    var temp = colorBack;
    if (props.scene == 1){
        temp = silk;
      }
      const colorBackT = useTexture(temp);
    return (
      <mesh receiveShadow rotation = {[0,3.14/2,3.14/2]}position={[0, 0, 0]}>
        <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
        <meshStandardMaterial attach="material" map={colorBackT}/>
      </mesh>
    );
  }
  function Wallc2r(props) {
    var temp = colorBack;
    if (props.scene == 1){
        temp = silk;
      }
      const colorBackT = useTexture(temp);
    return (
      <mesh receiveShadow rotation = {[0,0,3.14/2]}position={[250, 125, -500]}>
        <planeBufferGeometry attach="geometry" args={[250, 500]} />
        <meshStandardMaterial attach="material" map={colorBackT}/>
      </mesh>
    );
  }
  function Wallc2b(props) {
    var temp = colorBack;
    if (props.scene == 1){
        temp = silk;
      }
      const colorBackT = useTexture(temp);
    return (
      <mesh receiveShadow rotation = {[0,-3.14/2,3.14/2]}position={[500, 125, -250]}>
        <planeBufferGeometry attach="geometry" args={[250, 500]} />
        <meshStandardMaterial attach="material" map={colorBackT}/>
      </mesh>
    );
  }
  
  function PixelRow(props){
    const [bum , setbum] = useState([]);
    // var listItems = ["aquamarine","blue","purple","pink","yellow","green","purple","orange","brown", "green"];
    // var listItems = [ "black", "black", "black", "black", "black", "black", "black", "black", "black", "black"];
    var listItems = [ "white",  "white",  "white",  "white",  "white",  "white", "white",  "white",  "white", "white"];
    const height = 500/listItems.length;
    //   const [cameraZ, setCameraZ] = useState(0);
    const ycoord = 10;
    const startz = 0;
    const [eIntent, setEIntent] = useState(0);
    const [brightness, setBrightness] = useState([0,0,0,0,0,0,0,0,0,0,0]);
    useFrame((state) => {
      const fractionalPos = Math.floor(state.camera.position.z / -height);
      const brightness_temp = brightness;
        
      for(let i = 0; i<brightness_temp.length; i++){
            if (brightness_temp[i] > 0){
            brightness_temp[i] -= 0.1;
            }
        }
        setBrightness(brightness_temp);
    if (props.active){
        brightness_temp[fractionalPos] = 11;
         
          setEIntent(fractionalPos);
          //   console.log(fractionalPos);
          //   console.log("bounds: "+(zcoord - height/2)+(zcoord + height/2))
        //   setCameraZ(fractionalPos);
        // console.log(listItems[fractionalPos]);
        if(fractionalPos > 0){
            listItems[fractionalPos-1] = "red";
            brightness_temp[fractionalPos-1] = 11;
        }
        if(fractionalPos <listItems.length-1){
            listItems[fractionalPos+1] = "red";
            brightness_temp[fractionalPos+1] = 11;
        }
        listItems[fractionalPos] = "red";
       
    } 
    else{
        setEIntent(0)
    }
        setbum(listItems);
    
      })
      return(
          <>
          {
        bum.map((color, index)=>{
            const zcoord = (-height/2)-(index * height);  //zcoord of middle of tile
            var emit = 0;
            if (index == eIntent){emit= 1}
            return(
            <mesh key={"pixelMesh" + index}receiveShadow rotation={[-3.1415/2, 0, 0]} position={[props.xcoord, ycoord, zcoord + startz]}>
                <planeBufferGeometry key={"geometry" + index} attach="geometry" args={[50, height]}  />
                {/* {(zcoord - height/2 < cameraZ < zcoord + height/2) ?  */}
                {/* <meshStandardMaterial attach="material" color="aquamarine"  />  */}
                
                 {/* <meshStandardMaterial emissive={"white"} emissiveIntensity={brightness[index]} key={"standardMesh" + index} attach="material" color={color}  /> */}
                 <meshStandardMaterial  key={"standardMesh" + index} attach="material" color={[brightness[index]+5,0,20]}  />
                </mesh>
            )
          })}
       </>
      )
  }

  function PixelScreen(props){
      const listActive = [false, false, false, false, false, false, false, false, false, false, false,false,false, false, false];
      const xdir = 500 / listActive.length;
      const [bum, setbum] = useState([]);
      useFrame((state) => {
        const fractionalPos = Math.floor(state.camera.position.x / xdir);
        listActive[fractionalPos] = true;
        if(fractionalPos > 0){listActive[fractionalPos-1] = true;}
        // console.log("row: "+fractionalPos)
        // console.log("length:" +listActive.length)
        if(fractionalPos < listActive.length-1){listActive[fractionalPos+1] = true;}
        setbum(listActive);
        
        // state.camera.position.y = state.camera.position.y+1;
    })
      return(
        <>
        {
      bum.map((status, index)=>{
          return(
          <PixelRow key={"pixelRow: "+index}active={status} xcoord={0+ index*50}/>
          )
      })
      }
      </>
      )
  }
  function BackDrop3b() {
    return (
      <mesh receiveShadow rotation = {[0,-3.14/2,3.14/2]}position={[0, 0, 0]}>
        <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
        <meshStandardMaterial attach="material" color="pink" />
      </mesh>
    );
  }

  function Startbuttone(){
    //   console.log("start");
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
    // console.log("start");
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
    // console.log("start");
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
   
    const [x, setx] = useState(125);
    const [y, sety] = useState(10);
    const [z, setz] = useState(125);

    useFrame((state) => {
       
            // state.camera.zoom += 0.1;
            // state.camera.position.set([100,100,100]);
            // state.camera.position.lerp([0,0,0], 0.5)
            // state.camera.
            // state.camera.updateProjectionMatrix()
          
        if(prop.scene != 1){setYRot(yrot+1)};
        if(prop.move && prop.scene==1 && z>-250){
            setz(z-1);
            setx(50);
            // state.camera.lookAt.setz(z);
            // state.camera.updateProjectionMatrix();
        }
        // if(prop.move && prop.scene==1 && x>-100){setx(-100);}
        if(prop.move && prop.scene==2 && x>-125){setx(x-1);}
    });
    const texture = useTexture(prop.itemt);
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
     <mesh rotation-y={Math.PI * 0.005*yrot} name={prop.name} castShadow position={[x+200 ,y, z]}geometry={geometry} >
         {/* <Sky /> */}
       <meshStandardMaterial map={texture} emissive={prop.color}
        emissiveIntensity={1}
        side={THREE.DoubleSide}/>
     </mesh>
     </>
   )
 }
 function ColorMaker(props){
    return(
        <>
        <BottomC />
        <BottomC2 />
        <BottomC3 />
        <BottomC4 color={props.color}/>
        <RGBBars color={props.color}/>
        </>
    )
}

const CameraController0 = (props) => {
    const { camera, gl } = useThree();
    useEffect(
      () => {
        const controls = new OrbitControls(camera, gl.domElement);
  
        
        controls.minDistance = 300;
        controls.maxDistance = 600;
        controls.maxPolarAngle = Math.PI/2; //up and down angle
        controls.minPolarAngle = Math.PI/3;
        controls.minAzimuthAngle = 0;
        controls.maxAzimuthAngle = Math.PI/2; //sidways angle

        return () => {
          controls.dispose();
        };
      },
      [camera, gl]
    );
    return null;
  };
  const CameraController1 = (props) => {
    const { camera, gl } = useThree();
    useEffect(
      () => {
        const controls = new OrbitControls(camera, gl.domElement);
        camera.position.set(250,75,-350);
        controls.target = new THREE.Vector3(250, 75, -250);
       
        controls.minDistance = 100;
        controls.maxDistance = 250;
        controls.maxPolarAngle = Math.PI/2;
        controls.minPolarAngle = 3.14/3;

        return () => {
          controls.dispose();
        };
      },
      [camera, gl]
    );
    return null;
  };

export const InsideDesigner= (props) => {
    const [zinner, zinnerset] = useState(500);
    // const [cameraTarget, setCameraTarget] = useState([0,0,0])
//   console.log("props:" + props.src);
// console.log("props.color: " + props.color);
    var cameraTarget = [0,0,0];
    if (props.z != zinner){
        zinnerset(-500)
    };
    if (props.scene == 1){
        cameraTarget = [325,50,-250];
    } 
//  console.log("z: "+zinner);
// useFrame(() => {
   
// },[])
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
        <>
        <CameraController0 scene={props.scene}/>
        <ColorMaker color={props.color}/>
        <Startbuttone />
        <rectAreaLight
            width={250}
            height={700}
            color={props.color}
            intensity={1}
            position={[400,80, 200]}
            rotation={[0,3.14/4,0]}
            lookAt={[200, 80, -800]}
            castShadow
        />
        </>
        : null}
        
        {props.scene==1?
            <>
                <CameraController1 scene={props.scene}/>
                <LightFixt />
                <pointLight
                    color="white" 
                    intensity={0.5} 
                    position={[125, 200, -125]} 
                />
                <Startbuttone2 />
                <PixelScreen />
                {/* <ambientLight /> */}
            </>
        : null}
        {props.scene==2?
            <>
                <Startbuttone3 />
                <ambientLight />
                <LightFixt />
            </>
            : null}
        
        <>
        {/* Building structure */}
            <GroundPlane />
            <Roof />
            <BackDrop scene={props.scene} />
            <BackDropb />
            <BackDrop3b />
            <Wallc2r />
            <Wallc2b />
            <BackDrop3 scene={props.scene} />
        </>
        
        
        <BasicShirtDisplaySill move={props.move} scene={props.scene} itemt={props.src} name="joker design"/>
        {/* <BackDrop2/> */}
        
        
       {/* <OrbitControls target={cameraTarget} emabled={false}/> */}
    </Canvas>
    </Suspense>

    
}

