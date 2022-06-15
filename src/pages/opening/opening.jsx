import {React, useState, useEffect}  from 'react';
import axios from '../../components/navbar/axios'
import "./opening.css";
import {Link} from 'react-router-dom'
import Timer from '../../components/timer/timer'
import { ItemView } from '../../components/three/ItemView';
import shirtTwo from '../../assets/tshirt_obj.obj';
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Camel from '../../assets/Camel.obj';
const Home = () => {
    function intro(){
    const intro = document.getElementById("intro");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, .5, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setClearColor( 0xffffff, 0);
    const controls = new OrbitControls( camera, renderer.domElement );
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.innerWidth/window.innerHeight);
  intro.appendChild(renderer.domElement) 
  let man;
  var loader = new OBJLoader();
loader.load(Camel, function (object, materials){
    man = object;
man.traverse(function (child) {
child.material = new THREE.MeshBasicMaterial({
});
child.material.side = THREE.DoubleSide;
});
man.position.x = 0;
man.position.z = -10;
man.position.y = -75;
man.size = 100;
scene.add(man);
})
loader.load(shirtTwo, function (object, materials) {
man = object;
man.traverse(function (child) {
child.material = new THREE.MeshBasicMaterial({
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
  for(let i = 0; i < 100; i ++)
  {
    const geometry = new THREE.PlaneGeometry( 5, 5 );
    const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
    const plane = new THREE.Mesh( geometry, material );
    var geo = new THREE.WireframeGeometry( geometry ); // or WireframeGeometry( geometry )
    var mat = new THREE.LineBasicMaterial( { color: 0xbb8800, wireframe: true } );
    var wireframe = new THREE.Mesh(
        new THREE.PlaneGeometry(200, 200, 50),
        new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true
        }));
        wireframe.rotation.x = 3.14/2
        wireframe.position.y = -100
    scene.add( wireframe );
    var wireframe = new THREE.Mesh(
        new THREE.BoxGeometry(100, 100, 100),
        new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true
        }));
        wireframe.rotation.x = 3.14/4
        wireframe.rotation.z = 3.14/4
    scene.add( wireframe );
  }
}


  useEffect(()=>{
    intro();
},[])
  return (
<>
    <div id ="intro"></div>
</>
  )
};

export default Home;