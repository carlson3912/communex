import item01 from '../../assets/item01.png'
import { Link } from 'react-router-dom';
import seller1 from '../../assets/seller1.png'
import seller2 from '../../assets/seller2.png'
import seller3 from '../../assets/seller3.png'
import seller4 from '../../assets/seller4.png'
import seller5 from '../../assets/seller5.png'
import seller6 from '../../assets/seller6.jpg'
import verify from '../../assets/verify.png'
import React, { useEffect, useState } from "react";

import './productCard.css'
import { RiH1 } from 'react-icons/ri';
var votes = "5";

export const ItemCard = ({id}) => {
    const [sourced, setSource] = useState("item0");
    useEffect(() =>{
        if (id == "1")
        {
            setSource(item01)
        }

    },[])
   



return(
<>


</>
);
}

export default ItemCard;