import {api} from './api.js';

export async function postTransaction(ownerId, title, amount, type, category, notes){
           const response = await api.post('/transactions/addTransaction',{ownerId:ownerId,title:title,amount:amount,type:type,category:category,notes:notes});  
           return response;
}

export async function getTransactions (ownerId){
        const response = await  api.get(`/transactions?ownerId=${ownerId}`);
        return response;
}

export async function getExampleTransactions (){
        const response = await  api.get('/transactions/exampleTransactions');
        return response;
}