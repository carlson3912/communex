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
import joker from '../../assets/jokerdiscord.jpeg'
import slaughter from '../../assets/slaughtergang.jpeg'
import poole from '../../assets/pooleparty.jpeg'
import poole2 from '../../assets/pooleparty2.jpeg'
// import sandbox from '../../assets/srssandbox.jpeg'
export const listShirts = new Array(
    shirtThree,
    matlab,
    camel,
    slaughter,
    moneyFace,
    longLine,
    mateoTwo,
    visten,
    joker,
    slaughter,
    poole,
    poole2
  
);

export const listNames= new Array(
    "Blue Token",
    "Navy Skeleton",
    "Glitched Camel",
    "Composed of Early SRS Assets",
    "Money Face Wrap",
    "Alaskan",
    "Money Face Mateo",
    "Visten Launch",
    "Joker OG",
    "Composed of Early SRS Assets",
    "Poole from Warriors Series 2022 PlayOffs"
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
