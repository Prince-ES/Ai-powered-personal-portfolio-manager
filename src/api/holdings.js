import {api} from './api.js';

export async function getHoldings(){
    const response = await api.get('/holdings');
    return response;
}

export async function getExampleHoldings(){
    const response = await api.get('/exampleHoldings');
    return response;
}