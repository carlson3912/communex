import './designer.css';
import React, {useState, useEffect, useRef} from 'react'
import logo from '../../assets/seller1.png';
import shirttemplate from '../../assets/shirttemplate.png'
import { Link } from 'react-router-dom';
import { RiImageLine } from 'react-icons/ri';
import waterMark from "../../assets/srswater.png";
import down from '../../assets/download.png';
import arrow from '../../assets/upArrow.png';
import 'ipfs-http-client';
import ShowHide from './showandhide';

export const Designer = () =>{
    const [numElements, setNumElements] = useState(0);
    const[images, setImages] = useState([]);
    const canvas = useRef(null);
    const [top,setTop] = useState('1');
    const [pos, setPos] = useState([]);
    const shirt = new Image();
    const [sizes, setSizes] = useState([]);
    const [pointer, setPointer] = useState(-1);
    const [water, setWater] = useState(false);
    const [drag, setDrag] = useState(false);
    shirt.src=shirttemplate;
    const waterImage = new Image();
    waterImage.src = waterMark;
    const [ipfs, setIPFS] = useState();
    const [penI, setPendingImage] = useState(false);
    const [pendingIm, setPI] = useState(null);

    function whipeAll(){
        setImages([])
        setSizes([])
        setNumElements(0)
        setPos([])
        setPointer(-1)
    }
    function deleteImage(){
        console.log("Delete initiated at: "+ pointer )
        var temp = images;
        temp.pop(pointer);
        setImages(temp);
        setNumElements(numElements-1);
        temp = pos
        temp.pop(pointer);
        setPos(temp);
        temp = sizes
        temp.pop(pointer);
        setSizes(temp);
        setPointer(pointer - 1);
        setPendingImage(false);
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
    const handleInputChangeI = (event) => {
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
        tempPos.push([0,0]);
        setPos(tempPos);
        setPendingImage(true);
        // setPI(event.target.files[0]);
      }

    useEffect(()=>{
        if(canvas){
            const ctx=canvas.current.getContext("2d");
            ctx.drawImage(shirt,70,0,700,800);
            
        }
  
    },[])

    useEffect(() =>{
        if(numElements>0 && canvas){
            
            const ctx=canvas.current.getContext("2d");
            ctx.clearRect(0, 0, 800, 800);
            ctx.drawImage(shirt,70,0,700,800);
            for(var i = 0; i<numElements; i++){
                console.log("Drawing source" + i);
                console.log("Pointer: "+pointer);
                console.log("Source: "+ images[pointer].src);
                ctx.drawImage(images[i],pos[i][0],pos[i][1], sizes[i][0],sizes[i][1]);
            }
            if (water){
                ctx.drawImage(waterImage,-500,-500,2000,2000);
            }
        }
    },[top, pos, water])


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
        // console.log("pointer: "+pointer)
        // var temp = pos;
        // console.log("xmove: "+nativeEvent.pageX);
        // console.log("ymove: "+nativeEvent.pageY);
        // temp[pointer][0] =temp[pointer][0] + nativeEvent.pageX; 
        // temp[pointer][0] =temp[pointer][1] + nativeEvent.pageY; 
        // setPos(temp);
        // setTop(top+1);
        
    }

    async function infura(e){
        const ipfsClient = require('ipfs-http-client');
        const projectId = '28zAasknKw7w7ViLtFtNtxkNdCz';
        const projectSecret = 'ca916af6aecabd19b54015a2661681c4';
        const auth ='Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
        const client = ipfsClient.create({
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
    console.log("https://ipfs.io/ipfs/"+res.path);
});
    }

    const designSpecs = () => {
        var str = "Design Details \n";
        console.log("test: "+pos[0][0].toString())
        for (var i = 0; i<numElements; i++){
            str = str + "**** NEW IMAGE ****" + "\n";
            str = str+ "Image source: " + images[i].src + "\n";
            str = str+ "xPos: " + pos[i][0] + "\n";
            str = str+  "yPos: " + pos[i][1] + "\n";
            str = str+  "Width: " + sizes[i][0] + "\n";
            str = str+ "Height: " + sizes[i][1] + "\n";
        }
        var blob = new Blob([str],
        { type: "text/plain;charset=utf-8" });
        const text = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href=text;
        link.download ="text.txt"
        link.click();
        }

    return(
        <div>
             <h1>Welcome to the Design Studio</h1>
            <div id="gameboy">
           
                <div id="leftDesigner">
                    <div id="topDesign">
                        <div id="frontback">
                            Front
                        </div>
                        <div id="frontback">
                            Back
                        </div>
                    </div>
                    <canvas ref={canvas} id="upCanvas" height="800px" width="800px" onMouseDown={click}><h1>Hello</h1></canvas>
                </div>
                <div id="rightDesign">
                    <div id="rdco">
                        <h2>Source Images</h2>
                        <label id="uploadLabel">
                        <div id="blueUp">
                        <input type="file" id="cancelUpload" onChange={handleInputChange} />
                            <img id="downimage"width="50px"height="50px"src={down}/>
                            <h3 id="downtext">Upload Image</h3>
                        </div>
                        </label>
                        <label id="uploadLabel" onClick={e=>setIPFS(true)}>
                        <div id="blueUp">
                            <img id="downimage"width="50px"height="50px"src={down}/>
                            <h3 id="downtext">By IPFS</h3>
                        </div>
                        </label>
                        { ipfs ?<input type="text" id="ipfsUpload"onChange={handleInputChangeI} /> : null}
                        { penI ? <div>
                            <ShowHide source={images[pointer].src} /> 
                       <div id="pendingImageOption">
                       <button onClick={e=>{setTop(top+"1");setPendingImage(false);}}>Use picture</button>
                        <button onClick={e=>{deleteImage();setIPFS(false)}}> Cancel</button>
                       </div>
                            </div>
                           
                        : null }
                       
                       
                    </div>
                   <div id="rdco">
                       <h2>Position</h2>
                       <div id='arrowB'>
                        <div id="arrowS2">
                       <button id="arrowU"onClick={e=>{
                                var temp = pos
                                temp[pointer][1] = pos[pointer][1] - 50;
                                setPos(temp);
                                setTop(top+1);
                                }}><img src={arrow} height="50px"></img></button>
                        </div>
                        <div id="arrowS2">
                           <div id="arrowS">
                       <        button onClick={e=>{
                        var temp = pos
                        temp[pointer][0] = pos[pointer][0] - 50;
                        setPos(temp);
                        setTop(top+1);
                                }} id="lbut"><img width="50px"src={arrow}></img></button>
                                
                                <button onClick={e=>{
                                    var temp = pos
                                    temp[pointer][1] = pos[pointer][1] + 50;
                                    setPos(temp);
                                    setTop(top+1);
                                }}><img id="dbut"src={arrow} height="50px"></img></button>
                                <button onClick={e=>{
                                    var temp = pos;
                                    temp[pointer][0] = pos[pointer][0] + 50;
                                    console.log(temp[pointer][0]);
                                    setPos(temp);
                                    setTop(top+1);
                                }}><img id="rbut"src={arrow} width="50px"></img></button>
                            </div>
                            </div>
                               
                    </div>
                   </div>
                    <div id="rdco">
                        <h2>Size</h2>
                        <button onClick={e=>whipeAll()}>Clear</button>
                        
                        <button onClick={e=>{
                            var temp = sizes;
                            temp[pointer][0] = temp[pointer][0] * 0.8;
                            temp[pointer][1] = temp[pointer][1] * 0.8;
                            setSizes(temp);console.log("changedsmall")
                            setTop(top+1);
                            }}>Shrink</button>
                        <button onClick={e=>{
                            var temp = sizes;
                            temp[pointer][0] = temp[pointer][0] * 1.2;
                            temp[pointer][1] = temp[pointer][1] * 1.2;
                            setSizes(temp);console.log("changedbig")
                            setTop(top+1);
                        }}>Enlarge</button>
                    </div>
                    <div id="rdco">
                        <button onClick={e=>{
                            if (water){
                                setWater(false)
                            }
                            else{setWater(true);}
                        }}> Toggle Water Mark</button>
                        <h2>Complete</h2>
                        <button onClick={e=>{
                            const canvas = document.getElementById("upCanvas");
                            const image = canvas.toDataURL('image/jpeg');
                            infura(image);
                            // const link = document.createElement("a");
                            // link.href=image;
                            // link.download ="main.jpg"
                            // link.click();
                        }}>
                        <h1>Finish Design</h1>
                        <p>Upload to IPFS</p></button>
                        
                        
                        
                         
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Designer;