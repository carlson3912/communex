import React from 'react';
import './vote.css'
import {Link} from 'react-router-dom'
import Timer from '../../components/timer/timer'

export const Vote = () => {

  return (
    <div>
      <h1>Voting has not started yet</h1>
      <h1>It will open up in:</h1>
      <Timer date="May 15, 2022 15:00 PST"/>
    </div>
   )
};

export default Vote;
