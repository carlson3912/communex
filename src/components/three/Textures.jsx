import {useState, useMemo} from 'react';
import { Bounds, useBounds,OrbitControls, Stars, useTexture, useGLTF, Sky, SpotLight, Stage} from "@react-three/drei";
import { OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import shirtTwo from '../../assets/tshirt_obj.obj'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'


import shirtThree from '../../assets/shirtFour.jpeg'
import matlab from '../../assets/matlab2.jpeg'
import camel from '../../assets/camelShirt.jpeg'
import moneyFace from '../../assets/monetFace.JPG'
import longLine from '../../assets/longLine.JPG'
import mateoTwo from '../../assets/mateoTwo.jpeg'
import visten from '../../assets/manu1.jpg'

export const listShirts = new Array(
    shirtThree,
    matlab,
    camel,
    moneyFace,
    longLine,
    mateoTwo,
    visten
  
);

export const listNames= new Array(
    "Blue Token",
    "Navy Skeleton",
    "Glitched Camel",
    "Money Face Wrap",
    "Alaskan",
    "Money Face Mateo",
    "Visten Launch"
);

export const makeList = () => {
    var answer = []
    for(let i = 0; i<listShirts.length;i++){
        // var stringIN = "design "+i;
        answer.push({
            src: listShirts[i],
            name: listNames[i],
            posi: i
        });

    }
    return answer
}
