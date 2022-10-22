import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Logo from '../../images/tinder.png'

export default function Header({ token }) {
    const [disconnectedUser, setDisconnectedUser] = useState(false)


    const disconnected = () => {
        if (localStorage.getItem('tokenTinder')) {
            setDisconnectedUser(true)
        }
    }
    useEffect(() => {
        if (disconnectedUser) {
            localStorage.removeItem('tokenTinder');
            window.location.href = "/";
        }
    }, [disconnectedUser]);

    return (
        <header>
            <Link to={"/"} id="logo">
                <img src={Logo} alt="tinder" />
                <p className={`${window.location.pathname === "/" ? 'text-white' : 'text-black'}`}>PAYTASCHNECK</p>
            </Link>



            <div id="login-btn" >
                {token ?
                    <button className="btn-default btn-white" onClick={disconnected}>Se deconnecter</button>
                    :
                    <Link className="btn-default btn-white" to={"/login"}>Se connecter</Link>
                }
            </div>

        </header>
    )
}
