import React, { useEffect, useState } from 'react'

// ----- Packages  -----

// ----- Images ----- 

//  ----- Components  -----
import Cursor from './Cursor';

export default function Loader() {

    // eslint-disable-next-line
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setLoaded(true)
    }, [])



    return (
        <div id="loader">

            <Cursor />

            Chargement
        </div >
    )
}
