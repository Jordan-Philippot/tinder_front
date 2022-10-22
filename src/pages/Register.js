import React, { useEffect, useState } from 'react'

//  ----- components -----
import GooglePlaces from '../components/GooglePlaces';

// ----- Services ----- ----------------
import { addUser, loginUser } from '../services/axios/user'

// ----- Packages ----- ----------------
import gsap from 'gsap'

export default function Register() {



    const [errors, setErrors] = useState([])
    const [response, setResponse] = useState([])

    const [responseLogin, setResponseLogin] = useState(false)
    const [isLogged, setIsLogged] = useState(false)

    const [name, setName] = useState("")
    const [birthday, setBirthday] = useState("")
    const [gender, setGender] = useState("")
    const [genderFor, setGenderFor] = useState("")
    const [email, setEmail] = useState("")
    const [sexualOrientation, setSexualOrientation] = useState("")
    const [passions, setPassions] = useState("")
    const [phone, setPhone] = useState("")
    const [images, setImages] = useState("")
    const [address, setAddress] = useState("")
    const [password, setPassword] = useState("")

    const [displayImage, setDisplayImage] = useState('')

    const data = {
        'name': name,
        'birthday': birthday,
        'gender': gender,
        'genderFor': genderFor,
        'email': email,
        'sexualOrientation': sexualOrientation,
        'passions': passions,
        'phone': phone,
        'images': images,
        'address': address,
        'password': password
    }

    const submitUser = (e) => {
        e.preventDefault();
        setErrors([]);
        setResponse([]);

        addUser(data, setErrors, setResponse)
    }

    useEffect(() => {
        if (response === "success") {
            loginUser(setResponseLogin, email, password, setErrors, setIsLogged)
        }
        // eslint-disable-next-line
    }, [response])

    // console.log(token)
    useEffect(() => {
        if (isLogged && !responseLogin?.data?.errors) {
            localStorage.setItem('tokenTinder', responseLogin.data.token)
            window.location.href = '/'
        }
        // eslint-disable-next-line
    }, [isLogged, responseLogin])


    const changeFile = (e) => {
        if (typeof e.target.files !== "undefined") {
            setImages(e.target.files[0])
        }
    }


    useEffect(() => {
        if (images) {
            setDisplayImage(URL.createObjectURL(images))
            gsap.set('#label-image', { backgroundImage: 'url(' + displayImage + ')', backgroundSize: "cover", backgroundPosition: "center"})
        }
    }, [images])


    return (
        <div id="registration" className="page">



            <form className="container-centered">
                <h1>Créer un compte</h1>

                <div className="d-flex">
                    <div>
                        <div className="d-flex flex-direction-column">
                            <label htmlFor="name">Nom</label>
                            <input type="text"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                id="name"
                                placeholder="Carl Jonhson"
                            />
                        </div>
                        <div className="d-flex flex-direction-column">
                            <label htmlFor="phone">Téléphone</label>
                            <input type="phone"
                                onChange={(e) => setPhone(e.target.value)}
                                value={phone}
                                id="phone"
                                placeholder="0701223344"
                            />
                        </div>

                        <div className="d-flex flex-direction-column">
                            <label htmlFor="birthday">Anniversaire</label>
                            <input type="date"
                                onChange={(e) => setBirthday(e.target.value)}
                                value={birthday}
                                id="birthday"
                            />

                            {errors.birthday && <span className="text-danger">{errors?.birthday}</span>}
                        </div>


                        <div className="d-flex flex-direction-column">
                            <label htmlFor="gender">Genre</label>
                            <div className="d-flex">

                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setGender("men")
                                    }}
                                    className={`btn-default btn-form ${gender === "men" ? "is-active" : ""}`}
                                > Homme</button>

                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setGender("women")
                                    }}
                                    className={`btn-default btn-form ${gender === "women" ? "is-active" : ""}`}
                                >Femme</button>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setGender("other")
                                    }}
                                    className={`btn-default btn-form ${gender === "other" ? "is-active" : ""}`}
                                >Autres</button>
                            </div>

                            {errors.gender && <span className="text-danger">{errors.gender}</span>}
                        </div>


                        <div className="d-flex flex-direction-column">
                            <label htmlFor="genderFor">Afficher pour</label>
                            <div className="d-flex">

                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setGenderFor("men")
                                    }}
                                    className={`btn-default btn-form ${genderFor === "men" ? "is-active" : ""}`}
                                > Hommes</button>

                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setGenderFor("women")
                                    }}
                                    className={`btn-default btn-form ${genderFor === "women" ? "is-active" : ""}`}
                                >Femmes</button>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setGenderFor("all")
                                    }}
                                    className={`btn-default btn-form ${genderFor === "other" ? "is-active" : ""}`}
                                >Tous</button>
                            </div>

                            {errors.genderFor && <span className="text-danger">{errors.genderFor}</span>}
                        </div>

                        <div className="d-flex flex-direction-column">
                            <label htmlFor="address">Adresse</label>
                            <GooglePlaces address={address} setAddress={setAddress} />

                            {errors.address && <span className="text-danger">{errors.address}</span>}
                        </div>

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


                    </div>

                    <div className="mx-5">
                        <div className="d-flex flex-direction-column">
                            <label htmlFor="none">Photos de profil</label>

                            <label htmlFor="images" className="label-image" id="label-image"><sub>+</sub></label>
                            <input type="file"
                                onChange={changeFile}
                                id="images"
                            />
                        </div>

                        <p>Ajoute au moins 1 photo chacal</p>


                        <div className="hr-text">
                            <span>
                                Facultatif
                            </span>
                        </div>


                        <div className="d-flex flex-direction-column">
                            <label htmlFor="passions">Passions <sup>(à séparé avec une virgule)</sup></label>
                            <input type="text"
                                onChange={(e) => setPassions(e.target.value)}
                                value={passions}
                                id="passions"
                                placeholder="parachute, inceste..."

                            />
                        </div>

                        <div className="d-flex flex-direction-column">
                            <label htmlFor="sexualOrientation">Orientation sexuel</label>
                            <input type="text"
                                onChange={(e) => setSexualOrientation(e.target.value)}
                                value={sexualOrientation}
                                id="sexualOrientation"
                                placeholder="hétéro, cheval, poisson..."

                            />
                        </div>
                    </div>


                </div>
                <button className="btn-default btn-gradient my-5" onClick={submitUser}>Continuer</button>
            </form>
        </div>
    )
}
