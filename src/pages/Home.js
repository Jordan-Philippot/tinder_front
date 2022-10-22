import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div id='home' className="page">

      <div className="container-centered">
        
        <h1>Swipe Right <sup>TM</sup></h1>
        <Link to={"/register"} className="btn-default btn-gradient">Créer un compte</Link>
      </div>

    </div>
  )
}
