import mongoose from 'mongoose';

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

export const holdingsModel = mongoose.model('holding',holdingsSchema);
export const realHoldingsModel = mongoose.model('realHoldings',holdingsSchema);

