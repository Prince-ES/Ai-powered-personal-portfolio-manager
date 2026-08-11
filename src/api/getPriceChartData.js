import axios from 'axios';
export async function getPriceChartData( symbol){
    const response = await axios.post('http://localhost:5000/api/PriceChartData',{
        symbol:symbol
    });
    return response.data;
}