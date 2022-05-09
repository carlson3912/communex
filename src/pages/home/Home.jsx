import React from 'react';
import {Bids, Header, } from '../../components'
import './home.css'
import Data from '../../components/data/Data'
const Home = () => {

  return <div>
   <Header />
   {/* <Bids title="Upcoming Drops"  /> */}
   <Data />
  </div>;
};

export default Home;
