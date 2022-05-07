import React, { useEffect, useState } from "react";
import Chart from 'chart.js/auto';



export const NewModel = () => {
    
   const[update, setUpdate] = useState(0);
   const temp = document.getElementById('myChart');
   const ctx =temp.getContext("2d");

   const myChart = new Chart(ctx, {
       type: 'bar',
       data: {
           labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
           datasets: [{
               label: '# of Votes',
               data: [12, 19, 3, 5, 2, 3],
               backgroundColor: [
                   'rgba(255, 99, 132, 0.2)',
                   'rgba(54, 162, 235, 0.2)',
                   'rgba(255, 206, 86, 0.2)',
                   'rgba(75, 192, 192, 0.2)',
                   'rgba(153, 102, 255, 0.2)',
                   'rgba(255, 159, 64, 0.2)'
               ],
               borderColor: [
                   'rgba(255, 99, 132, 1)',
                   'rgba(54, 162, 235, 1)',
                   'rgba(255, 206, 86, 1)',
                   'rgba(75, 192, 192, 1)',
                   'rgba(153, 102, 255, 1)',
                   'rgba(255, 159, 64, 1)'
               ],
               borderWidth: 1
           }]
       },
       options: {
           scales: {
               y: {
                   beginAtZero: true
               }
           }
       }
   });
    const[charter, setChart] = useState(myChart);

   useEffect(()=>{
    console.log("effect");  
    }
    ,[]);

    function input(){
        console.log("inputcalled")
        charter.config.data.labels[4]='69';
    }
useEffect(()=>{
    console.log("update");
    input();
},[update])



       
    
        

    return(
        <div>
            <div>
                <canvas id="myChart"></canvas>
            </div>
                
            
            <p1>Sales per Week</p1>
            <input type="number" id="sales" name="sales" min="0" max="10000" step="100"/>
            <p1>Profit per item</p1>
            <input type="number" id="profit" name="profit" min="0" max="150" step="10"/>
            <p1>Number of Weeks</p1>
            <input type="number" id="weeks" name="weeks" min="0" max="30" step="1"/>
            <button id = 'primary' value="check" onClick={ () => {
                setUpdate(1);
            }
            }>
                Simulate
            </button>
        </div>
    )
}