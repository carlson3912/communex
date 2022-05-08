import React from 'react';
import './submit.css'
import {  Link } from "react-router-dom";
const Submit = () => {
    return(
    <>
            <div >
        <h1> Submit your art </h1>
        <p1 id ="t">Receive royalty, publicity, and glory.</p1>
        <Link to='Guidelines'>
        <div id="linkspecs">
        <p id = "s">See our submission standards </p>
          </div>
         </Link>
        </div>
        <form id = "form" action="submission.php" method="POST" class="showForm">
          <br />

          <input placeholder="Title of your work:" id = "in" type="text" name="designTitle"></input>
          <br />
          <input placeholder="IPFS URL:" id = "in" type="url" name="ipfs" ></input>
          <br />
          <input placeholder="Royalty % (1-40):" id = "in" type="number" min="1" max="40" name="designTitle"></input>
          <br />
          Select manufacturer:    
          <input id ="n" type="radio" name="manufacturer_r" value="1" />
          <label name = "manufacturer_r">SRSDefault</label><br/>
          <button id = "in">Submit</button>
          </form>
        </>
        )};
export default Submit