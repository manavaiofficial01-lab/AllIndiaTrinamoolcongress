import React from 'react'
import Home from './components/Home/Home'
import About from './components/About/About'
import { Route, Routes } from 'react-router-dom'
import Leadership from './components/Leadership/Leadership'
import Vision from "./components/Vision/Vision"
import Initiatives from './components/Initiatives/Initiatives'
import News from './components/News/News'
import Contact from './components/Contact/Contact'


import Join from './components/Join/Join'
import Migration from './components/Migration'
import AdminLogin from './components/Admin/AdminLogin'
import AdminDashboard from './components/Admin/AdminDashboard'

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

        <Route path='/join' element={<>
          <Join />
        </>} />

        <Route path='/contact' element={<>
          <Contact />
        </>} />


        <Route path='/migrate' element={<Migration />} />

        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin' element={<AdminDashboard />} />

      </Routes>
    </>

  )
}

export default App