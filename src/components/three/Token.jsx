// import './style.css'
import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import * as dat from 'dat.gui'
import silk from '../../assets/normalMap.png'
import React, {useState, useEffect, useRef} from 'react'
export const Token = () => {
    

    const canvas1 = useRef(null);
    useEffect(()=>{
        if(canvas1){
            console.log("Mount")
        //     const ctx=canvas.current.getContext("2d");
        //     ctx.drawImage(shirt,70,0,700,800);
            
        }
        
       
    },[])

    const show = () => {
        if(canvas1){
            console.log("Show")
        }
    const textureLoader = new THREE.TextureLoader()
    // const gui = new dat.GUI()

    // Canvas
    const canvas = document.querySelector('canvas.webgl')

    // Scene
    const scene = new THREE.Scene()

    // Objects
    // const geometry = new THREE.TorusGeometry( 0.7, 0.2, 16, 100 );
    const geometry = new THREE.CylinderBufferGeometry(1,1,0.05,30);
    // Materials
    const normalText = textureLoader.load(silk)
    const material = new THREE.MeshBasicMaterial({
        map: textureLoader.load(silk),
    }
    //     [
    //     THREE.MeshBasicMaterial(),
    //     THREE.MeshBasicMaterial(),
    //     THREE.MeshBasicMaterial()
    // ]
    )
    material.color = new THREE.Color(0x7b32a8)    
    material.metalness = 10 
    material.normalMap = normalText

    // Mesh
    const sphere = new THREE.Mesh(geometry,material)

    sphere.rotateX(3.14/2)
    // scene.add(sphere)
    scene.add(sphere)

    // Lights

    const pointLight = new THREE.PointLight(0xffffff, 0.1)
    pointLight.position.x = 2
    pointLight.position.y = 3
    pointLight.position.z = 4
    scene.add(pointLight)

    /**
     * Sizes
     */
    const sizes = {
        width: '150px',
        height: '150px'
        // width: window.innerWidth,
        // height: window.innerHeight
    }
 const renderer = new THREE.WebGLRenderer({
        canvas: canvas
    })
    // window.addEventListener('resize', () =>
    // {
    //     // Update sizes
    //     sizes.width = window.innerWidth
    //     sizes.height = window.innerHeight

    //     // Update camera
    //     camera.aspect = sizes.width / sizes.height
    //     camera.updateProjectionMatrix()

    //     // Update renderer
    //     renderer.setSize(sizes.width, sizes.height)
    //     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    // })

    /**
     * Camera
     */
    // Base camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    camera.position.x = 0
    camera.position.y = 0
    camera.position.z = 2.5 //away from center
    scene.add(camera)

    // Controls
    // const controls = new OrbitControls(camera, canvas)
    // controls.enableDamping = true

    /**
     * Renderer
     */
   
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    /**
     * Animate
     */

    // const clock = new THREE.Clock()

    // const tick = () =>
    // {

    //     const elapsedTime = clock.getElapsedTime()

    //     // Update objects
    //     sphere.rotation.z = .5 * elapsedTime

    //     // Update Orbital Controls
    //     // controls.update()

    //     // Render
    //     renderer.render(scene, camera)

    //     // Call tick again on the next frame
    //     window.requestAnimationFrame(tick)
    // }

    // tick()
    renderer.render(scene, camera)
    }

    return(
        <div>
        <h1>Silk Token</h1>
        <canvas ref={canvas1}id="myCanvas" class="webgl"></canvas>
        <button onClick = {show}>Show</button>
        </div>
    )
}

export default Token;