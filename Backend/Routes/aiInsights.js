import express from 'express';
import  {authenticateToken } from '../middlewares/authMiddleware.js';
import axios from 'axios';


const router = express.Router();

router.post('/getAiAnalysis', authenticateToken, async(req,res)=>{
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

export {router as aiInsightsRouter};