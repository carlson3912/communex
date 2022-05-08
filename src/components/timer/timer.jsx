import React, { useEffect, useState } from "react";

export const Timer = ({date}) => {
    const [days, setDays] = useState("00");
    const [hours, setHours] = useState("00");
    const [minutes, setMinutes] = useState("00");
    const [seconds, setSeconds] = useState("00");
  
    useEffect(() => {
      const target = new Date(date).getTime() - 1000 * 60 * 60 ;
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = target - now; 
        if (distance < 0) {
          clearInterval(interval);
        } else {
          const days2 = Math.floor( (distance / (1000*60*60*24)));
          if (days2 < 10) {
            setDays("0" + days2.toString());
          } else {
            setDays(days2.toString());
          }
          const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          if (hours < 10) {
            setHours("0" + hours.toString());
          } else {
            setHours(hours.toString());
          }
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          if (minutes < 10) {
            setMinutes("0" + minutes.toString());
          } else {
            setMinutes(minutes.toString());
          }
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          if (seconds < 10) {
            setSeconds("0" + seconds.toString());
          } else {
            setSeconds(seconds.toString());
          }
        }
      }, 1000);
      return () => clearInterval(interval);
    }, []);

 return(
    <h1 id= "time">{days}:{hours}:{minutes}:{seconds}</h1>
    
 )
};

export default Timer;