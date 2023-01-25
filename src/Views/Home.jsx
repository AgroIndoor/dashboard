
import AgroIndoorLogo from '../assets/logo.jpg'
import UTFPRLogo from '../assets/utfpr.png'
import '../App.css'

import Card from '../Components/Card/Card'
import { Link } from 'react-router-dom'


function Home() {


  return (
    <div className="App">
      <div  >
        <img src={AgroIndoorLogo} className="logo" alt="Vite logo" />
        <a href="http://www.utfpr.edu.br/" target="_blank">
          <img src={UTFPRLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Areas de produção</h1>
      <div className="cards">
        
    <Link to="/dashboard-1">
        <Card title='Area 1' 
        imageUrl= 'https://images.unsplash.com/photo-1619811647569-9bd357bacae5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=997&q=80'
        text='Berçario de mudas' />
    </Link>
    <Link to={"/dashboard-2"}>
        <Card title='Area 2' 
        imageUrl= 'https://images.unsplash.com/photo-1622548066678-a25ead9d3849?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
        text='Hidroponia' />
    </Link>
    <Link to={"/dashboard-3"}>
        <Card title='Area 3' 
        imageUrl= 'https://images.unsplash.com/photo-1621954277583-5f16bfaa3610?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
        text='Aeroponia' />
    </Link>
    <Link to={"dashboard-4"}>
        <Card title='Area 4' 
        imageUrl= 'https://images.unsplash.com/photo-1622030360273-a8d1377be08b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80'
        text='Torres de teste' />
    </Link>
      </div>
    </div>
  )
}

export default Home;
