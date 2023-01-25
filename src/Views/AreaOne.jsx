import React from 'react'
import SensorCard from '../Components/Card/SensorCard'
import humidity from '../assets/humidity.svg';
import temperature from '../assets/temperature.svg';
import ph from '../assets/pH.svg';

function AreaOne() {
  return (
    <>AreaOne
      <SensorCard
        title={"Temperatura"}
        iconUrl={temperature}
        values='1'
      />
    </>
  )
}

export default AreaOne