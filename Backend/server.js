import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import axios from 'axios';
import { transactionModel, realTransactionModel } from './models/transaction.js';
import { holdingsModel, realHoldingsModel } from './models/holding.js';


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


app.post('/api/transactions/addTransaction', async(req,res)=>{
    try {
        const transaction = await realTransactionModel.create(req.body);
        res.status(200).json(transaction);
    }catch (err){
        res.status(500).json({error:err.message});
    }
})

app.get('/api/transactions', async(req,res)=>{
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

app.get('/api/holdings',async (req,res)=>{
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

app.post('/api/PriceChartData', async(req,res)=>{    
    try{
        const {symbol} = req.body;
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

app.post('/api/aiInsights/getAiAnalysis', async(req,res)=>{
    try{
        // eslint-disable-next-line no-undef
        const aiApiKey = process.env.groqApiKey;
        const {data1, data2} = req.body;
        const {type} = req.body;

        const prompts = {
                        dashboard: `
                            You are a financial advisor.
                            Rules:
                            - Do not show calculations or formulas.
                            - Do not write code.
                            - Do not mention that data is simulated.
                            - Do not say "I'll assume".
                            - Do not explain your analysis process.
                            - Do not mention Data variable name. refer to them as "last month" and "current month".
                            - Give only the final insights.
                            - Use Indian currency (₹) for all monetary values.
                            you are given two monhts expenses. just compare and
                            Give a short summary in bullet 2-3 points (changes in %).
                        `,
                        detailed: `
                        You are a personal financial advisor.

                        Analyze the user's spending data from last two months data.

                        Rules:
                        - Do not show calculations or formulas.
                        - Do not write code.
                        - Do not mention that data is simulated.
                        - Do not say "I'll assume".
                        - Do not explain your analysis process.
                        - Do not mention Data variable name. refer to them as "last month" and "current month".
                        - Give only the final insights.
                        - Use Indian currency (₹) for all monetary values.

                        suggestions should include spending Summary, positive changes, areas of concern, and actionable suggestions for the user to improve their financial health.

                        Keep the response concise and easy to read.
                        `,
        };

        const response = await axios.post("https://api.groq.com/openai/v1/chat/completions",{
            model:"llama-3.1-8b-instant",
            messages:[{
                role:'system',
                content: type === 'dashboard'? prompts.dashboard : prompts.detailed,
                        
            },{
                role:'user',
                content:JSON.stringify({data1, data2})
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
