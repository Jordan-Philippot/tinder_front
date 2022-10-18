import React from 'react'

// ----- Packages -----
import { useMediaQuery } from 'react-responsive'

// ----- Components -----
import HeaderDesktop from "./HeaderDesktop"
import HeaderTablet from "./HeaderTablet"

export default function Header({token}) {

    const Desktop = ({ children }) => {
        const isDesktop = useMediaQuery({ minWidth: 1200 })
        return isDesktop ? children : null
    }
    const Tablet = ({ children }) => {
        const isTablet = useMediaQuery({ maxWidth: 1199.98 })
        return isTablet ? children : null
    }

    return (
        <header>
            <Desktop>
                <HeaderDesktop token={token}/>
            </Desktop>
            {/*  */}
            <Tablet>
                <HeaderTablet token={token}/>
            </Tablet>
        </header>
    )
}
