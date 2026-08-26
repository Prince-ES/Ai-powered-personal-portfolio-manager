import {api} from './api.js';

export async function postTransaction(title, amount, type, category, notes){
           const response = await api.post('/transactions/addTransaction',{title:title,amount:amount,type:type,category:category,notes:notes});  
           return response;
}

export async function getTransactions (){
        const response = await  api.get('/transactions');
        return response;
}