import React from 'react';
import './product.css'
import {  Link } from "react-router-dom";
import Shirt from "../../assets/item1.jpg"
import sand from '../../assets/sandbox.webp'
import decen from '../../assets/decentraaland.webp'
import discord from '../../assets/discord-mascot.png';
import drawing from '../../assets/tradedrawing.png';
import ballot from '../../assets/ballot.png';
import logo from'../../assets/seller1.png';

export const Product = () => {
    return(
    <div id="ppbiggest">
      <div id="whitebackground">
        <h1 id="purplep">Product</h1>
        <div id="rp2">
            <div id="smallrp">
              <h2 id='rpp'>Redeemable NFTs</h2>
              <p id='rpp'>Mint, buy and sell NFTs that can be redeemed for real world items</p>
            </div>
            <img width='50%'src={Shirt}/>
        </div>
        <div id="rp1">
            <h2 id='rpp'>NFT Perks</h2>
            <div>
            <div id="productflex">
                <div id='pben2'>
                    <p>Wear your items in the metaverse</p>
                    <img src={sand} width="50px"/>
                    <img id="icoi2"src={decen}width="50px"/>
                </div>
                <div id='pben'>
                  <p>Buy and sell on the secondary market securely and easily</p>
                </div>
                <div id='pben3'>
                  <p>Ownership and sales price history</p>
                </div>
            </div>
            <br />
            <br />
            </div>
        </div>
        <div id="rp1">
            <h2 id='rpp'>Member Benefits</h2>
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
      </div>
    </div>
    )
}

export default Product;