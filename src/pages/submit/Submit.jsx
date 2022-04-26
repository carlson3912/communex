import React from 'react';
import './submit.css'
const Submit = () => {
    return(
    <>
            <div >
        <h1 id="t"> Submit your art </h1>
        <p1 id ="t">Receive royalty, publicity, and glory.</p1>
        <p id = "s">See our submission standards </p><a id = "l"href ="/">here.</a>
        </div>
        <form id = "form" action="submission.php" method="POST" class="showForm">
          <br />
          <br />
          <input placeholder="Email:" id = "in" type="email" name="email"></input>
          <br />
          <br />
          <input placeholder="Public Wallet:"id = "in" type="text" name="wallet"></input>
          <br />
          <br />
          <input placeholder="Title of your work:" id = "in" type="text" name="designTitle"></input>
          <br />
          <br />
          <input placeholder="IPFS URL:" id = "in" type="text" name="ipfs" ></input>
          <br />
          Enter your desired manufacturer:
          <br />
          <input placeholder="Manufacturer:" id = "in" type="text" name="manufacturer_r" ></input>
          <br />
          Enter your item id:
          <br />
          <input placeholder="ItemID:" id = "in" type="" name="itemID" ></input>
          <label>Hoodie(3)</label>  
          <br />
          Enter your royalty:
          <br />
          <input placeholder="Royalty:" id = "in" type="" name="ipfs" ></input>
          <input class="second__btn" id = "button_A" type="SUBMIT" value="Submit, and Reap Your Due"></input>
          </form>
          
        </>
        )};
export default Submit