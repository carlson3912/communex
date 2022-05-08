import React, { useEffect, useState }  from 'react';
import './about.css'
import discord from '../../assets/discord-mascot.png';
import drawing from '../../assets/tradedrawing.png';
import ballot from '../../assets/ballot.png';
import logo from'../../assets/seller1.png';
import trade1 from '../../assets/trade1.png';
import trade2 from '../../assets/trade2.png';
const About = () => {


  return( 
    <div id="aboutist">
      <div >
        <h1 id="product">Our Product</h1>

      </div>
    <div id='aboutbig'>
        <div id="rightbox">
            <h1 id="connectingt">Our Mission</h1>
              <div id ="connectingc">
                <br/>
                  <h2 id="cwc" >Connecting with Customers</h2>
                  <div id="small1f">
                  <p1>At Silk Road Swag, we believe the heart and and soul of a clothing brand is the community that it creates. The most succesful brands grow organically though building around the collective passion of its customers. We value the work that our customers do representing our brand so we reward them accordingly.</p1>
                  < br/>
                  < br/>
                  <p1>Selling items on the blockchain and using cryptocurrency has allowed us to become the first clothing brand ever to give fractional ownership to every customer who buys an item. 
                    90% of all profits go back to our customers through $SILK token distributed during every order.</p1>
                  < br/>
                  <br />
                  <p1>We turn all our customers into our business partners who are given the chance to talk with other in our vibrant member-only discord community. </p1>
                  </div>
                  <div id="perks">
                      <div id="disp">
                      <img id="discordi" src={discord} height='50px'width='50px'/>
                        <h2>Member-only Discord</h2>
                      </div>
                      <div id="votep">
                      <img id="discordi" src={ballot} height='50px'width='50px'/>
                        <h2>Vote on every drop</h2>
                      </div>
                      <div id="rewardp">
                      <img id="discordi" src={logo} height='50px'width='50px'/>
                        <h2>Earn % on every sale</h2>
                      </div>
                  </div>
              </div>
            <div id="secondabout">
              <div id="trade1">
                <img id="tradei1" src={trade1} />
              </div>
              <div id="trade2">
              <img id="tradei2" src={trade2} />
              </div>
            </div>
            
            <div id="connectingc2">
            <h1 id="connectingt2">Why Giveaway Tokens?</h1>
            <p1>By investing into our community </p1>
            <p1>Make sure you vote for the best clothing to ensure that your tokens go up in value!</p1>

            <p1>As the brand grows and generates more sales, fewer SILK is given out to skew brand ownership towards the earliest customers. After all, they were here when we were less popular.</p1>
            </div>
            < br/>
            <div id="connectingc3">
              <h2 id="connectingt3">What's trending?</h2>
              <p1>Silk Road Swag relies on the premise that as the number of token holders grows, the value of our product also increase due to the fact that more people are voting on and submitting designs.</p1>
            </div>
            <br />
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
