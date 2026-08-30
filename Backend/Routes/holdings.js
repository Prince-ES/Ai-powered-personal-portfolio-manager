import express from 'express';
import { realHoldingsModel } from '../models/holding.js';
import { holdingsModel } from '../models/holding.js';

const router = express.Router();

router.get('/',async (req,res)=>{
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

router.get('/exampleHoldings', async (req,res)=>{
    try{
        const exampleHoldings = await holdingsModel.find();
        if(exampleHoldings){
            const holdings = await holdingsModel.find();
            res.status(200).json(holdings);
        }else{
            res.status(200).json({message: "no example holdings"});
        }
        
    }catch(err){
        res.status(500).json({error:err.message});
    }
})

export {router as holdingsRouter};