import axios from 'axios';

// const API_KEY = "my_key";
const BASE_URI = process.env.REACT_APP_URI_ENDPOINT

const headers = {
    'Content-Type': 'application/json',
}

// ----- Example ----- 
export async function get(setResponse, setLoading) {
    await axios({
        url: BASE_URI + 'my_route',
        headers: headers,
    })
        .then((response) => {
            if (response.data) {
                setResponse(response.data)
                setLoading(false)
            }
        }, (err) => {
            setResponse(err)
        });
}