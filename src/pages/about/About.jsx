import React, { useEffect, useState }  from 'react';
import './about.css'
import Model from '../../components/model/model';


const About = () => {


  return( 
    <div id='big'>
      <div id='leftbox'>
        <Model profitIn='30' salesIn='1000'/>
      </div>
      <div id="rightbox">
        <h1>Our Mission</h1>
        <p1>How many Silk Roaders do we need for the brand to take off?</p1>
        <p1>Once Silk Road Swag breaks 20,000 sales, tokens cease to be given out</p1>
        <p1>Silk Road Swag is focused on organic growth through incentive based tokenomics aimed at growing the number of people who vote and submit designs during our weekly competitions.</p1>
      </div>
    </div>
  )
};

export default About;
