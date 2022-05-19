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
        <div id="stars"></div>
    <div id="stars2"></div>
    <div id="stars3"></div>
       <div className='header'>
        <div id="rowR">
        
            <div id ="row">
              <p id ="r">POP-FASHION</p><br/>
            </div>

            <div id="row1">
              <p id="r">COLLECT $SILK</p><br/>
            </div>
            <div id="row2">
              <p id="r">POP-FASHION</p><br/>
            </div>
      </div>
      </div>
      <div id="space"></div>
    <div id="animated">
    <Model loc={[0,0,0]} cam={[0, 0, 500]}/>
    </div>
    <div className='header'>
        <div id="rowR">
        
            <div id ="row">
              <p id ="r">POP-FASHION</p><br/>
            </div>

            <div id="row1">
              <p id="r">COLLECT $SILK</p><br/>
            </div>
            <div id="row2">
              <p id="r">POP-FASHION</p><br/>
            </div>
      </div>
      </div>
   <div id="space2"></div>
   <div id="space"></div>
   
   <div id="biggestdata">
   <div id="bigdata">
        <div id="smalldata">
          <h2>Token Holders</h2>
        </div>
        <div id="smalldata">
          <h2>$SILK Burn Value</h2>
        </div>
        <div id="smalldata">
          <h2>Monthly Sales</h2>
        </div>
        <div id="smalldata">
          <h2>Weekly Votes</h2>
        </div>
        
   </div>
   <div id="bigdata2">
        <div id="smalldata">
          <h2>4,000</h2>
        </div>
        <div id="smalldata">
          <h2>$0.04</h2>
        </div>
        <div id="smalldata">
          <h2>2,500</h2>
        </div>
        <div id="smalldata">
          <h2>3,020</h2>
        </div>
        
   </div>
   <div id="space2"></div>
   <div id="space"></div>
   </div>
   
   <Bids title="Upcoming Drops"  />
  </div>;
};

export default Home;
