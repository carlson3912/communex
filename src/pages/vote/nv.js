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
var arr = new Array();
const [arr2, setArr] = useState([]); 
const [arr3, setArr3] = useState([]); 
const [src, setSrc] = useState([]); 
var pos = 0;
const [loading, setLoading] = useState(11);

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

const voteDB = async (wallet, ipfs, votes) => {
  console.log("voteDB called")
  const reg = wallet + '§'  + ipfs +'§' + votes;
  const response = await axios.post(" https://srsbackend.herokuapp.com//vote",
                JSON.stringify(reg),
                JSON.stringify({
                   headers: { 'Content-Type': 'text/plain'},
                   withCredentials: true
               })
               );
       }


function votes(){
  var lemma = new Array();
  var j = 0;
  var siz;
  if(pos * 15 + 15 > arr.length - pos * 15)
  {siz = arr.length - pos * 15 }
  else{
    siz = 15;
  }
  for( let i = pos * 15; i < pos* 15 + siz; i ++)
  {
    lemma[j] = arr[i];
    j++; 
  }
  
  var siz;
  if (lemma.length < 15){
    siz = lemma.length;
  }
  else{
    siz = 15;
  }
  for (let i = 0; i <siz; i++){
    document.getElementById("voteButton"+i.toString()).addEventListener("click", function(e){
      let added = document.getElementById("mainDivOfVote")

    let addedContent = document.createElement("div");
    let date = new Date(lemma[i].date).toString()
    let index = nth_occurrence(date, " ", 5)
    addedContent.innerHTML =
    '<div id="selectedItem"> <button id="close">❌</button><div id ="selectedItemInner"><div id = "auto"><div id="innerLeft">' +
    '</div>' +
        "<div id='innerRight'>" +
          "<h2 id = 'title'>"+lemma[i].title +"</h2>" +
          "<h2 id = 'date'>"+date.slice(0, index)+"</h2>" +
          "<h2 id = 'artist'>"+lemma[i].artist +"</h2>"+
          
          "<h2 id = 'description'>"+ '"'+lemma[i].description +'"'+"</h2>" +
          "<form id='formVotes'>" +
          "<h2 id = 'votesCast'>Votes to Cast</h2>" +
            "<input id ='votesInput' type = 'number' min='0' max='10256'>" +
            "</input><h2 id = 'votesCast'>Tokens to Stake</h2>" +
            "<input id ='votesInput' type = 'number' min='0' max='10256'>" +
            "</input><button id = 'innerVoteB'>Vote</button></form></div></div></div></div>";
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
map: new THREE.TextureLoader().load("https://gateway.pinata.cloud/ipfs/"+ lemma[i].ipfs)
});
child.material.side = THREE.DoubleSide;
});
man.position.x = 0;
man.position.y = -75;
scene.add(man);
});
var wireframe = new THREE.Mesh(
  new THREE.DodecahedronGeometry(80),
  new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true
  }));
  wireframe.rotation.z = -3.14
scene.add( wireframe );
var geo = new THREE.EdgesGeometry( new THREE.DodecahedronGeometry(70) ); // or WireframeGeometry( geometry )

var mat = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 9 } );

var wireframe2 = new THREE.LineSegments( geo, mat );

scene.add( wireframe2 );
var wireframe = new THREE.Mesh(
  new THREE.BoxGeometry(50, 50, 50),
  new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true
  }));
  wireframe.rotation.x = -3.14/8
  wireframe.rotation.z = -3.14/8
scene.add( wireframe );
  camera.position.z = 135;
  controls.update();
  renderer.render(scene, camera);
  function animate(){
    requestAnimationFrame(animate)
    controls.update();
    renderer.render(scene, camera)
    wireframe.rotation.z += 0.0005
    wireframe.rotation.y += 0.0005
    wireframe2.rotation.z -= 0.0005
    wireframe2.rotation.y -= 0.0005
  }
  animate()

  document.getElementById('formVotes').addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();
});

    document.getElementById("close").addEventListener("click", function(e){
            const innerSelected = document.getElementById("mainDivOfVote");
            document.getElementById("hiddenError").style = "display: none;";
  while (innerSelected.hasChildNodes()) {
    innerSelected.removeChild(innerSelected.firstChild);
  renderering();
  }
     })
     document.getElementById("innerVoteB").addEventListener("click", async function(e){
      if(!window.ethereum){
        document.getElementById("hiddenError").style = "display: block;";

        console.log("Please install Metamask"); console.log("Window.ethereum error")
      }
      else{
        const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
        voteDB(accounts, lemma[i].ipfs, document.getElementById("votesInput").value);
      }
      
})
})
}}
function renderering(){
  console.log("Source", src)
  console.log("input Arr", arr)
  console.log("Modification Array", arr2)
  var lemma = new Array();
  var j = 0;
  var siz;
  setArr(arr)
  if(pos * 15 + 15 > arr.length - pos * 15)
  {siz = arr.length - pos * 15 }
  else{
    siz = 15;
  }
  for( let i = pos * 15; i < pos* 15 + siz; i ++)
  {
    lemma[j] = arr[i];
    j++; 
  }
  const mytable = document.getElementById("html-data-table");
  while (mytable.hasChildNodes()) {
    mytable.removeChild(mytable.firstChild);
  }
  var siz;
  if (lemma.length < 15){
    siz = lemma.length;
  }
  else{
    siz = 15;
  }
  
for( let i = 0; i < siz; i ++)
  {
    if(i % 5 ===0 ) { mytable.appendChild(document.createElement("tr")) }
    let newRow = document.createElement("td");
        newRow.innerHTML = 
        "<div id ='max'>" +
        "<div id='items'> <div id = 'unskew'>" +
         "<div id ='moveLeft'><div class = 'thumbanil' id = 'thumbnail" + i + "'></div></div> <div id ='moveRight'>" + 
         "<h2 id = 'title'>" + lemma[i].title+"</h2>"  +
         "<h2 id = 'artist'>" + lemma[i].artist+"</h2>" +
         "<h2 id = 'artist'>" + lemma[i].votes+"</h2>" +
         "" +
         "<div id = 'added" + i + "'><a href = '#mainDivOfVote'><button id = 'voteButton" + i+ "'>Vote</button></a></div>" +
          "</div></div></div></div>";
            mytable.appendChild(newRow);
  const myTableDivision = document.getElementById("thumbnail" + i);
                    const scene = new THREE.Scene();
                    const camera = new THREE.PerspectiveCamera(75, .5, 0.2, 1000);
                    const renderer = new THREE.WebGLRenderer({ alpha: true })
                    renderer.setClearColor( 0xffffff, 0);
                    const controls = new OrbitControls( camera, renderer.domElement );
                    renderer.setSize(218, 218);
                    renderer.setPixelRatio(16/9);
                  myTableDivision.appendChild(renderer.domElement) 
                  let shirt;
                  var loader = new OBJLoader();
            loader.load(shirtTwo, function (object, materials) {
    shirt = object;
    shirt.traverse(function (child) {
            child.material = new THREE.MeshBasicMaterial({
              map: new THREE.TextureLoader().load("https://ipfs.io/ipfs/"+ lemma[i].ipfs)
            });
            child.material.side = THREE.DoubleSide;
    });
    shirt.position.x = 0;
    shirt.position.y = -65;
    scene.add(shirt);
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
   let buttonRow = document.createElement("tr");
   if(pos == 0 && arr.length > 15)
   {
   buttonRow.innerHTML = "<td></td><td></td><td></td><td></td><td><button id ='next'>Next</button></td>"
   mytable.appendChild(buttonRow);
   document.getElementById("next").addEventListener("click", function(e){
    pos += 1;
    renderering();
  })
   }
   else if (pos != 0 && arr.length > 15 ){
    buttonRow.innerHTML = "<td><button id ='prev'>Previous</button></td><td></td><td></td><td></td><td><button id ='next'>Next</button></td>"
    mytable.appendChild(buttonRow);
    document.getElementById("next").addEventListener("click", function(e){
      pos += 1;
      renderering();
    })
    {document.getElementById("prev").addEventListener("click", function(e){
      pos -= 1;
      renderering();
    })}
   }
   else if (pos != 0) {
    buttonRow.innerHTML = "<td><button id ='prev'>Previous</button></td><td></td><td></td><td></td>"
    mytable.appendChild(buttonRow);

    {document.getElementById("prev").addEventListener("click", function(e){
      pos -= 1;
      renderering();
    })}
   }
   
   votes();
}
 const connection = async () => {
  console.log("connection called")
  const response = await axios.post(" https://srsbackend.herokuapp.com/submissions",
                JSON.stringify({}),
               JSON.stringify({
                   headers: { 'Content-Type': 'text/plain'},
                   withCredentials: true
               })
               );
               for(let i = 0; i < response.data.length; i ++){
                setSrc(src =>[ ...src, response.data[i]])
                setArr(arr2 =>[ ...arr2, response.data[i]])
                arr.push(response.data[i])
               }
               var siz;
               if (response.data.length < 15){
                 siz = response.data.length;
               }
               else{
                 siz = 15;
               }
       for (let i = 0; i <siz; i++){
        
        
                }
                setDirectionDate ("⬆");
                renderering()
       }

useEffect(()=>{
      connection();
},[])
  function sort(sortType, sortText ){
    let len = arr.length;
    if(sortText == ""){
      setDirectionDate ("⬆");
    }
      if (sortType === 1)
      {
        arr = [];
        for(let i = 0; i < src.length; i++)
        {
          if(src[i].artist.slice(0,sortText.length)=== sortText)
          arr.push(src[i])
        }
      }
      else if (sortType === 2)
      {
        arr = [];
        for(let i = 0; i < src.length; i++)
        {
          if(src[i].title.slice(0,sortText.length)=== sortText)
          arr.push(src[i])
        }
      }
      else if (sortType === 3)
      {
        for(let i = arr2.length -1; i >= 0; i --)
        {
           arr.push(arr2[i])
        }
        if(directionDate === "⬆") setDirectionDate("⬇")
        else setDirectionDate('⬆')
      }
      else if(sortType === 4)
      {
        if(directionVotes === "⬆") setDirectionVotes("⬇")
        else setDirectionVotes('⬆')
      }
      renderering();
  }
  return (
    <>
    <div id="hiddenError"><h1 id ="red">You must log in using Metamask to vote.</h1></div>
    <div id ="mainDivOfVote">
      </div>
      <div id ="topCountdown">
      <h1 id ="cdwnLeft">Vote Period Ends: </h1>
      <Timer  id="cdwnRight"date="May 15, 2022 15:00 PST"/>
      </div>
      
        <table id ="sortingtable">
          <tr>
            <td>
              <h2 id ="sort">Sort submissions:</h2>
            </td>
            <td>
            <h2 id ="time" onClick ={(e) => sort(3, "")}>Date Posted {directionDate}</h2>
            </td>
            <td>
            <h2 id ="votes" onClick ={(e) => sort(4, "")}>Votes {directionVotes}</h2>
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
        <table id ="html-data-table">
          <img src = "https://c.tenor.com/KEzW7ALwfUAAAAAC/cat-what.gif"></img>
          <h1 id = "redraw">{"Time Remaining: " + loading + "s"}</h1>
        </table>
        </>
   )
};
export default Vote;