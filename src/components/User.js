import React, { useState, useEffect, useRef } from 'react'

// ----- Packages ----- ----------------
import gsap from 'gsap'

// ----- Services ----- ----------------
import { isLikedOrNot } from '../services/axios/user'



export default function User({ user }) {
    const imageRef = useRef()
    // const [imageProfile, setImageProfile] = useState(false)

    const [isLiked, setIsLiked] = useState('')
    const [isSuperLiked, setIsSuperLiked] = useState('')

    const [passions, setPassions] = useState([])
    const [response, setResponse] = useState([])

    useEffect(() => {
        if (user.images) {
            // setImageProfile(user.images)
            gsap.set(imageRef.current, { backgroundImage: 'url(' + user.images + ')', backgroundSize: "cover", backgroundPosition: "center" })
            setPassions(user.passions.split(','))
        }
    }, [user])

    const tl = gsap.timeline()


    const disliked = () => {
        setIsSuperLiked(false)
        setIsLiked(false)
        isLikedOrNot(false, false, user.id, setResponse)

        tl.to('.disliked svg', { scale: 1.5, duration: 0.5, y: '-50px' })
        tl.to('.disliked svg', { scale: 1.5, duration: 0.5, y: '0' })


    }

    const superLiked = () => {
        setIsSuperLiked(true)
        setIsLiked(true)
        isLikedOrNot(true, true, user.id, setResponse)

        tl.to('.superlike svg', { scale: 1.5, duration: 0.5, y: '-50px' })
        tl.to('.superlike svg', { scale: 1.5, duration: 0.5, y: '0' })

    }

    const liked = () => {
        setIsLiked(true)
        setIsSuperLiked(false)
        isLikedOrNot(true, false, user.id, setResponse)

        tl.to('.like svg', { scale: 1.5, duration: 0.5, y: '-50px' })
        tl.to('.like svg', { scale: 1.5, duration: 0.5, y: '0' })
    }

    useEffect(() => {
    }, [isLiked, isSuperLiked])

    useEffect(() => {
        console.log(response)
    }, [response])




    return (
        <div className="user" key={user.id} id={user.id} ref={imageRef}>
            <div className="profile-container" >
                <div className="profile-informations">
                    <h2>{user?.name} <small>{user?.birthday} ans</small></h2>

                    <div className="passions">
                        {passions && passions.map((passion) => {
                            return <p className="passion">{passion}</p>
                        })}
                    </div>

                    <div className="actions">
                        <p className="disliked" onClick={disliked}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </p>
                        <p className="superlike" onClick={superLiked}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-star-fill" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                            </svg>
                        </p>
                        <p className="like" onClick={liked}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                            </svg>
                        </p>
                    </div>



                </div>
            </div>

            {isLiked && !isSuperLiked && <p className="clickedText">Ohhh oui ca like</p>}
            {isSuperLiked && <p className="clickedText">Mash'allah le mariage bientôt</p>}
            {isLiked === false && <p className="clickedText">Hummmm... t'es sûr?</p>}
            {response.isMatched && <div className="ismatch"><p>siiiiiiii <br></br> C'est un match!!!!!!</p></div>}
        </div >
    )
}
