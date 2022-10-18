import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//  ----- Styles  -----
import './styles/App.scss';

//  ----- Components -----
import LocationUrl from './components/tools/Location'
import Loader from './components/tools/Loader'
import Cursor from './components/tools/Cursor'

import Header from './components/sections/HeaderDesktop'
import Footer from './components/sections/Footer'

//  ----- Pages  -----
import Home from './pages/Home'
import NotFound from './pages/NotFound'


export default function App() {

  // eslint-disable-next-line
  const [location, setLocation] = useState('')
  const [loaded, setLoaded] = useState(false)

  // ----- Animation loader -----
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 1000);
    // eslint-disable-next-line
  }, [])

  return (
    <Router>

      {!loaded ?

        <Loader />

        :

        <div className="App">

          <Header />

          <Cursor />

          {/* ----- Get URL location ----- */}
          <LocationUrl setLocation={setLocation} />


          <Routes>
            {/* ----- 404 Not Found ----- */}
            <Route path="*" element={<NotFound />} />

            {/* ----- Homepage ----- */}
            <Route exact path="/" element={<Home />} />

          </Routes>


          <Footer />

        </div >
      }

    </Router>
  );
}
