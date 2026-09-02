import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
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

export const transactionModel = mongoose.model('transaction',transactionSchema);
export const realTransactionModel = mongoose.model('realTransaction',transactionSchema);