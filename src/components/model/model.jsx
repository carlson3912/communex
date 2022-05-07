import React, { useEffect, useState } from "react";
import './model.css'
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
export const Model = ({salesIn, profitIn, weeksIn}) => {

    

    const [sales, setSales] = useState(salesIn);
    const [profit, setProfit] = useState(profitIn);
    const [profitPercentage, setProfitPercentage] = useState(0.90);
    const [profitDecrease, setProfitDecrease] = useState(0.015);
    const [growth, setGrowth] = useState(0.05);
    const [weeks, setWeeks] = useState(weeksIn);



    const answer = [];
    const total =[];
    const silkD =[];

    useEffect(() =>{
        console.log("UseEffect");
        var percentage = profitPercentage;
        var totalProfit = profit * sales;
        var totalSilk = sales * 1.1 * 1000;
        var silkValue = totalProfit/totalSilk;
        var silktoMint = profit * percentage / silkValue;
        var finalgrowth = growth/100/4;
        var multipler = 1 + finalgrowth;
           answer[0] = silkValue;
           silkD[0] = silktoMint;
        
        totalSilk += silktoMint * sales * 1.1;
        totalProfit += profit * sales;

            answer[1] = silkValue;
            silkD[1] = silktoMint;
        for (var i = 2; i<weeks;i++)
        {  
           multipler = multipler * (1+ finalgrowth);
           percentage -= profitDecrease;
           console.log(percentage);
           silkValue = totalProfit/totalSilk;
           silktoMint = profit * percentage / silkValue;
           totalSilk += silktoMint * sales * 1.1;
           totalProfit += profit * sales * multipler;

        //    console.log("TP:"+totalProfit);
        //    console.log("TS:"+totalSilk);
        //    console.log("sv: "+silkValue);
        //    console.log("silktoMint:"+silktoMint);
        //    console.log("PP"+percentage);
           answer[i] = silkValue;
           silkD[i] = silktoMint;
        }
        for (var i = 0; i<weeks;i++){
            total[i]=silkD[i]*silkValue;
        }


       
        
    },)
   



    return(
        <div>

        <div id = 'basicText'>
            <p1>Sales per Week</p1>
            <input type="number" id="sales" name="sales" min="0" max="10000" step="100"/>
            <p1>Profit per item</p1>
            <input type="number" id="profit" name="profit" min="0" max="150" step="10"/>
            <p1>Monthly Growth %</p1>
            <input type="number" id="growth" name="profit" min="0" max="150" step="11"/>
            <button id = 'primary' value="check" onClick={ () => {
                const salesnew = document.getElementById('sales').value;
                const profitnew = document.getElementById('profit').value;
                const growthnew = document.getElementById('growth').value;
                setSales(salesnew);
                setProfit(profitnew);
                setGrowth(growthnew);
                setWeeks(53);
            }
            }>
                Simulate Tokenomics
            </button>

       
        </div>
            <Line data={
                {
                    labels: ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52'],
                    datasets: [
                      {
                        label: "Silk Value",
                        data: answer,
                        fill: true,
                        backgroundColor: "rgba(75,192,192,0.2)",
                        borderColor: "rgba(75,192,192,1)"
                      },
                      
                      {
                        label: "Total Value",
                        data: total ,
                        fill: true,
                        backgroundColor: "rgba(75,192,192,0.2)",
                        borderColor: "pink"
                      },
                      {
                        label: "Silk Given",
                        data: silkD,
                        fill: true,
                        backgroundColor: "rgba(75,192,192,0.2)",
                        borderColor: "green"
                      }
                    ],
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                  }

                } />
         <div id='explain'>
            <h3>Silk Value: the value of $SILK after each week of sales</h3>
            <h3>Silk Given: the amount of $SILk given to each customer from week X</h3>
            <h3>Total Value: the total value of $SILK given to each customer during week X (value after simulating 53 weeks)</h3>
        </div>
        </div> 
    );
}

export default Model;