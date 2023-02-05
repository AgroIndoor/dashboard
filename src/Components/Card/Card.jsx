import React from 'react';
import './Card.css';


function Card({title, imageUrl, text}) {
  return (
    <div className='card-container'>
        <div className="image">
            <img src={imageUrl} alt=""/>
        </div>
        <div className="card-title">
            <h1>{title}</h1>
        </div>
        <div className="card-text">
           <p>{text}</p>
        </div>
    </div>
  )
}

export default Card