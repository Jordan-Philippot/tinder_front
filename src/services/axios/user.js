import axios from 'axios';

// const API_KEY = "my_key";
const BASE_URI = process.env.REACT_APP_URI_ENDPOINT

const headers = {
    'Content-Type': 'application/json',
}

const headersAuth = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ` + localStorage.getItem('tokenTinder')
}

// __________________ Check Token ___________________
export async function checkToken(setResponse) {
    await axios({
        url: BASE_URI + 'auth/user',
        headers: headersAuth,
    })
        .then((response) => {
            if (response.data) {
                setResponse(response.data)
            } else {
                setResponse(false)
            }
        }, (err) => {
            setResponse(false)
        });
}



// __________________ LOGIN ___________________
export async function loginUser(setResponse, email, password, setErrors, setIsLogged) {
    await axios({
        method: 'POST',
        url: BASE_URI + 'login_check',
        headers: headers,
        data: {
            "email": email,
            "password": password
        },
    })
        .then((response) => {
            // Send response for check token 
            // If response return data, login is ok
            if (typeof response.data !== 'undefined' && !response.data.errors) {
                setResponse(response);
                setIsLogged(true)
            }
        }, (err) => {
            if (typeof err.response.status !== "undefined") {
                setErrors(true);
            }
        });
}


export async function addUser(data, setErrors, setResponse) {
    const formData = new FormData()

    for (const [key, value] of Object.entries(data)) {
        formData.append(key, value)
    };
    await axios({
        method: 'post',
        url: BASE_URI + 'register',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        data: formData
    })
        .then(function (response) {
            console.log(response)
            if (response.data.errors) {
                setErrors(response.data.errors)
            } else {
                setResponse("success");
            }
        }, (err) => {
            setResponse(err)
        });
}

export async function getUsersForMe(setResponse) {
    await axios({
        url: BASE_URI + 'auth/users',
        headers: headersAuth,
    })
        .then(function (response) {

            if (response.data) {
                setResponse(response.data.allUsers);
            }

        }, (err) => {
            setResponse(err)
        });
}

export async function isLikedOrNot(isLiked, isSuperLiked, userId, setResponse) {
    await axios({
        method: "post",
        url: BASE_URI + 'auth/likedornot',
        headers: headersAuth,
        data: {
            'isLiked': isLiked,
            'isSuperLiked': isSuperLiked,
            'receiverId': userId,
        }
    })
        .then(function (response) {
            console.log(response)
            if (response.data) {
                setResponse(response.data);
            }

        }, (err) => {
            setResponse(err)
        });
}
