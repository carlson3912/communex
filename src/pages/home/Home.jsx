import React from 'react';
import {Bids, Header, } from '../../components'
import './home.css'
import Model from '../../components/decrypt/Model'
const Home = () => {

  return <div>
    <div id="stars"></div>
    <div id="stars2"></div>
    <div id="stars3"></div>
    <div id="animated">
    {/*<Model/>*/}
    </div>
    <div id="space2"></div>
    <div id="space"></div>
   <Header />
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
