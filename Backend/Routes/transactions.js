import express from 'express';
import { transactionModel } from '../models/transaction';
import { realTransactionModel } from '../models/transaction';

//stopping work because the transcations and add same is a user's actions therefore should be in user.js 
const router = express.Router();

router.post('/api/transactions/addTransaction', async(req,res)=>{
    try {
        const transaction = await realTransactionModel.create(req.body);
        res.status(200).json(transaction);
    }catch (err){
        res.status(500).json({error:err.message});
    }
})

router.get('/api/transactions', async(req,res)=>{
    try{
        const realTransactions = await realTransactionModel.find();
        if(realTransactions.length === 0){
            const transactions = await transactionModel.find();
            res.status(200).json(transactions);
        }else{
            res.status(200).json(realTransactions);
        }
        
    }catch(err){
        res.status(500).json({error:err.message});
    }
})