import React from 'react';
import './submit.css'
const Submit = () => {
    return(
        <div >
        <div >
        <h1 id="t"> Submit your art </h1>
        <p1 id ="t">Receive royalty, publicity, and glory.</p1>
        <p id = "s">See our submission standards </p><a id = "l"href ="/">here.</a>
        </div>
      <form action="submission.php" >
          <br />
          Enter your email address:
          <br />
          <input type="email" name="email" />
          <br />
          Enter your wallet receive address:
          <br />
          <input type="text" name="wallet" />
          <br />
          Enter your design title:
          <br />
          <input type="text" name="designTitle" />
          <br />
          Enter your design IPFS URL:
          <br />
          <input type="url" name="ipfs" />
          <br />
          Enter your desired manufacturer:
          <br />
          <input type="radio"  id = "XYZ" name="manufacturer_r" value= '1' />
          <label for="XYZ" name = "manufacturer_r">SRSDefault</label>
          <br />
          Enter your item id:
          <br />
          <input type="radio" name="itemID" value = '1' />
          <label>Graphic-Tee(1)</label>
          <input type="radio" name="itemID" value = '2' />
          <label>Baseball Cap(2)</label>
          <input type="radio" name="itemID" value = '3' />
          <label>Hoodie(3)</label>  
          <br />
          Enter your royalty:
          <br />
          
          
          <fieldset class="range__field" />
            <label >Between 1 and 40 %:</label>
            <br/>
            <input type="number" step='1' name="royalty" min="1" max="40" />
           <br/>
          <input class="second__btn" id = "button_A" type="SUBMIT" value="Submit, and Reap Your Due"/>
          <br />
        </form>
          </div>
        
        )};
export default Submit