import './redeem.css';
// import fabric from 'fabric-canvas';
// import { FabricJSCanvas, useFabricJSEditor} from "fabricjs-react";
import React, { useState, useEffect } from 'react';
const App = () => {
  //   const [canvas, setCanvas] = useState('');
  
  // const addRect = canvi => {
  //     const rect = new fabric.Rect({
  //       height: 280,
  //       width: 200,
  //       fill: 'yellow'
  //     });
      
  //   }
  return(
    <>
    <div id="container">
      <form>
      <h2 id="country">Country</h2>
      <input type="country"/>
      <h2 id="country">State</h2>
      <input/>
      <h2>City</h2>
      <input/>
      <h2>Zip Code</h2>
      <input />
      <h2>Home Address</h2>
      <input type="text"/>
      <button type="Submit">Submit</button>
      </form>
      
    </div>
    </>
  
    );
   }

export default App;