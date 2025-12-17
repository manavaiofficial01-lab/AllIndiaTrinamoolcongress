import React from 'react'
import Home from './components/Home/Home'
import About from './components/About/About'
import { Route, Routes } from 'react-router-dom'
import Leadership from './components/Leadership/LEadership'
import Vision from "./components/Vision/Vision"
import Initiatives from './components/Initiatives/Initiatives'
import News from './components/News/News'
import Contact from './components/Contact/Contact'
const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<>
          <Home />
        </>} />
        <Route path='/about' element={<>
          <About />
        </>} />
         <Route path='/leadership' element={<>
          <Leadership />
        </>} />
         <Route path='/vision' element={<>
          <Vision />
        </>} />
        <Route path='/initiatives' element={<>
          <Initiatives />
        </>} />
            <Route path='/news' element={<>
          <News />
        </>} />

         <Route path='/contact' element={<>
          <Contact />
        </>} />
        
        
      </Routes>
    </>

  )
}

export default App