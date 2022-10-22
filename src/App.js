import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//  ----- Styles  -----
import './styles/App.scss';

//  ----- Components -----
import LocationUrl from './components/tools/Location'
import Loader from './components/tools/Loader'
import Cursor from './components/tools/Cursor'

import Header from './components/sections/Header'
import Footer from './components/sections/Footer'

//  ----- Pages  -----
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

import NotFound from './pages/NotFound'

// ----- Services ---- 
import { checkToken } from './services/axios/user'


export default function App() {

  // eslint-disable-next-line
  const [location, setLocation] = useState('')
  const [loaded, setLoaded] = useState(false)
  const [token, setToken] = useState(false)

  useEffect(() => {
    checkToken(setToken)

  }, [location])
  
  // ----- Animation loader -----
  useEffect(() => {

    setTimeout(() => {
      setLoaded(true)
    }, 1000);
    // eslint-disable-next-line
  }, [])



  // If user already logged
  useEffect(() => {

    if (token && token.response) {
      if (location) {
        if (location.pathname.match(/register/) || location.pathname.match(/login/)) {
          return window.location.href = "/dashboard"
        }
      }
    }
  }, [token, location])

  return (
    <Router>

      {!loaded ?

        <Loader />

        :

        <div className="App">

          {/* ----- Get URL location ----- */}
          <LocationUrl setLocation={setLocation} />


          <Header token={token} />

          <Cursor />



          <Routes>
            {/* ----- 404 Not Found ----- */}
            <Route path="*" element={<NotFound />} />

            {/* ----- Homepage ----- */}
            <Route exact path="/" element={<Home />} token={token} />

            {/* ----- Login ----- */}
            <Route exact path="/login" element={<Login />} token={token} />

            {/* ----- Register ----- */}
            <Route exact path="/register" element={<Register />} token={token} />

            {/* ----- Dashboard ----- */}
            <Route exact path="/dashboard" element={<Dashboard />} token={token} />

          </Routes>


          {/* <Footer /> */}

        </div >
      }

    </Router>
  );
}
