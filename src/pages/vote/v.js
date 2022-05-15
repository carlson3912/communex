import {useState, React} from 'react';
import './vote.css'
import {Link} from 'react-router-dom'
import Timer from '../../components/timer/timer'
import axios from "../../axios/axios"
import shit from "../../assets/shirttemplate.png"

export const Vote = () => {
      const [arr, setArr] = useState("");
      const [src, setSrc] = useState("");
     const connection = async () => {
       const response = await axios.post("http://localhost:3500/submissions",
                    JSON.stringify({}),
                   JSON.stringify({
                       headers: { 'Content-Type': 'text/plain'},
                       withCredentials: true
                   })
                   );
           setArr(response);
           const mytable = document.getElementById("html-data-table");
           var m = 0;
           for (let i = 0; i <response.data.length; i++){
               if(i % 5 ===0 ) { mytable.appendChild(document.createElement("tr")) }
              setSrc(src => [...src, "https://ipfs.io/ipfs/"+ response.data[i].ipfs])
              let newRow = document.createElement("td");
                  newRow.innerHTML = 
                  "<div id='items'> <img id = 'thumbnail' src=https://ipfs.io/ipfs/"+ response.data[i].ipfs+"/>" + 
                   "<h2 id = 'title'>" + response.data[i].title+"</h2>" +
                   "<h2 id = 'artist'>" + response.data[i].artist+"</h2>" +
                   "<button id = 'voteButton'>Vote</button>" +
                    "</div>";
                      mytable.appendChild(newRow)
             }    
           }

  return (
    <div onSeeked={() => connection()}>
      <h1>Voting has not started yet</h1>
      <h1>It will open up in:</h1>

      <Timer  date="May 15, 2022 15:00 PST"/>
      <img onLoad={() => connection()} src="https://c.tenor.com/Z2f9SbnfmwcAAAAi/gigachat-gigachatter.gif"></img>

        <table id ="html-data-table">
        </table>
        </div>
   )
};

export default Vote;
