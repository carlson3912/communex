import React, { useEffect, useState } from 'react'
import './header.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import seller1 from '../../assets/seller1.png'
import seller2 from '../../assets/seller2.png'
import seller3 from '../../assets/seller3.png'
import seller4 from '../../assets/seller4.png'
import seller5 from '../../assets/seller5.png'
import seller6 from '../../assets/seller6.jpg'
import verify from '../../assets/verify.png'
import coin from '../../assets/seller1.png'

import { RiH1 } from 'react-icons/ri';

import Timer from "../timer/timer";
import { Link  } from 'react-router-dom';
import ItemCard from "../itemCard/productCard";

import item01 from '../../assets/item01.png'


import resp from "../../components/navbar/Navbar"
var votes = "5";

// const [hours, setHours] = useState("00");
// const [minutes, setMinutes] = useState("00");
// const [seconds, setSeconds] = useState("00");

const Header = () => {
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
  return (
    <div className='header'>
        <div id="rowR">
        
            <div id ="row">
              <p id ="r">SILK ROAD SWAG</p><br/>
            </div>

            <div id="row1">
              <p id="r">COLLECT $SILK</p><br/>
            </div>
            <div id="row2">
              <p id="r">META-FASHION</p><br/>
            </div>
      </div>

      
        <div id="timer">
                  <h1>Voting Opens In:</h1>
        <Timer date="May 15, 2022 15:00 PST"/>
        
        <div id ="rowTop">
            <div id ="col">
            <p id ="topWinner">CURRENT PRODUCT FOR SALE</p>
            <p>buy an item to vote for future drops</p><br/><br/>
            
        
        <br />
            <p id ="topTitle">
            Title: OG NFT<br/>
            
           </p><br/>
            </div>
    <img id ="topImage" src={item01}alt="" />
    <Link to={'Srs1'}>
  </Link>
  </div>
    <p></p>
      <ItemCard id="1"/>
    </div></div>
  )
}
console.log(resp);
export default Header
