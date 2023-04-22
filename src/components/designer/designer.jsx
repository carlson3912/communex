import './designer.css';
import React, {useState, useEffect, useRef} from 'react'
import logo from '../../assets/seller1.png';
import * as THREE from 'three';
import {  Link } from "react-router-dom";
import waterMark from "../../assets/srswater.png";
import down from '../../assets/download.png';
import arrow from '../../assets/upArrow.png';
// import {arrayify, hexlify} from "@ethersproject/bytes";
import {create} from 'ipfs-http-client';
// import { encrypt, decrypt, PrivateKey } from 'eciesjs';
import "ethereumjs-util";
import ShowHide from './showandhide';
// import { keccak256 } from '@ethersproject/keccak256';
import {encryptString, decryptString, privateToPublicMe, privateToWalletMe} from '../decrypt/eth-encrypt';
import visten from '../../assets/manu1.jpg'
import { ItemView } from '../three/ItemView';
import Model from '../three/Model';
import { InsideDesigner } from '../three/InsideDesigner';


export const Designer = () =>{
    const canvas = useRef(null);
    const [numElements, setNumElements] = useState(0);
    const[images, setImages] = useState([]);
    const [top,setTop] = useState('1');
    const [pos, setPos] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [rots, setRots] = useState([]);
    const [pointer, setPointer] = useState(-1);
    const [water, setWater] = useState(false);
    const [ipfs, setIPFS] = useState();
    const [penI, setPendingImage] = useState(false);
    const[threedmock, set3dmock] = useState(visten);
    const [shirtColor, setShirtColor] = useState("white");
    const [scene, setScene] = useState(0);
    const [zcamera, setZCamera] = useState(500);
    const[move, setMove] = useState(false);
    const [ipfsLink, setIpfsLink] = useState("");
    const waterImage = new Image();
    const [childData, setChildData] = useState("");
    

    waterImage.src = waterMark;


    // function saveAsImage() {
    //     var imgData, imgNode;
    //     var renderer;
    //     var strDownloadMime = "image/octet-stream";
    //     renderer = new THREE.WebGLRenderer({
    //         preserveDrawingBuffer: true
    //     });
    //     renderer.setSize(window.innerWidth, window.innerHeight);
        
    //     try {
    //         var strMime = "image/jpeg";
    //         imgData = renderer.domElement.toDataURL(strMime);

    //         saveFile(imgData.replace(strMime, strDownloadMime), "test.jpg");

    //     } catch (e) {
    //         console.log(e);
    //         return;
    //     }

    // }

    // var saveFile = function (strData, filename) {
    //     var link = document.createElement('a');
    //     if (typeof link.download === 'string') {
    //         document.body.appendChild(link); //Firefox requires the link to be in the body
    //         link.download = filename;
    //         link.href = strData;
    //         link.click();
    //         document.body.removeChild(link); //remove the link when done
    //     } 
    // }
    function submitPage(){
        sessionStorage.setItem("designSubmission", childData)
        sessionStorage.setItem("mapSubmission", threedmock)
        window.location.href = "../Submit"
    }

    function changeRot(direction){
        console.log("Current rot:  "+rots[pointer]);
        var tempRot = rots;
   
        tempRot[pointer] = 180 * (direction-150)/150;
        console.log(direction);
        setRots(tempRot);
        setTop(top+1);
    }

    function deleteImage(){
        console.log("Delete initiated at: "+ pointer );
        setNumElements(numElements-1);
        console.log("num elements decreased")
        var temp = images;
        temp.pop(pointer);
        setImages(temp);
        var tempP = pos
        tempP.pop(pointer);
        setPos(tempP);
        var tempS = sizes
        tempS.pop(pointer);
        var tempR = rots;
        tempR.pop(pointer);
        setRots(tempR);
        console.log("popped pointer at")
        setSizes(tempS);
        if (pointer != 0){
            setPointer(pointer - 1);
        }
        console.log(pointer);
        
        setPendingImage(false);
        setTop(top+1)
    }

    function dataURItoBlob(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ia], {type:mimeString});
        }
    
    const handleInputChangeIPFS = (event) => {
        const temp = event.target.value;
        if (temp.length == 32){
            console.log("IPFS CID detected: " + temp);
        }
        const upImage = new Image();
        upImage.onload = function(){
            var tempSiz = sizes;
            tempSiz.push([this.width,this.height]);
            setSizes(tempSiz);
        }
        upImage.src = "https://ipfs.io/ipfs/"+temp;
        // setImage(upImage);
        upImage.setAttribute('crossorigin', 'anonymous');
        var tempImage = images;
        tempImage.push(upImage);
        setImages(tempImage);
        setPointer(pointer+1);
        setNumElements(numElements+1);
        var tempPos = pos;
        tempPos.push([0,0]);
        setPos(tempPos);
        setPendingImage(true);
        
    }

    const handleInputChange = (event) => {
        //add image
        //doesnt allow more than 4 images to be uploaded to a shirt
        if(images.length > 4){
            return
        }
        const temp = URL.createObjectURL(event.target.files[0]);
        const upImage = new Image();
        upImage.onload = function(){
            var tempSiz = sizes;
            tempSiz.push([this.width,this.height]);
            setSizes(tempSiz);
        }
        upImage.src = temp;
        // setImage(upImage);
        var tempImage = images;
        tempImage.push(upImage);
        setImages(tempImage);
        setPointer(pointer+1);
        setNumElements(numElements+1);
        var tempPos = pos;
        tempPos.push([270,320]);
        setPos(tempPos);
        var tempRot = rots
        tempRot.push(0);
        setRots(tempRot);
        setPendingImage(true);
        console.log("Rots: "+ rots);
        // setPI(event.target.files[0]);
      }

 

    function drawRot(ctx,i){
        // canvas.translate(pos[i][0] +  sizes[i][0] / 2, pos[i][1] + sizes[i][1] / 2);
        // canvas.rotate(Math.pi/2);
        // canvas.drawImage(images[i],pos[i][1]/2 * -1 ,pos[i][0]/2*-1, sizes[i][0], sizes[i][1]);
        // canvas.rotate(-Math.pi/2);
        // canvas.translate(pos[i][0] + sizes[i][0] / 2 * -1, pos[i][1] + sizes[i][1] / 2 * -1);
        ctx.save();
        ctx.translate(pos[i][0],pos[i][1]);
        ctx.rotate(Math.PI/180 * rots[i]);
        ctx.translate(0,0); //check
        ctx.drawImage(images[i],0-sizes[i][0]/2,0-sizes[i][1]/2,sizes[i][0],sizes[i][1]);
        ctx.restore();
    }
    
    useEffect(() =>{
        if(canvas){
            console.log("Rots" + rots);
            const ctx=canvas.current.getContext("2d");
            ctx.clearRect(0, 0, 5000, 5000);
            // ctx.clearRect(0, 0, 2000, 2000);
            
            ctx.fillStyle = shirtColor;
            ctx.fillRect(0, 0, 2000, 2000);
            // ctx.drawImage(shirt,70,0,700,800);
            for(var i = 0; i<numElements; i++){
                drawRot(ctx,i);
                // ctx.drawImage(images[i],pos[i][0],pos[i][1], sizes[i][0], sizes[i][1]);
            }
            if (water){
                ctx.drawImage(waterImage,-500,-500,2000,2000);
            }
            set3dmock(canvas.current.toDataURL('image/jpeg',1));
            

        }
    },[top, pos, water, shirtColor, rots])


    const click = ({nativeEvent}) => {
        const x = nativeEvent.offsetX;
        const y = nativeEvent.offsetY;
        for (var i = 0; i<numElements; i++){
            if (x > pos[i][0] && x < pos[i][0]+sizes[i][0]){
                if (y > pos[i][1] && y < pos[i][1]+sizes[i][1]){
                    setPointer(i);
                    console.log("found match: "+i);
                    break;
                }
            }
        }
        
    }

    async function infura(e){
        // const ipfsClient = require('ipfs-http-client');
        const projectId = '28zAasknKw7w7ViLtFtNtxkNdCz';
        const projectSecret = 'ca916af6aecabd19b54015a2661681c4';
        const auth ='Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
        const client = create({
            host: 'ipfs.infura.io',
            port: 5001,
            protocol: 'https',
            headers: {
                authorization: auth,
            },
        });
        // const link = document.createElement("a");
        // link.href=e;
        // link.download ="text.txt"
        console.log("Right before server add")
        await client.add(dataURItoBlob(e)).then((res) => {
        //    console.log(res.path);
        //    metaJson("https://ipfs.io/ipfs/"+res.path);
            // metaJson("ipfs://"+res.path, shirtColor);
            metaJson("ipfs://"+childData, shirtColor);
            sessionStorage.setItem("designSubmission", childData)
            // sessionStorage.setItem("jsonFile", "ipfs://"+childData)
        });
        
        window.location.href = "../Submit"

    }

    const designSpecs = () => {
        var str = "Design Details \n";
        console.log("test: "+pos[0][0].toString())
        str = str + "Manufacturer: Visten Co.\n";
        str = str + "Shirt Style: 0x1\n";
        str = str + "Shirt color: "+shirtColor+"\n";
        

        for (var i = 0; i<numElements; i++){
            str = str + "**** NEW IMAGE ****" + "\n";
            str = str + "Image source: " + images[i].src + "\n";
            str = str + "xPos: " + pos[i][0] + "\n";
            str = str +  "yPos: " + pos[i][1] + "\n";
            str = str +  "Width: " + sizes[i][0] + "\n";
            str = str + "Height: " + sizes[i][1] + "\n";
        }

        const priv = 'ead75d17f3748b52b863f9358cdc9646fa6caf66399919d375ea6339639d909a';
        const pub = privateToPublicMe(priv);
        var blob = new Blob(
            // [encryptString(str,pub)],
            [str],
            { type: "text/plain;charset=utf-8" });
        const text = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = text;
        link.download ="text.txt"
        link.click();
        }
    
    const metaJson = async(input, colorIn) => {
        const projectId = '28zAasknKw7w7ViLtFtNtxkNdCz';
        const projectSecret = 'ca916af6aecabd19b54015a2661681c4';
        const auth ='Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
        const client = create({
            host: 'ipfs.infura.io',
            port: 5001,
            protocol: 'https',
            headers: {
                authorization: auth,
            },
        });
        const answer = JSON.stringify({ dna: "bum1292193", name: "Bummy First Drop", description:"this is a bummy test", image:input,edition:1, date:"bum oclock", attributes:{color: colorIn} });
        await client.add(answer).then((res) => {
            //    console.log(res.path);
               console.log("https://ipfs.io/ipfs/"+res.path);
               console.log("submitted:" + answer);

               
            });

    }
    return(
        <div id = "fullDesign">
            <Link to ="">
            <div id="rightBackground">
            
                <h1>Restart</h1>
        
            </div>
            
            </Link>
            {scene==1 ?  
                 
            <div id="bottomDesigner1">
                <button onClick={e=>setScene(2)}>Done Editing</button>
            </div>
                    :null}
            {scene==1 && images.length>0 &&top>1?
            <div id="rightImage">
                <div id="imgselect">
                    <h1>Image Selector</h1>
                {
                    images.map((img, index)=>{
                        if (index == images.length-1 && penI){
                            return
                        }
                        return(
                            <div id="imgBox" onClick={e=>setPointer(index)}>
                                <div id="smallImage">
                                    <img src={img.src} height="70px" />
                                </div >
                                <div id="imgNum">
                                    <h3>Size: {parseInt(sizes[index][0])}, {parseInt(sizes[index][1])}</h3>
                                    <h3>Coordinates: {pos[index][0]}, {pos[index][1]} </h3>
                                    <h3>Rotation: {rots[index]}</h3>
                                    <h1>{index + 1}</h1>
                                </div>
                                <br />
                            </div>
                            
                            
                        )
                    })
                }
            </div>
           
            </div>
             :null}
              {scene==1?
              <div id="topOfDesign">
                        <div id="rdco">
                            
                            
                            <label id="uploadLabel">
                            <div id="blueUp">
                            <input type="file" id="cancelUpload" onChange={handleInputChange} accept=".jpeg, .jpg, .png"/>
                                <img id="downimage"width="50px"height="50px"src={down}/>
                                <h3 id="downtext">Upload Image</h3>
                            </div>
                            </label>
                            {/* <label id="uploadLabel" onClick={e=>setIPFS(true)}>
                            <div id="blueUp">
                                <img id="downimage"width="50px"height="50px"src={down}/>
                                <h3 id="downtext">By IPFS</h3>
                            </div>
                            </label> */}
                            {/* { ipfs ?
                                <input type="text" id="ipfsUpload"onChange={handleInputChangeIPFS} /> 
                            : null} */}
                            { penI ? 
                                <div id="pendingImage">
                                    <ShowHide source={images[pointer].src} /> 
                                    <div id="pendingImageOption">
                                        <button onClick={e=>{setTop(top+"1");setPendingImage(false);}}>Use picture</button>
                                        <button onClick={e=>{deleteImage();setIPFS(false)}}> Cancel</button>
                                    </div>
                                </div> 
                            : null }           
                        
                        
                        </div>
                    </div>
                    :null}
             
            <div id="modelBackground">
                
                
                {scene==0 ?
             <div id = "scene0">
                <h1>Color Picker</h1>
                        <input id="shirtColorPicker3" type="color" name="head" value={shirtColor} onChange={e=>{setShirtColor(e.target.value)}}/>
               
                   
                    <label for="head">Pick Your Shirt Color</label>
                <button onClick={e=>{{setScene(1)};setZCamera(-500);setMove(true)}}>Use Color</button>
            </div>
             : null}

{scene==1 && images.length > 0 && top > 0?
                <>
                
                <h1>Image Editor</h1>
                
                
                <div id="rightDesign2">
               
                
                {/* <div id="rdco" >
                        <button onClick={e=>setScene(1)}>Back</button>
                    </div> */}
                   
                   <div id="rdco">
                    <div id="posGroup">
                       
                       <div id='arrowB'>
                        <div id="arrowS2">
                        {/* up */}
                       <button id="arrowU"onClick={e=>{
                           if (pos.length>0){
                                var temp = pos
                                temp[pointer][1] = pos[pointer][1] - 10;
                                setPos(temp);
                                setTop(top+1);
                            }
                            }}><img src={arrow} height="50px"></img></button>
                        </div>
                        {/* left */}
                        <div id="arrowS2">
                           <div id="arrowS">
                                <button onClick={e=>{
                                    if (pos.length>0){
                                        var temp = pos
                                        temp[pointer][0] = pos[pointer][0] - 10;
                                        setPos(temp);
                                        setTop(top+1);
                                    }
                                    }} id="lbut"><img width="50px"src={arrow}></img></button>
                                    {/* down */}
                                <button onClick={e=>{
                                    if (pos.length>0){
                                        var temp = pos
                                        temp[pointer][1] = pos[pointer][1] + 10;
                                        setPos(temp);
                                        setTop(top+1);
                                    }
                                }}><img id="dbut"src={arrow} height="50px"></img></button>
                                {/* right */}
                                <button onClick={e=>{
                                    if (pos.length>0){
                                        var temp = pos;
                                        temp[pointer][0] = pos[pointer][0] + 10;
                                        console.log(temp[pointer][0]);
                                        setPos(temp);
                                        setTop(top+1);
                                    }
                                }}><img id="rbut"src={arrow} width="50px"></img></button>
                            </div>
                            </div>
                               
                    </div>
                    </div>
                   </div>
                    <div id="rdco">
                      
                       
                        
                        <button onClick={e=>{
                            if (pos.length>0){
                                var temp = sizes;
                                temp[pointer][0] = temp[pointer][0] * 0.8;
                                temp[pointer][1] = temp[pointer][1] * 0.8;
                                setSizes(temp);
                                setTop(top+1);
                            }
                            }}>Shrink</button>
                        <button onClick={e=>{
                            if (pos.length>0){
                                var temp = sizes;
                                temp[pointer][0] = temp[pointer][0] * 1.2;
                                temp[pointer][1] = temp[pointer][1] * 1.2;
                                setSizes(temp);
                                setTop(top+1);
                            }
                        }}>Enlarge</button>
                    </div>
                    <input type="range" min='1'max="300"onChange={e=>changeRot(e.target.value)}></input >
                    
                    <br />
                    {/* <div id="rdco" >
                 
                        <button onClick={e => changeRot(1)}> Rotate Right</button>
                        <button onClick={e => changeRot(-1)} > Rotate Left</button>
                       
                    </div> */}

                    {/* <div id="rdco" >
                        <button onClick={deleteImage}>Clear</button>
                        <button onClick={e=>setScene(2)}>Done Editing</button>
                    </div> */}
                    </div>
                    
                    </>
                : null}

{scene==2?
                   <div>
                        <h2>Complete</h2>
                        <div id="rightDesign2">
                            <h1>Finishing Touches</h1>
                            <button onClick={e=>{
                                if (water){
                                    setWater(false)
                                }
                                else{
                                    setWater(true);
                                }
                            }}> Toggle Water Mark</button>   
                            <button onClick={designSpecs}>Download Report</button>
                            {childData ==''?
                            <div id="checkCamera">
                                <h2>Press the Camera to Take Your Photo</h2>
                            </div>
                            : null}  
                    </div>
                    {childData !=''?
                        <div >
                            {/* <button  id="finishDButton" onClick={e=>{
                                    const canvas = document.getElementById("upCanvas");
                                    const image = canvas.toDataURL('image/jpeg');
                                    infura(image);
                                    // metaJson();
                                    console.log(image.src);
                                    // const link = document.createElement("a");
                                    // link.href=image;
                                    // link.download ="main.jpg"
                                    // link.click();
                                }}> */}
                            {/* <h1>Finish Design</h1>
                            <p>Upload to IPFS</p> */}
                            {/* </button> */}
                           
                                <div>
                                    <h1>Your image:</h1>
                                    <img src={childData}/>
                                    <button onClick={e=>{submitPage()}}>I'm happy with how it looks</button>
                                </div>
                            
                        </div>
                         : null}  
                    </div>
                : null}    
            </div>
            <div id="dd2model">
            {/* <Model loc={[-1500,0,0]} cam={[-1500,0,-2000]}/> */}
                <InsideDesigner src={threedmock} scene={scene} z={zcamera} move={move} color={shirtColor} parent={setChildData} />
            
            </div>
            
           
            
            
             
             {/* Hidden 2-D Canvas for designing */}
             <canvas ref={canvas} id="upCanvas" height="1000px" width="1000px" onMouseDown={click} hidden={true}><h1>Hello</h1></canvas>
               
                
                
            </div>
    )
}

export default Designer;