import React, { useEffect, useState, useMemo } from 'react'

// ----- Services ----- ----------------
import { getUsersForMe } from '../services/axios/user'

// ----- Component ----- ----------------
import User from '../components/User'

// ----- Packages ----- ----------------
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import gsap from 'gsap'

export default function Dashboard({ token }) {
    const [allUsers, setAllUsers] = useState([])

    const items = []


    useEffect(() => {
        getUsersForMe(setAllUsers)
    }, [])

    const loadCarousel = useMemo(() => {
        if (allUsers) {
            allUsers.forEach(user => {
                items.push(<User user={user} />)
            });
        }
        gsap.to('.container-carousel', { width: "101%", duration: 1, delay: 2 })
        // eslint-disable-next-line
    }, [allUsers]);

    useEffect(() => {
        return loadCarousel
    }, [loadCarousel])

    return (
        <div id="dashboard" className="page">




            <AliceCarousel
                mouseTracking
                disableDotsControls={true}
                items={items}
                infinite={true}
                responsive={{
                    0: {
                        items: 1,
                    },
                }}
                className="container-centered "
            />

            {/* {allUsers && allUsers.map(user =>
                    // <User user={user} />
                    <p className="alert alert-success">{user.name} ok</p>
                )} */}


        </div>
    )
}
