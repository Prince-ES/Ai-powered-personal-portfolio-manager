import express from 'express';
import { realHoldingsModel } from '../models/holding';
import { holdingsModel } from '../models/holding';

const router = express.Router();

router.get('/api/holdings',async (req,res)=>{
    try{
        const realHoldings = await realHoldingsModel.find();
        if(realHoldings.length === 0){
            const holdings = await holdingsModel.find();
            res.status(200).json(holdings);
        }else{
            res.status(200).json(realHoldings);
        }
        
    }catch(err){
        res.status(500).json({error:err.message});
    }
})