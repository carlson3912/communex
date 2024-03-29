import React, { useEffect, useState }  from 'react';
import './about.css'
import discord from '../../assets/discord-mascot.png';
import drawing from '../../assets/tradedrawing.png';
import ballot from '../../assets/ballot.png';
import logo from'../../assets/seller1.png';
import trade1 from '../../assets/trade1.png';
import trade2 from '../../assets/trade2.png';
import fire from '../../assets/fire.png';
import question from '../../assets/question.png'
import Product from '../../pages/product/Product.jsx'
const About = () => {
  const [sourced, setSource] = useState("item0");
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    swipeToSlide:true,
    responsive: [
      {
        breakpoint: 1160,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          swipeToSlide:true,
        }
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          swipeToSlide:true,
        }
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        }
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 470,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          variableWidth: true,
        }
      }
    ]
  };

  return( 
    <>
    <div id="aboutist">
    <div id='aboutbig'>
        <div id="rightbox">
            <h1 id="connectingt">Our Mission</h1>
              <div id ="connectingc">
              <canvas
        id="myCanvas"
        width="1000"
        height="500"
        style={{ border: "1px solid #d3d3d3" }}

      /> 
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
                  <p1>We turn all our customers into our business partners who are given the chance to join a vibrant global community like no other. </p1>
                  </div>
                  <div id="perks">
                        <div id="disp">
                        <img id="discordi" src={discord} height='50px'width='50px'/>
                          <h2>Member-only Discord</h2>
                        </div>
                      <div id="disp">
                      <img id="discordi" src={ballot} height='50px'width='50px'/>
                        <h2>Vote on every drop</h2>
                      </div>
                      <div id="disp">
                      <img id="discordi" src={logo} height='50px'width='50px'/>
                        <h2>Earn % on every sale</h2>
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
              </div>
        
            
            <div id="connectingc2">
            <br />
            <h2 id="connectingt2">Finding the Trendiest Clothes Across the Metaverse</h2>
            <p  id="small1f">Our one of a kind weekly votes help us find the freshest, most exciting clothes possible. Since voting happens with tokens it is</p>
            <li  id="small1f" >open/trusted/decentralized so everyone in the world has an equal chance to submit and win</li>
            <li  id="small1f" >efficient because all token holders are directly rewarded based on brand performance </li>
            < br/>
            </div>
            < br/>
            <div id="connectingc3">
            <br />
              <h2 id="connectingt3">Popular Fashion and Heat Index</h2>
              <p  id="small1f">The third core pillar of Silk Road Swag is the idea of Popular Fashion. As the number of token holders grow, our competitions will have more designs, more manufacturing options and most importantly, more voters. </p>
              <br />
              <p  id="small1f">More voters will drive up brand egagement, designs will get more likes and SRS will have more buzz in the constantly developing world of Trending Fashion.</p>
              <br />
              <div id="flexfire">
                <img id="firei" src={fire} height='100px'/>
                <div id="fired">
                  <p  id="small1f">Our smart contracts constantly calculate brand performance and associate it with a heat index represented by the icon on the left. If the brand is slow, SILK minting rates are increased to drive up popularity. Oppositely if the brand "catches fire", SILK distribution is halted to maximize profits for current holders.</p>
                  <br />
                  <p  id="small1f">The Heat Index is calculated using a combination of sales data, voter engagement and the number of new submissions.</p>
                </div>
              </div>
              <br />
            </div>
            <br />
        </div>
      </div>
      {/* <div id="tokenInfo">
      <h2>Learn more about Tokenomics</h2>
        <img src={question} height="150px"/>
        
      </div> */}
    </div>
    <Product/>
    </>
  )
};

export default About;
