import React, {  useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function Location({setLocation}) {
    const location = useLocation()

    useEffect(() => {
        setLocation(location)
        // eslint-disable-next-line
    }, [location])

    return (
        <div>

        </div>
    )
}
