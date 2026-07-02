import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';


const app = express();
dotenv.config();

app.use(cors());

app.use(express.json());

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
    type: {
        type: String,
        required: true
    },
    date: {
        type: Date, 
        required: true
    },
    notes: {
        type: String,
        default: ""
    }
    
})

const transactionModel = mongoose.model('transaction',transactionSchema);

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
