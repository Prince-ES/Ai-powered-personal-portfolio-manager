import {api} from './api.js';

export async function getAiInsights(firstMonthData, secondMonthData, type){
    const response =await api.post('/aiInsights/getAiAnalysis',{
            data1:firstMonthData,
            data2:secondMonthData,
            type:type,
    });

    return response;
}