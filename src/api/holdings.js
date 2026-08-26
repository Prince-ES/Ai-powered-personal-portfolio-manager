import {api} from './api.js';

export async function getHoldings(){
    const response = await api.get('/holdings');
    return response;
}