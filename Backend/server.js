import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import axios from 'axios';


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

// async function getAiAnalysis (){
//     const aiApiKey = process.env.groqApiKey;
//         const transactions=[{food:100,date:'2023-01-01'},{food:200,date:'2023-01-02'},{food:300,date:'2023-01-03'}]

//         const response = await axios.post("https://api.groq.com/openai/v1/chat/completions",{
//             model:"llama-3.1-8b-instant",
//             messages:[{
//                 role:'system',
//                 content:"You are a personal financial advisor. Analyse spending trends and give useful suggestions."
//             },{
//                 role:'user',
//                 content:JSON.stringify(transactions)
//             }]
//             },
//             {
//                 headers:{
//                     Authorization: `Bearer ${aiApiKey}`,
//                     "content-type": "Application/json",
//                 }
//             }
        
//         );
//         console.log(response.data.choices[0].message.content);
// }
// getAiAnalysis();

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

app.post('/PriceChartData', async(req,res)=>{    
    try{
        const {symbol} = req.body;
        console.log(symbol);
         async function getChart (){
        // eslint-disable-next-line no-undef
            const response = await axios.get(`https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&apikey=${process.env.apiKey}`);
            res.status(200).json(response.data);
        }
        getChart();
    }catch(err){
        res.status(500).json({error:err.message});
    }
})

app.post('/getAiAnalysis', async(req,res)=>{
    try{
        // eslint-disable-next-line no-undef
        const aiApiKey = process.env.groqApiKey;
        const {prevMonthCategoryDistribution, monthBeforePrevCategoryDistribution} = req.body;

        const response = await axios.post("https://api.groq.com/openai/v1/chat/completions",{
            model:"llama-3.1-8b-instant",
            messages:[{
                role:'system',
                content:`
                        You are a personal financial advisor.

                        Analyze the user's spending data from two months.

                        Rules:
                        - Do not show calculations or formulas.
                        - Do not write code.
                        - Do not mention that data is simulated.
                        - Do not say "I'll assume".
                        - Do not explain your analysis process.
                        - Give only the final insights.
                        - Use Indian currency (₹) for all monetary values.

                        Format your response as:
                        1. Spending Summary
                        2. Positive Changes
                        3. Areas of Concern
                        4. Actionable Suggestions

                        Keep the response concise and easy to read.
                        `
            },{
                role:'user',
                content:JSON.stringify({prevMonthCategoryDistribution, monthBeforePrevCategoryDistribution})
            }]
            },
            {
                headers:{
                    Authorization: `Bearer ${aiApiKey}`,
                    "content-type": "Application/json",
                }
            }
        );
        res.status(200).json(response.data.choices[0].message.content);
        // console.log(response.data.choices[0].message.content);
    }catch(err){
        res.status(500).json({error:err.response?.data})
    }
})
