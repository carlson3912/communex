import React from "react";
import { Line } from "react-chartjs-2";


function LineChart({ chartData, totalData, silkData }) {
    const data = {
      labels: ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52'],
      datasets: [
        {
          label: "Silk Value",
          data: chartData,
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)"
        },
        
        {
          label: "Total Value",
          data: totalData ,
          fill: false,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "pink"
        },
        {
          label: "Silk Given",
          data: silkData,
          fill: false,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "green"
        }
      ],
      
    };

  return <Line data={data} height='150px' width='150px'/>;
}

export default LineChart;