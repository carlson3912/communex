import {useState,useEffect, Suspense,useMemo, React, callback} from 'react';
import './vote.css'
import {Link} from 'react-router-dom'
import Timer from '../../components/timer/timer'
import axios from "../../axios/axios"
import { ItemView } from '../../components/three/ItemView';
import shirtTwo from '../../assets/tshirt_obj.obj';
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import { Bounds, useBounds, Stars, useTexture, useGLTF, Sky, SpotLight, Stage} from "@react-three/drei";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { sortAndDeduplicateDiagnostics, visitNodes } from 'typescript';


export const Vote = () => {
const boxGeometry = new THREE.BoxGeometry(2,2,2)
var arr;
var src = new Array;
const [useSrc, setSrc] = useState(); 
const [directionDate, setDirectionDate] = useState("⬆");
const [directionVotes, setDirectionVotes] = useState("⬇");
function nth_occurrence (string, char, nth) {
  var first_index = string.indexOf(char);
  var length_up_to_first_index = first_index + 1;
  if (nth == 1) {
      return first_index;
  } else {
      var string_after_first_occurrence = string.slice(length_up_to_first_index);
      var next_occurrence = nth_occurrence(string_after_first_occurrence, char, nth - 1);
      if (next_occurrence === -1) {
          return -1;
      } else {
          return length_up_to_first_index + next_occurrence;  
      }
  }
}
function votes(){
  for (let i = 0; i <arr.length; i++){
    let added = document.getElementById("mainDivOfVote")
    document.getElementById("voteButton"+i.toString()).addEventListener("click", function(e){
    let addedContent = document.createElement("div");
    let date = new Date(arr[i].date).toString()
    let index = nth_occurrence(date, " ", 5)
    addedContent.innerHTML =
    '<div id="selectedItem"> <button id="close">❌</button><div id ="selectedItemInner"><div id="innerLeft">' +
    '</div>' +
        "<div id='innerRight'>" +
          "<h2 id = 'title'>"+arr[i].title +"</h2>" +
          "<h2 id = 'date'>"+date.slice(0, index)+"</h2>" +
          "<h2 id = 'artist'>"+arr[i].artist +"</h2>"+
          
          "<h2 id = 'description'>"+ '"'+arr[i].description +'"'+"</h2>" +
          "<form id='formVotes'>" +
          "<h2 id = 'votesCast'>Votes to Cast</h2>" +
            "<input id ='votesInput' type = 'number' min='0' max='10256'>" +
            "</input><h2 id = 'votesCast'>Tokens to Stake</h2>" +
            "<input id ='votesInput' type = 'number' min='0' max='10256'>" +
            "</input></form></div></div></div>";
    added.appendChild(addedContent);
    const myTableDivision = document.getElementById("innerLeft");

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, .5, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setClearColor( 0xffffff, 0);
    const controls = new OrbitControls( camera, renderer.domElement );
    renderer.setSize(window.innerWidth/3.35, window.innerWidth/3.35);
    renderer.setPixelRatio(2.86);
  myTableDivision.appendChild(renderer.domElement) 
  let man;
  var loader = new OBJLoader();
loader.load(shirtTwo, function (object, materials) {
man = object;
man.traverse(function (child) {
child.material = new THREE.MeshBasicMaterial({
map: new THREE.TextureLoader().load("https://ipfs.io/ipfs/"+ arr[i].ipfs)
});
child.material.side = THREE.DoubleSide;
});
man.position.x = 0;
man.position.z = -10;
man.position.y = -75;
scene.add(man);
});
  camera.position.z = 135;
  controls.update();
  renderer.render(scene, camera);
  function animate(){
    requestAnimationFrame(animate)
    controls.update();
    renderer.render(scene, camera)
  }
  animate()
    document.getElementById("close").addEventListener("click", function(e){
            const innerSelected = document.getElementById("mainDivOfVote");
  while (innerSelected.hasChildNodes()) {
    innerSelected.removeChild(innerSelected.firstChild);
  renderering();
  }
     })
  })
}
}
function renderering(){
  console.log(src)
  console.log(arr)
  const mytable = document.getElementById("html-data-table");
  while (mytable.hasChildNodes()) {
    mytable.removeChild(mytable.firstChild);
  }
for( let i = 0; i < arr.length; i ++)
  {
    if(i % 5 ===0 ) { mytable.appendChild(document.createElement("tr")) }
    let newRow = document.createElement("td");
        newRow.innerHTML = 
        "" +
        "<div id='items'>" +
         "<div class = 'thumbanil' id = 'thumbnail" + i + "'></div>" + 
         "<h2 id = 'title'>" + arr[i].title+"</h2>"  +
         "<h2 id = 'artist'>" + arr[i].artist+"</h2>" +
         "" +
         "<div id = 'added" + i + "'><a href = '#mainDivOfVote'><button id = 'voteButton" + i+ "'>Vote</button></a></div>" +
          "</div>";
            mytable.appendChild(newRow);
  const myTableDivision = document.getElementById("thumbnail" + i);
                    const scene = new THREE.Scene();
                    const camera = new THREE.PerspectiveCamera(75, .5, 0.1, 1000);
                    const renderer = new THREE.WebGLRenderer({ alpha: true })
                    renderer.setClearColor( 0xffffff, 0);
                    const controls = new OrbitControls( camera, renderer.domElement );
                    renderer.setSize(250, 250);
                    renderer.setPixelRatio(2.86);
                  myTableDivision.appendChild(renderer.domElement) 
                  let man;
                  var loader = new OBJLoader();
            loader.load(shirtTwo, function (object, materials) {
    man = object;
    man.traverse(function (child) {
            child.material = new THREE.MeshBasicMaterial({
              map: new THREE.TextureLoader().load("https://ipfs.io/ipfs/"+ arr[i].ipfs)
            });
            child.material.side = THREE.DoubleSide;
    });
    man.position.x = 0;
    man.position.z = -10;
    man.position.y = -75;
    scene.add(man);
  });
                  camera.position.z = 135;
                  controls.update();
                  renderer.render(scene, camera);
                  function animate(){
                    requestAnimationFrame(animate)
                    controls.update();
                    renderer.render(scene, camera)
                  }
                  animate()
   }
   votes();
}
 const connection = async () => {
  console.log("connection called")
  const response = await axios.post("http://localhost:3500/submissions",
                JSON.stringify({}),
               JSON.stringify({
                   headers: { 'Content-Type': 'text/plain'},
                   withCredentials: true
               })
               );
       for (let i = 0; i <15; i++){
        src.push( response.data[i]) 
                }
                arr = src;
                renderering()
       }
useEffect(()=>{
      connection();
},[])



function reverseTime(){
  console.log("revT");
  var temp = new Array;
    for(let i = arr.length -1; i >= 0; i--)
    {
      temp.push(arr[i])
    }
    arr = temp;
    setDirectionDate ("⬇");
}
function straightenTime(){
  console.log("strT");
  var temp = new Array;
  for(let i = 0; i < arr.length; i++)
    {
      temp.push(src[i])
    }
    arr = temp;
  arr = src
    setDirectionVotes ("⬆");
}
function alphabetize(){
  console.log("alphabeTize");
  const length = arr.length
  var temp = new Array;
    for(let i = 0; i < length -1; i++)
    {
      var alpha = arr[i];
      for(let j = 0; i < length -1; i++)
      {
        if(arr[j].title.toLowerCase().localCompare(alpha.title.toLowerCase()) <= 0 )
        alpha = arr[j]
      }
      temp.push(alpha)
    }
    console.log(temp);
    arr = temp;
    setDirectionVotes ("--");
}
function sortTime(){
  if(directionDate == "⬆"){
    reverseTime();
  }
  else if (directionDate == "⬇"){
    straightenTime();
  }
  else if(directionDate == "--"){
    alphabetize();
  }
  renderering();
}
function sortVote(){
  if(directionVotes === '⬆')
  {
    setDirectionVotes ("--");
  }
  if(directionVotes  === '--')
  {
  }
  if(directionVotes  === '⬇')
  {
    setDirectionVotes  ("⬆");
  }
}
  function sort(sortType, sortText ){
      if (sortType === 1)
      {
        arr = [];
        for(let i = 0; i < src.length; i++)
        {
          console.log(src[i].artist.slice(0,sortText.length));
          if(src[i].artist.slice(0,sortText.length)=== sortText)
          arr.push(src[i])
        }
      }
      else if (sortType === 2)
      {
        arr = []
        for(let i = 0; i < src.length; i++)
        {
          if(src[i].title.slice(0,sortText.length)=== sortText )
          arr.push(src[i])
        }
      }
      renderering();
  }
  return (
<<<<<<< HEAD
    <div >
      { ifcat ?
      <>
      <img src={cat}/>                

      


    <Suspense fallback={null}>

        <Canvas height="500px"camera={{position: [0, 0, 150]}}>
            <mesh  castShadow position={[0, -80, 0]} geometry={geometry} >
              {/* <Sky /> */}
              <meshPhysicalMaterial map={texture}/>
          </mesh>
          <ambientLight intensity={1} />
          <OrbitControls />
        </Canvas>
  
    </Suspense>
   
    </>
    : null }



     



      <h1 >Voting has not started yet</h1>
      <button onClick={()=>loadText()}>Troll</button>
      <h1>It will open up in:</h1>

      <Timer  date="May 15, 2022 15:00 PST"/>
=======
    <>
    <div id ="mainDivOfVote">
      </div>
      <h1>Vote Period Ends: </h1><Timer  date="May 15, 2022 15:00 PST"/>
        <table id ="sortingtable">
          <tr>
            <td>
              <h2 id ="sort">Sort submissions:</h2>
            </td>
            <td>
            <h2 id ="time" onClick ={(e) => sortTime()}>Date Posted {directionDate}</h2>
            </td>
            <td>
            <h2 id ="votes" onClick ={(e) => sortVote()}>Votes {directionVotes}</h2>
            </td>
            <td>
            <h2 id ="artists">Search by artist</h2>
            <form>
              <input 
              type="text"onChange={(e) => sort(1, e.target.value)}>
              </input>
            </form>
            </td>
            <td>
            <h2 id ="titles">Search by title</h2>
            <form>
              <input 
              type="text"
              onChange={(e) => sort(2, e.target.value)}>
              </input>
            </form>
            </td>
          </tr>
        </table>
>>>>>>> 77a6247701cbda2d20c245cee46816079e7ef5d5
        <table id ="html-data-table">
        </table>
        </>
   )
};
export default Vote;