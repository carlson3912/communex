import { Suspense, useEffect, useMemo, useState} from 'react'
import { Canvas, useLoader, useFrame, useThree  } from '@react-three/fiber'
// import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { Html, Bounds, useBounds, Stars, useTexture, useGLTF, Sky, SpotLight, Stage, FlyControls} from "@react-three/drei";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
import shirtTwo from '../../assets/tshirt_obj.obj'
import { OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import './three.css'
import colorBack from '../../assets/colorback.png'
import { LightFixt, MetalBase, LightFixtB, NeonSign } from './Assets';


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
        <meshStandardMaterial attach="material" color="black"  />
      </mesh>
    );
  }

  function BackDrop(props) {
    var colorBackT;

      var temp = colorBack;
      colorBackT = useTexture(temp);
    

    return (
      <mesh receiveShadow position={[0, 0, 0]}>
        <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
        { props.scene == 0?
        <meshStandardMaterial attach="material" map={colorBackT} />
        : null }
         { props.scene == 1 || props.scene == 3?
         <meshStandardMaterial attach="material" color="white" />
         : null }
      </mesh>
    );
  }
  function BackDropb() {
    return (
      <mesh receiveShadow position={[0, 0, 0]} rotation={[3.14,0,0]}>
        <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
        <meshStandardMaterial attach="material" color="white" />
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
    // if (props.scene == 1){
    //     temp = silk;
    //   }
      const colorBackT = useTexture(temp);
    return (
      <mesh receiveShadow rotation = {[0,3.14/2,3.14/2]}position={[0, 0, 0]}>
        <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
        { props.scene == 0?
        <meshStandardMaterial attach="material" map={colorBackT} />
        : null }
         { props.scene == 1 || props.scene == 3?
         <meshStandardMaterial attach="material" color="white" />
         : null }
      </mesh>
    );
  }
  function Wallc2r(props) {
    // var temp = colorBack;
    // if (props.scene == 1){
    //     temp = silk;
    //   }
    //   const colorBackT = useTexture(temp);
    return (
      <mesh receiveShadow rotation = {[0,0,3.14/2]}position={[250, 125, -500]}>
        <planeBufferGeometry attach="geometry" args={[250, 500]} />
        <meshStandardMaterial attach="material" color="white"/>
      </mesh>
    );
  }
  function Wallc2b(props) {
    
    return (
      <mesh receiveShadow rotation = {[0,-3.14/2,3.14/2]}position={[500, 125, -250]}>
        <planeBufferGeometry attach="geometry" args={[250, 500]} />
        <meshStandardMaterial attach="material" color="white"/>
      </mesh>
    );
  }
  
  
  function PixelRow(props){
    const begin = []
    for (var i = 0; i < props.cols; i++)
    {
      begin.push(0);
    }
    const [brightness, setBrightness] = useState(begin);
    const height = 500/brightness.length;
    const ycoord = 10;
    const startz = 0;
    
    useFrame((state) => {
      const fractionalPos = Math.floor(state.camera.position.z / -height);
      const brightness_temp = brightness;
      for(let i = 0; i<brightness_temp.length; i++){
            if (brightness_temp[i] > 0){
            brightness_temp[i] -= 0.05;
            }
        }
      if (props.active){
          brightness_temp[fractionalPos] = 11;
          if(fractionalPos > 0){
              brightness_temp[fractionalPos-1] = 11;
          }
          if(fractionalPos <brightness.length-1){
              brightness_temp[fractionalPos+1] = 11;
          }
      
        
      } 
      setBrightness(brightness_temp);
      })
    return(
        <>
        {
      brightness.map((color, index)=>{
          const zcoord = (-height/2)-(index * height);  //zcoord of middle of tile
          
          return(
            <mesh key={"pixelMesh" + index}receiveShadow rotation={[-3.1415/2, 0, 0]} position={[props.xcoord, ycoord, zcoord + startz]}>
                <planeBufferGeometry key={"geometry" + index} attach="geometry" args={[props.xdir, height]}  />
                <meshStandardMaterial  key={"standardMesh" + index} attach="material" color={[color+5,0,20]}  />
                {/* {(zcoord - height/2 < cameraZ < zcoord + height/2) ?  */}
                {/* <meshStandardMaterial attach="material" color="aquamarine"  />  */}
                {/* <meshStandardMaterial emissive={"white"} emissiveIntensity={brightness[index]} key={"standardMesh" + index} attach="material" color={color}  /> */}
            </mesh>
          )
        })}
      </>
      )
  }

  function PixelScreen(props){
      // const listActive = [false, false, false, false, false, false, false, false, false, false, false,false,false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
      const listActive =[];
      for(var i = 0; i < 15; i++ ){
        listActive.push(false);
      }
      const xdir = 500 / listActive.length;
      const [rows, setRows] = useState([]);
      useFrame((state) => {
        const fractionalPos = Math.floor(state.camera.position.x / xdir);
        listActive[fractionalPos] = true;
        if(fractionalPos > 0){listActive[fractionalPos-1] = true;} 
        if(fractionalPos < listActive.length-1){listActive[fractionalPos+1] = true;}
        setRows(listActive);
        
    })
      return(
        <>
          {
            rows.map((status, index)=>{
              return(
              <PixelRow key={"pixelRow: "+index}active={status} xcoord={0+ index*xdir} xdir={xdir} cols={15}/>
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
          
        if(prop.scene == 0){setYRot(yrot+1)};
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
       <meshStandardMaterial map={texture}
        />
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

const CameraController0 = () => {
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
   
    if (props.z != zinner){
        zinnerset(-500)
    };

  
   
    
    return<Suspense fallback={null}>
      <Canvas height="500px"camera={{position:[500,10,props.z]}}>
       {/* First Room */}
        {props.scene == 0 ?
        <>
          <CameraController0/>
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
        
      {/* Second Room */}
        {props.scene==1 || props.scene == 3 ?
            <>
                <CameraController1 />
                <LightFixtB center={[250,100,-250]} scene={props.scene}/>
                {/* <MetalBase /> */}
                <NeonSign />
                
              
                <Startbuttone2 />
                <PixelScreen />
                {/* <ambientLight /> */}
            </>
        : null}

        {/* Room Three */}
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
            {/* <Wallc2b /> */}
            <BackDrop3 scene={props.scene} />
        </>
        
        
        <BasicShirtDisplaySill move={props.move} scene={props.scene} itemt={props.src} name="joker design"/>
        {/* <BackDrop2/> */}
        
        
       {/* <OrbitControls target={cameraTarget} emabled={false}/> */}
    </Canvas>
  </Suspense>

    
}

