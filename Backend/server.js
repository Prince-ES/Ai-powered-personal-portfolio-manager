import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';


const app = express();
dotenv.config();

app.use(cors());

app.use(express.json());

// eslint-disable-next-line no-undef
mongoose.connect(process.env.mongoId)
    .then(()=>{
        console.log('connected to DB');
    })
    .then(()=>{
        app.listen(5000,()=>{
            console.log('server running');
        })
    })


const transactionSchema = new mongoose.Schema({
     title: {
    type: String,
    required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category:{
        type: String,
        required:true
    },
    type: {
        type: String,
        required: true
    },
    date: {
        type: Date, 
        default:Date.now
    },
    notes: {
        type: String,
        default: ""
    }
    
})

const holdingsSchema = new mongoose.Schema({
    symbol:{
        type:String,
        required:true
    },
    currentPrice:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    averagePrice:{
        type:Number,
        required:true
    }

})


const transactionModel = mongoose.model('transaction',transactionSchema);

const holdingsModel = mongoose.model('holding',holdingsSchema);

app.get('/',(req,res)=>{
    res.send('hello world');        
})

app.post('/addTransaction', async(req,res)=>{
    try {
        const transaction = await transactionModel.create(req.body);

        res.status(200).json(transaction);
    }catch (err){
        res.status(500).json({error:err.message});
    }
})

app.get('/transactions', async(req,res)=>{
    try{
        const transactions = await transactionModel.find();
        res.status(200).json(transactions);
    }catch(err){
        res.status(500).json({error:err.message});
    }
})

app.get('/holdings',async (req,res)=>{
    try{
        const holdings = await holdingsModel.find();
        res.status(200).json(holdings);
    }catch(err){
        res.status(500).json({error:err.message});
    }
})
