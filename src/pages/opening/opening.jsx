import {React, useState, useEffect}  from 'react';
import axios from '../../components/navbar/axios'
import "./opening.css";
import {Link} from 'react-router-dom'
import Timer from '../../components/timer/timer'
import { ItemView } from '../../components/three/ItemView';
import sun from '../../assets/camelsun.png';
import floor from '../../assets/floor2.png';

import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Camel from '../../assets/Camel.obj';
const Home = () => {
    function intro(){
    const intro = document.getElementById("intro");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, .5, 0.1, 10100);
    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setClearColor( 0xffffff, 0);
    const controls = new OrbitControls( camera, renderer.domElement );
    renderer.setSize(window.innerWidth -20, window.innerHeight *8 /9);
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
});
  camera.position.z = 135;
  controls.update();
  renderer.render(scene, camera);

	var planeGeometry = new THREE.PlaneGeometry(140, 300);

		var planeMaterial = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(sun), transparent: true, side: THREE.DoubleSide }); // NOTE: specify "transparent: true"
		const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.z = -1000
    plane.position.y = 100
		scene.add(plane);



    var planeGeometry = new THREE.PlaneGeometry(500, 1000);

		var planeMaterial = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(floor), transparent: true, side: THREE.DoubleSide }); // NOTE: specify "transparent: true"
		const plane2 = new THREE.Mesh(planeGeometry, planeMaterial);
    plane2.rotation.x = 3.14/2
        plane2.position.y = -100
        plane2.position.z = -500
		scene.add(plane2);


  function animate(){
    requestAnimationFrame(animate)
    renderer.setPixelRatio(window.innerWidth/window.innerHeight);
    controls.update();
    renderer.render(scene, camera)
  }
  animate()
  
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