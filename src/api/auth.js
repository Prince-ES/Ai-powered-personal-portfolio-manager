import axios from 'axios';

export async function signUp(username, email, password){
    const response = await axios.post('http://localhost:5000/api/auth/signup',{
                    username,
                    email,
                    password,
                });

    return response;
}

export async function logIn(email, password){
    const response = await axios.post('http://localhost:5000/api/auth/login',{
                    email,
                    password
                },{withCredentials:true});
    return response;
}

export async function getAccessToken(){
    const response = await axios.post('http://localhost:5000/api/auth/refresh',{}, {withCredentials:true});
    return response;
}