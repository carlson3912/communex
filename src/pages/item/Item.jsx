import React from 'react';
import './item.css'
import creator from '../../assets/seller3.png'
import manu from '../../assets/manu1.jpg'
import item from '../../assets/item1.jpg'

const Item = () => {



  return( 
      <div className='item section__padding'>
        <div className="item-image">
          <img src={item} alt="item" />
        </div>
          <div className="item-content">
            <div className="item-content-title">
              <h1>Green Goose T</h1>
              <p>From <span>4.5 ETH</span> ‧ 20 of 25 available</p>
            </div>
            <div className="item-content-creator">
              <div><p>Creater</p></div>
              <div>
                <img src={creator} alt="creator" />
                <p>Mateo Robles </p>
              </div>
            </div>
            <div className="item-content-creator">
              <div><p>Supplier</p></div>
              <div>
                <img src={manu} alt="creator" />
                <p>Visten Manufacturing</p>
              </div>
            </div>
            <div className="item-content-detail">
              <p>Generative art with 1,000,000 possible unique combinations.</p>
              <p>Keeps statistics like # of owners, rarity and floor price vs your buy price.</p>
              <p>Can play in a green light game to test your release. Do you think you are Steph Curry? Then put some money on the line and win big in the three point contest. Take part in other games to start building your legacy while also unlocking sweet new designs for your clothing.</p>
              <p>Retire your goose and receive your golden jacket-- err more like a high quality T-shirt with your unique name, appearance and statistics.</p>
            </div>
            <div className="item-content-buy">
              <button className="primary-btn">Buy For 4.5 ETH</button>
              <button className="secondary-btn">Make Offer</button>
            </div>
          </div>
      </div>
  )
};

export default Item;
