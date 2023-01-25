import React from 'react';
import './Card.css';

function SensorCard({title, iconUrl, values}) {
  return (
    <>
      <div className="sensor-card-container">
        <div className="sensor-card-title">
          <h2>{title}</h2>
          <div className="sensor-card-icon">
            <img src={iconUrl} alt="Icons"/>
            <div className="sensor-card-values">
              {values}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SensorCard