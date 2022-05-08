import React, { useEffect, useState }  from 'react';
import './about.css'
import discord from '../../assets/discord-mascot.png';
import drawing from '../../assets/tradedrawing.png';

const About = () => {


  return( 
    <div>
      <div >
        <h1 id="product">Our Product</h1>

      </div>
    <div id='big'>
      <div id='leftbox'>      </div>
      <div id="rightbox">
        <h1 id='bigtitle'>Our Mission</h1>
        <h2>Connecting with Customers</h2>
        <p1>At Silk Road Swag, we believe the heart and and soul of a clothing brand is the community that it creates.</p1>
        < br/>
        <p1>The most succesful brands grow organically though the collective passion of its customers.</p1>
        < br/>
        <p1>That is why SRS gives 90% of it's profits to its customers through $SILK token distributed during every order.</p1>
        < br/>
        <p1>We turn all our customers into our business partners who are given the chance to talk with other in our vibrant member-only discord community. </p1>
        <img src={discord} height='50px'width='50px'/>
        <h2>Customer Owned</h2>
        <p1>By making all our customers brand owners with direct voting power on ALL clothing drops, Silk Road Swag develops a bigger connection to it's customer base than ever seen before.</p1>
        <p1>Make sure you vote for the best clothing to ensure that your tokens go up in value!</p1>

        <p1>As the brand grows and generates more sales, fewer SILK is given out to skew brand ownership towards the earliest customers. After all, they were here when we were less popular.</p1>
        < br/>
        <h2>What's trending?</h2>
        <p1>Silk Road Swag relies on the premise that as the number of token holders grows, the value of our product also increase due to the fact that more people are voting on and submitting designs.</p1>
      </div>
      </div>
      <div id="big2">
        <div id="left2">
         <h1 id="why">Why Give Out Tokens?</h1>
         <br/>
         <p>Customers can use $SILK as a discount if they burn their tokens in exchange for MATIC.</p>
         <h2>OR</h2>
         <p>They can keep their MATIC in our vault and watch it grow as the brand sells more clothes.</p>
         <p>In exchange, Silk Road Swag looks to benefit from the customer relations by using their insights for future clothing drops during voting competitons.</p>
        <p>Instead of spending large amount of money of marketing, SRS want to capitalize on organic word-of-mouth growth by investing back into it's customers.</p>
        </div>
        <div id="right2">
          <img src={drawing}></img>
        </div>
      </div>
    </div>
  )
};

export default About;
