import {api} from './api.js';

export async function priceChartData( symbol){
    const response = await api.post('/PriceChartData',{
        symbol:symbol
    });
    return response.data;
}