import express from 'express';

const router = express.Router();

router.post('/api/PriceChartData', async(req,res)=>{    
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