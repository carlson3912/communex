import React from 'react';
import {Bids, Header, } from '../../components'
import './home.css'
import Model from '../../components/three/Model'
import { Wardrobe } from '../../components/three/Wardrobe';
import Timer from "../../components/timer/timer";
import { Link  } from 'react-router-dom';
import ItemCard from "../../components/itemCard/productCard";
import item01 from '../../assets/item01.png'



const Home = () => {

  return <div>
    <div id="animated">
    <Model loc={[0,0,0]} cam={[0, 0, 500]}/>
    </div>
  </div>;
};

export default Home;
