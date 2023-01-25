import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Views/Home'
import AreaOne from './Views/AreaOne'
function App() {


  return (
   <Router>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/dashboard-1' element={<AreaOne/>}/>
      <Route path='/dashboard-2' element={<AreaOne/>}/>
      <Route path='/dashboard-3' element={<AreaOne/>}/>
      <Route path='/dashboard-4' element={<AreaOne/>}/>
    </Routes>
   </Router>
  )
}

export default App
