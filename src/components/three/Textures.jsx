import {useState, useMemo} from 'react';
import { Bounds, useBounds,OrbitControls, Stars, useTexture, useGLTF, Sky, SpotLight, Stage} from "@react-three/drei";
import { OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import shirtTwo from '../../assets/tshirt_obj.obj'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import axios from "../../axios/axios";

import shirtThree from '../../assets/shirtFour.jpeg'
import matlab from '../../assets/matlab2.jpeg'
import camel from '../../assets/camelShirt.jpeg'
import moneyFace from '../../assets/monetFace.JPG'
import longLine from '../../assets/longLine.JPG'
import mateoTwo from '../../assets/mateoTwo.jpeg'

 const listShirts = new Array(
    shirtThree,
    matlab,
    camel,
    moneyFace,
    longLine,
    mateoTwo
    // shirtThree.toString(),
    // matlab.toString(),
    // camel.toString(),
    // moneyFace.toString(),
    // longLine.toString(),
    // mateoTwo.toString()
);

export const makeList = async () => {
    var answer = []

        const response = await axios.post("http://localhost:3500/submissions",
                     JSON.stringify({}),
                    JSON.stringify({
                        headers: { 'Content-Type': 'text/plain'},
                        withCredentials: true
                    })
                    );
            var m = 0;
            for (let i = 0; i <response.data.length; i++){
                const temp = "https://ipfs.io/ipfs/" + response.data[i].ipfs
               answer.push({
                   src: temp,
                   name: response.data[i].title,
                   posi: i });
  
            }

    return answer
}
