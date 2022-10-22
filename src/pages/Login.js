import React, { useEffect, useState } from 'react'

// ----- Services ----- 
import { loginUser } from '../services/axios/user'

export default function Login() {


  const [errors, setErrors] = useState("")
  const [response, setResponse] = useState([])
  const [isLogged, setIsLogged] = useState(false)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const submitUser = (e) => {
    e.preventDefault();
    setErrors([]);
    setResponse([]);
    loginUser(setResponse, email, password, setErrors, setIsLogged)
  }

  useEffect(() => {
    console.log(response)
    if (isLogged) {
      localStorage.setItem('tokenTinder', response.data.token)
      window.location.href = '/'
    }
    // eslint-disable-next-line
  }, [response])



  return (
    <div id="registration" className="page">

      <form className="container-centered">
        <h1>Créer un compte</h1>


        <div className="d-flex flex-direction-column">
          <label htmlFor="email">Email</label>
          <input type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            id="email"
            placeholder="carl.jonhson@san-andreas.com"

          />
        </div>
        <div className="d-flex flex-direction-column">
          <label htmlFor="password">Mot de passe</label>
          <input type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            id="password"
            placeholder="*******"
          />
        </div>
        {errors && <span className="text-danger">Identifiant ou mot de passe invalide</span>}

        <button className="btn-default btn-gradient my-5" onClick={submitUser}>Continuer</button>
      </form>
    </div>
  )
}
