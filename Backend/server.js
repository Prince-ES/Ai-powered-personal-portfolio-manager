/* eslint-disable no-undef */
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import axios from 'axios';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser'
import { transactionModel, realTransactionModel } from './models/transaction.js';
import { holdingsModel, realHoldingsModel } from './models/holding.js';
import { userModel } from './models/users.js';


const app = express();
dotenv.config();

app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}));

app.use(express.json());

app.use(cookieParser());

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

function authenticateToken (req, res, next){
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    const accessToken = authHeader?.split(' ')[1];

    //When token is missing (made request from external source or refreshed app)
    if(!accessToken){
        return res.status(401).json({
            message:"Access token required",
        })
    }

    try{
        const decoded = jwt.verify(accessToken,process.env.JWT_ACCESS_SECRET);

        if (!decoded.userId) {//ensuring userId was used during signature.
            return res.status(401).json({
                message: "Invalid access token"
            });
        }

        req.user = decoded;
        next()
    }catch(error){
        res.status(401).json({
            message: "Invalid or Expired token",
            error:error
        })
    }

    // two cases: token is invalid (user sent anything as token or it just expired)/ token is valid. 
    
}

app.post('/api/auth/refresh',(req, res)=>{//request will get redirected here if: there was no token sent or it was invalid
    const oldToken = req.cookies.refreshToken;

    try{
        const decoded = jwt.verify(oldToken, process.env.JWT_REFRESH_SECRET);

        if(!decoded.email){
            return res.status(401).json({
                message:"User not found."
            })
        }

        const newAccessToken = jwt.sign({
            userId:decoded.userId,
            email:decoded.email,
        },process.env.JWT_ACCESS_SECRET,
        {
            expiresIn: '15m'
        })

        return res.status(201).json({
            accessToken:newAccessToken
        })
        
    }catch(error){
        res.status(401).json({
            message: "User logged out. Please login again",
            error: error,
        })
    }

    
})

app.post ('/api/auth/signup', async (req, res)=>{
    try{
        const {username,email,password} = req.body;

        if(!username || !email || !password){
            res.status(400).json({
                message:"All fields are required"
            })
        }

        const existingUser = await userModel.findOne({email});

        if (existingUser) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }

        const hashedPass = await bcrypt.hash(password, 10);

        await userModel.create({
            username,
            email,
            password:hashedPass,
        });

        return res.status(201).json({
            message:"Account created successfully"
        })

    }catch(error){
        res.status(500).json({
            message: "Internal server error",
            error:error
        })
    }
})

//login cases:
//All fields required,
//no user found? email or password incorrect,
//server error

app.post('/api/auth/login', async(req,res)=>{
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                message:"Please fill out all the fields"
            })
        }
    
        const user = await userModel.findOne({email});//findOne takes filter object, we can have multiple conditions like {email:xyz@gmail.com, age:25} and 
        if(!user){
            return res.status(401).json({
                message:"Incorrect email or password"
            })
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(401).json({
                message:"Incorrect email or password"
            })
        }
        
        const accessToken = jwt.sign({
                userId:user._id,
                email:user.email,
            },// eslint-disable-next-line no-undef
                process.env.JWT_ACCESS_SECRET,
            {
                expiresIn: '15m'
            }
        );

        const refreshToken = jwt.sign({
                userId:user._id,
                email:user.email,
            },// eslint-disable-next-line no-undef
                process.env.JWT_REFRESH_SECRET,
            {
                expiresIn: '7d'
            }
        );

        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            message:"Login successful",
            accessToken
        })

    }catch(error){
        res.status(500).json({
            message: "Internal server error",
            error:error
        })
    }

})

app.post('/api/transactions/addTransaction',authenticateToken, async(req,res)=>{
    try {
        const transaction = await realTransactionModel.create(req.body);
        res.status(200).json(transaction);
    }catch (err){
        res.status(500).json({error:err.message});
    }
})

app.get('/api/transactions',authenticateToken, async(req,res)=>{
    try{
        const realTransactions = await realTransactionModel.find();
        if(realTransactions.length === 0){
            res.status(200).json({message: "No transactions exists"});
        }else{
            res.status(200).json(realTransactions);
        }
        
    }catch(err){
        res.status(500).json({error:err.message});
    }
})

app.get('/api/exampleTransactions', async(req,res)=>{
    try{
        const exampleTransactions = await transactionModel.find();
        if(exampleTransactions){
            res.status(200).json(exampleTransactions);
        }else{
            res.status(200).json({message:"No example trasactions"});
        }
        
    }catch(err){
        res.status(500).json({error:err.message});
    }
})

app.get('/api/holdings', authenticateToken, async (req,res)=>{
    try{
        const realHoldings = await realHoldingsModel.find();
        if(realHoldings.length === 0){
            res.status(200).json({message: "No holdings found"});
        }else{
            res.status(200).json(realHoldings);
        }
        
    }catch(err){
        res.status(500).json({error:err.message});
    }
})

app.get('/api/exampleHoldings', async (req,res)=>{
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

app.post('/api/PriceChartData', authenticateToken, async(req,res)=>{    
    try{
        const {symbol} = req.body;
         async function getChart (){
        // eslint-disable-next-line no-undef
            const response = await axios.get(`https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&apikey=${process.env.priceChartApiKey}`);
            res.status(200).json(response.data);
        }
        getChart();
    }catch(err){
        res.status(500).json({error:err.message});
    }
})

app.post('/api/aiInsights/getAiAnalysis', authenticateToken, async(req,res)=>{
    try{
        // eslint-disable-next-line no-undef
        const aiApiKey = process.env.openRouterApiKey;
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

        const response = await axios.post('https://openrouter.ai/api/v1/chat/completions',{
            model:'openrouter/free',
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
