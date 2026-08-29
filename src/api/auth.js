import axios from 'axios';
import {api} from './api.js'

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

export async function logOut(){
    const response = await api.post('/logout',{},{withCredentials:true});
    return response;
}