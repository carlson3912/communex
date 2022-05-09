import React from 'react';
import {Bids, Header, } from '../../components'
import './home.css'

const Home = () => {

  return <div>
   <Header />
   {/* <Bids title="Upcoming Drops"  /> */}
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
   </div>
  </div>;
};

export default Home;
