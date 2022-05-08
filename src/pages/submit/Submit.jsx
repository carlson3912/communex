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
          <input placeholder="Title of your work:" id = "in" type="text" name="designTitle"></input>
          <br />
          <br />
          <input placeholder="IPFS URL:" id = "in" type="url" name="ipfs" ></input>
          <br />
          <br/>
          <input placeholder="Royalty % (1-40):" id = "in" type="number" min="1" max="40" name="designTitle"></input>
          <br />
          <br />
          Select manufacturer:    
          <input id ="n" type="radio" name="manufacturer_r" value="1" />
          <label name = "manufacturer_r">SRSDefault</label><br/>
          <button id = "in">Submit</button>
          </form>
        </>
        )};
export default Submit