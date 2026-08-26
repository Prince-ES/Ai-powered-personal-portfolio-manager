import {api} from './api.js';

export async function getUser(){
    const response = await api.get('/user');
    return response;
}